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
  BackToTopBtn,
  BtnDiv,
  CoverSection,
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

  const handleToTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <Wrapper>
        <ArticleSection>
          <PageLink to="/articles">
            <PrevPageBtn>Back to Articles</PrevPageBtn>
          </PageLink>
          <CoverSection
            $backgroundImageUrl={articleData?.picture as string}
          ></CoverSection>
          <SectionTitle>{articleData?.title}</SectionTitle>
          <ArticleText>
            <p>{articleData?.text}</p>
          </ArticleText>
          <BtnDiv>
            <BackToTopBtn onClick={handleToTopClick} sx={{ color: "#a1803e" }}>
              Back to top
            </BackToTopBtn>
          </BtnDiv>
        </ArticleSection>
      </Wrapper>
    </Container>
  );
};

export default Article;
