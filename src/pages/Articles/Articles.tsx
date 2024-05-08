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
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
interface ArticleData {
  picture: string;
  text: string;
  title: string;
  tags: (string | null)[];
  articleUid: string;
}

gsap.registerPlugin(ScrollTrigger);
/* ----------------------------- cards animation ---------------------------- */
const ArticleCardWrapper = styled.div`
  opacity: 0;
  transform: translateX(-50px);
`;
const ArticleCard = styled(({ ...props }) => {
  const cardRef = useRef(null);
  useEffect(() => {
    const section = cardRef.current;

    gsap.fromTo(
      section,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          once: true,
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);
  return <ArticleCardWrapper ref={cardRef} {...props} />;
})`
  background-color: #e9e7e0;
  height: 200px;
  display: flex;
  margin: 25px auto;
  box-shadow: 3px 3px 5px 2px rgba(89, 89, 89, 0.3);
  border-radius: 8px;
  transition: all 0.3s;
  &:hover {
    box-shadow: 1px 1px 2px 1px rgba(89, 89, 89, 0.7);
    background-color: #c4c2bc;
  }
`;
/* ----------------------------- cards animation ---------------------------- */
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
    <Container>
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
