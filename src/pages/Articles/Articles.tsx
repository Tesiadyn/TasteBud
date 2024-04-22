import {
  Container,
  TagsDiv,
  TagsSection,
  Wrapper,
  Tags,
  TagText,
  Tag,
  ArticlesSection,
  ArticleImgDiv,
  ArticleImg,
  ArticleInfoTags,
  ArticleCard,
  ArticleInfoTag,
  ArticleInfoDiv,
  ArticleInfoTitle,
  PageTitle,
  PageSubtitle,
  PageLink,
} from "./ArticlesStyle";
import { firestore } from "../../utilities/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

interface ArticleData {
  picture: string;
  text: string;
  title: string;
  tags: (string | null)[];
  articleUid: string;
}

const Articles = () => {
  const [articleData, setArticleData] = useState<Array<ArticleData>>([]);

  useEffect(() => {
    const fetchArticleData = async () => {
      const db = firestore;
      try {
        const q = query(collection(db, "Articles"));
        const querySnapShot = await getDocs(q);
        const newData = querySnapShot.docs.map((doc) => {
          const articleDataFromDoc = doc.data() as ArticleData;
          return articleDataFromDoc;
        });
        setArticleData(newData);
      } catch (err) {
        console.error("Error when fetch events data : ", err);
      }
    };
    fetchArticleData();
  }, []);
  console.log(articleData);

  return (
    <Container>
      <Wrapper>
        <PageTitle>知識專欄</PageTitle>
        <PageSubtitle>這邊囊括了所有身為品飲者所需的知識!</PageSubtitle>
        <TagsSection>
          <TagsDiv>
            <Tags>
              <Tag>
                <TagText>歷史</TagText>
              </Tag>
              <Tag>
                <TagText>製程</TagText>
              </Tag>
              <Tag>
                <TagText>單一麥芽</TagText>
              </Tag>
              <Tag>
                <TagText>調和</TagText>
              </Tag>
              <Tag>
                <TagText>蘇格蘭</TagText>
              </Tag>
              <Tag>
                <TagText>愛爾蘭</TagText>
              </Tag>
              <Tag>
                <TagText>美國</TagText>
              </Tag>
              <Tag>
                <TagText>其他</TagText>
              </Tag>
            </Tags>
          </TagsDiv>
        </TagsSection>
        <ArticlesSection>
          {articleData.map((data, index) => (
            <PageLink key={index} to={`/article/${data.articleUid}`}>
              <ArticleCard>
                <ArticleImgDiv>
                  <ArticleImg src={data.picture} />
                </ArticleImgDiv>
                <ArticleInfoDiv>
                  <ArticleInfoTags>
                    {data.tags.map((tag, index) => (
                      <ArticleInfoTag key={index}>{tag}</ArticleInfoTag>
                    ))}
                  </ArticleInfoTags>
                  <ArticleInfoTitle>{data.title}</ArticleInfoTitle>
                </ArticleInfoDiv>
              </ArticleCard>
            </PageLink>
          ))}
        </ArticlesSection>
      </Wrapper>
    </Container>
  );
};

export default Articles;
