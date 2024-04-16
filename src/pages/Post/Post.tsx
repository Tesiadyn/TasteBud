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

const data = [
  {
    name: "Aroma",
    children: [
      {
        name: "sap",
        children: [
          { name: "FreshWood", value: 0 },
          { name: "WetWood", value: 0 },
        ],
      },
      {
        name: "Cedar",
        children: [
          { name: "Sawdust", value: 0 },
          { name: "Carton", value: 0 },
          { name: "SharpenedPencil", value: 0 },
        ],
      },
      {
        name: "Oak",
        children: [
          { name: "Resin", value: 0 },
          { name: "Varnish", value: 0 },
        ],
      },
      {
        name: "Pine",
        children: [
          { name: "Turpentine", value: 0 },
          { name: "Retsina", value: 0 },
        ],
      },
    ],
  },
];

interface TreeNode {
  name: string;
  value?: number;
  children?: TreeNode[];
}

interface Props {
  data: TreeNode[];
}

const CheckboxTree: React.FC<Props> = ({ data }) => {
  const [treeData, setTreeData] = useState<TreeNode[]>(data);

  const updateNodeValue = (nodeName: string, incrementValue: number) => {
    setTreeData((prevData) =>
      prevData.map((node) => {
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
      })
    );
  };

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

    const selectedNodes: string[] = [];
    const updateNodeValuesFromCheckboxes = (nodes: TreeNode[]) => {
      nodes.forEach((node) => {
        if (node.children) {
          updateNodeValuesFromCheckboxes(node.children); 
        }
        const checkbox = document.getElementById(node.name);
        if (checkbox && (checkbox as HTMLInputElement).checked) {
          selectedNodes.push(node.name);
        }
      });
    };

    updateNodeValuesFromCheckboxes(data);

    selectedNodes.forEach((nodeName) => {
      updateNodeValueInTree(data, nodeName, 1); 
    });
  };

  const renderTreeNode = (node: TreeNode) => {
    if (node.children && node.children.length > 0) {
      return (
        <ul>
          {node.children.map((child, index) => (
            <li key={index}>
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
      {data.map((node, index) => (
        <div key={index}>
          <p>{node.name}</p>
          {renderTreeNode(node)}
        </div>
      ))}
    </div>
  );
};

const Post: React.FC = () => {
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
        });
      } catch (err: any) {
        console.error("Login failed:", err.message);
      }
    };

    fetchWheelData();
  }, []);

  return <CheckboxTree data={data} />;
};
export default Post;
