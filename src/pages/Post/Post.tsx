import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface FlavourNode {
  id: number;
  name: string;
  selectedCount: number;
  children: FlavourNode[];
}

export interface FlavourNodeProps {
  node: FlavourNode;
  onNodeSelect: (nodeId: number) => void;
}

interface CheckboxInputProps {
  label: string;
  defaultChecked?: boolean;
  onChange: (checked: boolean) => void;
}

export const sampleFlavourData: FlavourNode[] = [
  {
    id: 0,
    name: "Aroma",
    selectedCount: 0,
    children: [
      {
        id: 1,
        name: "sap",
        selectedCount: 0,
        children: [
          { id: 5, name: "FreshWood", selectedCount: 0, children: [] },
          { id: 6, name: "WetWood", selectedCount: 0, children: [] },
        ],
      },
      {
        id: 2,
        name: "Cedar",
        selectedCount: 0,
        children: [
          { id: 7, name: "Sawdust", selectedCount: 0, children: [] },
          { id: 8, name: "Carton", selectedCount: 0, children: [] },
          { id: 9, name: "SharpenedPencil", selectedCount: 0, children: [] },
        ],
      },
      {
        id: 3,
        name: "Oak",
        selectedCount: 0,
        children: [
          { id: 10, name: "Resin", selectedCount: 0, children: [] },
          { id: 11, name: "Varnish", selectedCount: 0, children: [] },
        ],
      },
      {
        id: 4,
        name: "Pine",
        selectedCount: 0,
        children: [
          { id: 12, name: "Turpentine", selectedCount: 0, children: [] },
          { id: 13, name: "Retsina", selectedCount: 0, children: [] },
        ],
      },
    ],
  },
];
const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  defaultChecked = false,
  onChange,
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (onChange) {
      onChange(isChecked);
    }
  };

  return (
    <label>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {label}
    </label>
  );
};

const Post: React.FC = () => {
  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);

  const handleNodeSelect = (nodeId: number) => {
    setSelectedNodes((prevSelectedNodes) => {
      if (prevSelectedNodes.includes(nodeId)) {
        return prevSelectedNodes.filter((id) => id !== nodeId);
      } else {
        return [...prevSelectedNodes, nodeId];
      }
    });
  };

  const handleSubmit = async () => {
    const auth = getAuth();
    try {
      // 获取当前用户的UID
      const currentUser = auth.currentUser;
      if (currentUser) {
        const uid = currentUser.uid;

        // 将用户的选择数据存储到Firestore中的用户文档中
        const userDocRef = doc(db, "Member", uid);
        await setDoc(userDocRef, {
          selectedNodes: selectedNodes,
        });
        console.log("User document updated for UID: ", uid);
      }
    } catch (error) {
      console.error("Error updating user document: ", error);
    }
  };

  /* -------------------------------- autologin ------------------------------- */
  useEffect(() => {
    const auth = getAuth();
    const email = "test@test.com";
    const password = "112233";

    signInWithEmailAndPassword(auth, email, password)
      .then((userIdent) => {
        const user = userIdent.user;
        console.log("logged in as :", user.email);
      })
      .catch((err) => {
        console.error("Login failed:", err.message);
      });
  }, []);

  return (
    <div>
      {sampleFlavourData.map((node) => (
        <div key={node.id}>
          <CheckboxInput
            label={node.name}
            defaultChecked={node.selectedCount > 0}
            onChange={() => handleNodeSelect(node.id)}
          />
          {node.children.map((child) => (
            <div key={child.id} style={{ marginLeft: "20px" }}>
              <CheckboxInput
                label={child.name}
                defaultChecked={child.selectedCount > 0}
                onChange={() => handleNodeSelect(child.id)}
              />
              {child.children.map((grandChild) => (
                <div key={grandChild.id} style={{ marginLeft: "40px" }}>
                  <CheckboxInput
                    label={grandChild.name}
                    defaultChecked={grandChild.selectedCount > 0}
                    onChange={() => handleNodeSelect(grandChild.id)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
export default Post;
