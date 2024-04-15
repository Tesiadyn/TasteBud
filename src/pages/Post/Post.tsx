import React, { useEffect } from "react";
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

interface Props{
  data: TreeNode[];
}

const CheckboxTree: React.FC<Props> = ({ data }) => {
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
          <input type="checkbox" />
        </label>
      );
    }
  };

  return (
    <div>
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
          console.log(parsedData);
          
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
