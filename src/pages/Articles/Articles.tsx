import {
  Container,
  TagsDiv,
  TagsSection,
  Wrapper,
  Tags,
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
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

interface ArticleData {
  picture: string;
  text: string;
  title: string;
  tags: (string | null)[];
  articleUid: string;
}

const tagsList = [
  "歷史",
  "製程",
  "單一麥芽",
  "調和",
  "蘇格蘭",
  "愛爾蘭",
  "美國",
  "其他",
  "名詞",
  "入門",
];

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
  // console.log(articleData);
  const handleTagClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    const searchTagArticle = async (target:string) => {
      try{
        const articleRef = collection(firestore, "Articles");
        const articleQuery = query(
          articleRef,
          where("tags", "array-contains", target)
        );
        const articleSnapshot = await getDocs(articleQuery);
        const resultArticles = articleSnapshot.docs.map((doc)=>{
          const articleDataFromDoc = doc.data() as ArticleData;
          return articleDataFromDoc ;
        })
        setArticleData(resultArticles);
      } catch (err:any) {
        console.error("Error when getting article data : ", err.message)
      }
    }
    const getTagValue = async (e:React.MouseEvent<HTMLButtonElement>) => {
      try{
        const target = e.currentTarget.value;
        searchTagArticle(target);
      } catch (err:any){
        console.error("Error when searching Tag related article : ", err.message)
      }
    }
    getTagValue(e);

   }

  return (
    <Container>
      <Wrapper>
        <PageTitle>知識專欄</PageTitle>
        <PageSubtitle>這邊囊括了所有身為品飲者所需的知識!</PageSubtitle>
        <TagsSection>
          <TagsDiv>
            <Tags>
              {tagsList.map((tag, index) => (
                <Tag onClick={handleTagClick} value={tag} key={index}>
                  {tag}
                </Tag>
              ))}
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
