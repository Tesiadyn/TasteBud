import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

import { firestore } from "../../utilities/firebase";
import { useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";

const db = firestore;
const auth = getAuth();


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
  const [commentText, setCommentText] = useState("");
  const { id } = useParams();

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
  const addCommentDoc = async (parsedData: object) => {
    try {
      const user = auth.currentUser;
      const productUid = id?.toString();
      console.log(productUid);

      const authorUid = user?.uid;
      const wheelData = parsedData;
      const commentData = {
        authorUid,
        commentText,
        productUid,
        wheelData,
      };
      console.log(commentData);
      const commentRef = await addDoc(collection(db, "Comments"), commentData);
      console.log("Document written with ID: ", commentRef.id);
    } catch (err) {
      console.error("Error when writing new doc : ", err);
    }
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

    addCommentDoc(parsedData);
    setUpdatedData(parsedData);
  };

  useEffect(() => {
    const updateFirestoreData = async () => {
      if (updatedData) {
        try {
          const user = auth?.currentUser;
          const userUid = user?.uid;
          if (userUid) {
            const docRef = doc(db, "Members", userUid);
            await updateDoc(docRef, {
              wheelData: JSON.stringify(updatedData),
            });
            console.log(`Data updated in Firestore in uid : ${userUid}`);
          }
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
    <>
      <button onClick={handleButtonClick}>Update Value</button>
      {data && data.children && data.children.length > 0 ? (
        <>
          {data.children.map((node, index) => (
            <div key={index}>
              <p>{node.name}</p>
              {renderTreeNode(node)}
            </div>
          ))}

          <label>
            <input
              type="text"
              onChange={(e) => setCommentText(e.target.value)}
            />
          </label>
        </>
      ) : (
        <div>No data available</div>
      )}
    </>
  );
};

const Post: React.FC = () => {
  const [parsedNodeData, setParsedNodeData] = useState<TreeNode>({
    id: 0,
    name: "",
    value: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [quillValue, setQuillValue] = useState("");
  const navigate = useNavigate();
  
  const fetchWheelData = async (userUid: string) => {
      
    try {
      const q = query(
        collection(db, "Members"),
        where("__name__", "==", userUid)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.docs.forEach((doc) => {
        const parsedData = JSON.parse(doc.data().wheelData);
        setParsedNodeData(parsedData);


        setIsLoading(false);
      });
    } catch (err: any) {
      console.error("Login failed:", err.message);
      setIsLoading(false);
    }
    

  };

  useEffect(() => {
    const user = getAuth();

    const unsubscribe = onAuthStateChanged(user, (user) => {
      if (user) {
        fetchWheelData(user.uid);
      } else {
        navigate("/login");
      }
    });
    return unsubscribe;
  }, [navigate]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CheckboxTree data={parsedNodeData} />
          <ReactQuill theme="snow" value={quillValue} onChange={setQuillValue} />
        </>
      )}
    </>
  );
};
export default Post;
