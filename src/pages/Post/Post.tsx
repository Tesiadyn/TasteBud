import React, { useEffect, useState, useContext } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  arrayUnion,
} from "firebase/firestore";
import { UserContext } from "../../utilities/useContext";
import { firestore } from "../../utilities/firebase";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  CheckboxTreeWrapper,
  TreeList,
  SubmitButton,
  InputSection,
  SectionTitle,
  SectionSubTitle,
  CommentInput,
  Container,
  TreeListDiv,
  CategoryDiv,
  InputLabel,
  SubmitDiv,
  HelpCircleDiv,
} from "./PostStyle";
import { toaster } from "evergreen-ui";
import { HelpCircleSolid } from "iconoir-react";
import "./PostStyles.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import initWheelData from "../../pages/Product/initData.json";
import { pulsar } from "ldrs";
import { Tooltip } from "react-tooltip";
pulsar.register();
const db = firestore;
const auth = getAuth();
import { TreeNode, TreeNodeProps } from "@/interface";

const CheckboxTree: React.FC<TreeNodeProps> = ({ data }) => {
  const [commentText, setCommentText] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const updateNodeValueInTree = (
    nodes: TreeNode[],
    nodeName: string,
    incrementValue: number,
  ): TreeNode[] => {
    return nodes.map((node) => {
      const updatedNode = { ...node };
      if (node.name === nodeName) {
        updatedNode.value = (node.value || 0) + incrementValue;
      } else if (node.children) {
        updatedNode.children = updateNodeValueInTree(
          node.children,
          nodeName,
          incrementValue,
        );
      }
      return updatedNode;
    });
  };
  const addCommentDoc = async (parsedData: object, parsedInitData: object) => {
    try {
      const user = auth.currentUser;
      const productUid = id?.toString();
      const authorUid = user?.uid;
      const authorName = user?.displayName;
      const wheelData = parsedInitData;
      const commentData = {
        authorName,
        authorUid,
        productUid,
        wheelData,
        commentText,
      };
      const commentRef = await addDoc(collection(db, "Comments"), commentData);
      const commentUid = commentRef.id;
      updateFirestoreData(parsedData, commentUid);
    } catch (err) {
      console.error("Error when writing new doc : ", err);
    }
  };

  const updateFirestoreData = async (
    parsedData: object,
    commentUid: string,
  ) => {
    if (parsedData) {
      try {
        const user = auth?.currentUser;
        const userUid = user?.uid;
        if (userUid) {
          const docRef = doc(db, "Members", userUid);
          await updateDoc(docRef, {
            wheelData: JSON.stringify(parsedData),
            commentsUid: arrayUnion(commentUid),
          });
        }
      } catch (err) {
        console.error("Error when updating data:", err);
      }
    }
  };
  const handleSubmit = () => {
    const parsedData = JSON.parse(JSON.stringify(data));
    const parsedInitData = JSON.parse(JSON.stringify(initWheelData));

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
      'input[type="checkbox"]',
    );
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        updateNodeValueInData(parsedData.children || [], checkbox.id);
        updateNodeValueInData(parsedInitData.children || [], checkbox.id);
      }
    });

    addCommentDoc(parsedData, parsedInitData);
    toaster.success("Submit Success!");
    navigate(`/product/${id}`);
  };

  const renderTreeNode = (node: TreeNode) => {
    if (node.children && node.children.length > 0) {
      return (
        <TreeList key={node.name}>
          <TreeListDiv>
            {node.children.map((child) => (
              <Accordion key={child.id}>
                <AccordionSummary>{child.name}</AccordionSummary>
                {renderTreeNode(child)}
              </Accordion>
            ))}
          </TreeListDiv>
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
      <InputSection>
        {data && data.children && data.children.length > 0 ? (
          <>
            {data.children.map((node, index) => (
              <CategoryDiv key={index}>
                <p>{node.name}</p>
                {renderTreeNode(node)}
              </CategoryDiv>
            ))}
          </>
        ) : (
          <div>No data available</div>
        )}
      </InputSection>

      <SubmitDiv>
        <InputLabel htmlFor="commentText">
          <CommentInput
            maxLength={100}
            placeholder="Write down your thoughts... (Max 100 characters)"
            onChange={(e) => setCommentText(e.target.value)}
          />
        </InputLabel>
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </SubmitDiv>
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
  const { user } = useContext(UserContext);

  const fetchWheelData = async (userUid: string) => {
    try {
      const q = query(
        collection(db, "Members"),
        where("__name__", "==", userUid),
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
    if (user) {
      fetchWheelData(user.uid);
    }
  }, []);

  const LoadingContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 230px)",
    width: "100%",
    margin: "0 auto",
    padding: "50px",
    backgroundColor: "#dad8d6",
    borderRadius: "12px",
    boxShadow: "3px 3px 5px 2px rgba(89, 89, 89, 0.3)",
  };
  return (
    <>
      {isLoading ? (
        <div style={LoadingContainer}>
          <l-pulsar size="40" speed="1.75" color="black"></l-pulsar>
        </div>
      ) : (
        <Container>
          <SectionTitle>Flavours</SectionTitle>
          <SectionSubTitle>
            Choose the flavours you feel when tasing this!
          </SectionSubTitle>
          <HelpCircleDiv>
            <HelpCircleSolid
              className="my-anchor-element"
              color="#5e3106"
              height={24}
              width={24}
            />

            <Tooltip anchorSelect=".my-anchor-element" place="top">
              These boxes contains flavours and tastes , you can choose as many
              boxes as you want!
            </Tooltip>
          </HelpCircleDiv>
          <CheckboxTreeWrapper>
            <CheckboxTree data={parsedNodeData} />
          </CheckboxTreeWrapper>
        </Container>
      )}
    </>
  );
};
export default Post;
