import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface TreeNode {
  id: number;
  name: string;
  value: number;
  children?: TreeNode[];
}

interface Props {
  data: TreeNode;
}

const CheckboxTree: React.FC<Props> = ({ data }) => {
  // const [treeData, setTreeData] = useState<TreeNode[]>([data]);

  // useEffect(() => {
  //   const updateWheelDataInFirestore = async () => {
  //     if (treeData !== data) {
  //       try {
  //         const user = userIdent.user;
  //         const userUid = user.uid;
  //         const db = getFirestore();

  //         const docRef = doc(db, "Members", userUid);
  //         await updateDoc(docRef, {
  //           wheelData: JSON.stringify(treeData),
  //         });
  //         console.log("Data updated in Firestore");
  //       } catch (err) {
  //         console.error("Error updating data:", err);
  //       }
  //     }
  //   };

  //   updateWheelDataInFirestore();
  // }, [treeData, data]);
  // const updateNodeValue = (nodeName: string, incrementValue: number) => {

  //   setTreeData((prevData) =>
  //     prevData.map((node) => {
  //       if (node.name === nodeName) {
  //         return {
  //           ...node,
  //           value: (node.value || 0) + incrementValue,
  //         };
  //       } else if (node.children) {
  //         return {
  //           ...node,
  //           children: updateNodeValueInTree(
  //             node.children,
  //             nodeName,
  //             incrementValue
  //           ),
  //         };
  //       }
  //       return node;
  //     })
  //   );
  // };
  const updateNodeValueInTree = (
    nodes: TreeNode[],
    nodeName: string,
    incrementValue: number
  ): TreeNode[] => {
    return nodes.map((node) => {
      const updatedNode = { ...node };
      if (node.name === nodeName) {
        updatedNode.value = (node.value || 0) + incrementValue;
      } else if (node.children) {
        updatedNode.children = updateNodeValueInTree(
          node.children,
          nodeName,
          incrementValue
        );
      }
      console.log(updatedNode);

      return updatedNode;
    });
  };
  const handleButtonClick = () => {
    console.log("running...");

    const updatedData = JSON.parse(JSON.stringify(data));
    console.log(updatedData);

    const updateNodeValueInData = (nodes: TreeNode[], nodeName: string) => {
      nodes.forEach((node) => {
        if (node.name === nodeName) {
          node.value = (node.value || 0) + 1;
        } else if (node.children) {
          updateNodeValueInData(node.children, nodeName);
        }
      });
    };

    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        updateNodeValueInData(updatedData.children || [], checkbox.id);
      }
    });
  };

  const renderTreeNode = (node: TreeNode) => {
    if (node.children && node.children.length > 0) {
      return (
        <ul>
          {node.children.map((child) => (
            <li key={child.id}>
              {child.name}
              {renderTreeNode(child)}
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <label>
          <input type="checkbox" id={node.name} />
        </label>
      );
    }
  };
  return (
    <div>
      <button onClick={handleButtonClick}>Update Value</button>
      {data && data.children && data.children.length > 0 ? (
        data.children.map((node, index) => (
          <div key={index}>
            <p>{node.name}</p>
            {renderTreeNode(node)}
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

const Post: React.FC = () => {
  const [parsedNodeData, setParsedNodeData] = useState<TreeNode>({
    id: 0,
    name: "",
    value: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWheelData = async () => {
      /* ----------------------------- firebase config ---------------------------- */
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      };
      /* ------------------------------ firebase init ----------------------------- */
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const db = getFirestore();

      const email = "test@test.com";
      const password = "112233";

      try {
        const userIdent = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userIdent);

        const user = userIdent.user;
        console.log("logged in as :", user.email);

        const userUid = user.uid;

        const q = query(
          collection(db, "Members"),
          where("__name__", "==", userUid)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.docs.forEach((doc) => {
          const parsedData = JSON.parse(doc.data().wheelData);
          setParsedNodeData(parsedData);
          console.log(parsedData);

          setIsLoading(false);
        });
      } catch (err: any) {
        console.error("Login failed:", err.message);
        setIsLoading(false);
      }
    };

    fetchWheelData();
  }, []);

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <CheckboxTree data={parsedNodeData} />}
    </div>
  );
};
export default Post;
