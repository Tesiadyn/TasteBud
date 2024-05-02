import { useParams } from "react-router-dom";
import { firestore } from "../../utilities/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  Container,
  Wrapper,
  ArticleSection,
  SectionTitle,
  ArticleText,
  PageLink,
  PrevPageBtn,
} from "./ArticleStyle";

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
    <Container>
      <Wrapper>
        <ArticleSection>
          <PageLink to="/articles">
            <PrevPageBtn>回文章列表</PrevPageBtn>
          </PageLink>
          <SectionTitle>{articleData?.title}</SectionTitle>
          <ArticleText>
            <p>{articleData?.text}</p>
          </ArticleText>
        </ArticleSection>
      </Wrapper>
    </Container>
  );
};

export default Article;
