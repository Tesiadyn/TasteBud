import {
  Container,
  BannerSection,
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
  SelectedTag,
  TagSectionTitle,
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

const tagsList = ["歷史", "製程", "調和", "其他", "名詞", "入門"];

const Articles = () => {
  const [articleData, setArticleData] = useState<Array<ArticleData>>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    // fetch all articles when user enters
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
  // const handleTagClick = (e:React.MouseEvent<HTMLButtonElement>) => {
  //   const searchTagArticle = async (target:string) => {
  //     try{
  //       const articleRef = collection(firestore, "Articles");
  //       const articleQuery = query(
  //         articleRef,
  //         where("tags", "array-contains", target)
  //       );
  //       const articleSnapshot = await getDocs(articleQuery);
  //       const resultArticles = articleSnapshot.docs.map((doc)=>{
  //         const articleDataFromDoc = doc.data() as ArticleData;
  //         return articleDataFromDoc ;
  //       })
  //       setArticleData(resultArticles);
  //     } catch (err:any) {
  //       console.error("Error when getting article data : ", err.message)
  //     }
  //   }
  //   const getTagValue = async (e:React.MouseEvent<HTMLButtonElement>) => {
  //     try{
  //       const target = e.currentTarget.value;
  //       searchTagArticle(target);
  //     } catch (err:any){
  //       console.error("Error when searching Tag related article : ", err.message)
  //     }
  //   }
  //   getTagValue(e);

  //  }
  // const handleTagClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   try {
  //     const target = e.currentTarget.value;
  //     const articleRef = collection(firestore, "Articles");
  //     const articleQuery = query(articleRef, where("tags", "array-contains", target));
  //     const articleSnapshot = await getDocs(articleQuery);
  //     const resultArticles = articleSnapshot.docs.map((doc) => {
  //       const articleDataFromDoc = doc.data() as ArticleData;
  //       return articleDataFromDoc;
  //     });
  //     setArticleData(resultArticles);
  //   } catch (err: any) {
  //     console.error("Error when getting article data : ", err.message);
  //   }
  // };
  const filterArticlesByTags = (articles: ArticleData[], tags: string[]) => {
    if (tags.length === 0) return articles;
    return articles.filter((article) =>
      article.tags.some((tag) => tags.includes(tag!))
    );
  };

  const filteredArticles: ArticleData[] = filterArticlesByTags(
    articleData,
    selectedTags
  );

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <Container elevation={8} sx={{ bgcolor: "#e7e7e7" }}>
      <BannerSection>
        <PageTitle>Articles</PageTitle>
        <PageSubtitle>Dive into the world of whisky!</PageSubtitle>
      </BannerSection>
      <Wrapper>
        <TagsSection>
          <TagSectionTitle>Categories</TagSectionTitle>
          <Tags>
            {tagsList.map((tag, index) => (
              <Tag
                as={selectedTags.includes(tag) ? SelectedTag : undefined}
                onClick={() => handleTagClick(tag)}
                value={tag}
                key={index}
              >
                {tag}
              </Tag>
            ))}
          </Tags>
        </TagsSection>
        <ArticlesSection>
          {filteredArticles.map((data, index) => (
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
