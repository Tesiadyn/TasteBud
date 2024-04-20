import { useParams } from "react-router-dom";
import { firestore } from "../../utilities/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

interface ArticleData {
  picture: string;
  text: string;
  title: string;
  tags: (string | null)[];
  articleUid: string;
}

const Article = () => {
  const { id } = useParams();

  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const db = firestore;

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const q = query(
          collection(db, "Articles"),
          where("articleUid", "==", id)
        );
        const querySnapshot = await getDocs(q);
        const articleData = querySnapshot.docs.map(
          (doc) => doc.data() as ArticleData
        );
        setArticleData(articleData[0]);
      } catch (err) {
        console.error("Error when fatching product data : ", err);
      }
    };
    fetchArticleData();
  }, []);
  return (
    <>
      <h1>{articleData?.title}</h1>
      <p>{articleData?.text}</p>
    </>
  );
};

export default Article;
