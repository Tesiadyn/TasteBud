import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
  const [updatedData, setUpdatedData] = useState<TreeNode | null>(null);

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

      return updatedNode;
    });
  };
  const handleButtonClick = () => {
    console.log("handleButtonClick running...");

    const parsedData = JSON.parse(JSON.stringify(data));

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
        updateNodeValueInData(parsedData.children || [], checkbox.id);
      }
    });
    console.log(parsedData);
    setUpdatedData(parsedData);
  };

  useEffect(() => {
    const updateFirestoreData = async () => {
      if (updatedData) {
        try {
          const userIdent = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userIdent.user;
          const userUid = user.uid;

          const docRef = doc(db, "Members", userUid);
          await updateDoc(docRef, {
            wheelData: JSON.stringify(updatedData),
          });
          console.log(`Data updated in Firestore in uid : ${userUid}`);
        } catch (err) {
          console.error("Error when updating data:", err);
        }
      }
    };
    updateFirestoreData();
  }, [updatedData]);

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
      try {
        const userIdent = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

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
          // console.log(parsedData);

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
