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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import {
  CheckboxTreeWrapper,
  TreeList,
  TreeItem,
  SubmitButton,
} from "./PostStyle";
import { toaster } from "evergreen-ui";
import "./PostStyles.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
  const [isOpen, setIsOpen] = useState(false);
  const [quillValue, setQuillValue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
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
      const authorUid = user?.uid;
      const authorName = user?.displayName;
      const wheelData = parsedData;
      const commentData = {
        authorName,
        authorUid,
        productUid,
        wheelData,
        quillValue,
      };
      const commentRef = await addDoc(collection(db, "Comments"), commentData);
      const commentUid = commentRef.id;
      // console.log("Document written with ID: ", commentRef.id);
      updateFirestoreData(parsedData, commentUid);
    } catch (err) {
      console.error("Error when writing new doc : ", err);
    }
  };

  const updateFirestoreData = async (
    parsedData: object,
    commentUid: string
  ) => {
    if (parsedData) {
      try {
        const user = auth?.currentUser;
        const userUid = user?.uid;
        if (userUid) {
          const docRef = doc(db, "Members", userUid);
          await updateDoc(docRef, {
            wheelData: JSON.stringify(parsedData),
            commentsUid: commentUid,
          });
          // console.log(`Data updated in Firestore in uid : ${userUid}`);
        }
      } catch (err) {
        console.error("Error when updating data:", err);
      }
    }
  };
  const handleSubmit = () => {
    console.log("handleSubmit running...");

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
    // console.log(parsedData);
    addCommentDoc(parsedData);
    toaster.success("Submit Success!");
    navigate("/products");
  };

  const renderTreeNode = (node: TreeNode) => {
    if (node.children && node.children.length > 0) {
      return (
        <TreeList key={node.name}>
          <div>
            {node.children.map((child) => (
              <Accordion key={child.id}>
                <AccordionSummary>{child.name}</AccordionSummary>
                {renderTreeNode(child)}
              </Accordion>
            ))}
          </div>
        </TreeList>
      );
    } else {
      return (
        <AccordionDetails>
          <input type="checkbox" id={node.name} />
        </AccordionDetails>
      );
    }
  };
  return (
    <>
      {data && data.children && data.children.length > 0 ? (
        <>
          {data.children.map((node, index) => (
            <div key={index}>
              <p>{node.name}</p>
              {renderTreeNode(node)}
            </div>
          ))}
          <ReactQuill
            theme="snow"
            value={quillValue}
            onChange={setQuillValue}
          />
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
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
          <CheckboxTreeWrapper>
            <CheckboxTree data={parsedNodeData} />
          </CheckboxTreeWrapper>
        </>
      )}
    </>
  );
};
export default Post;
