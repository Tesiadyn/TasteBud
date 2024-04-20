import {
  Container,
  PromoBanner,
  PromoBannerTitle,
  PromoBannerBtn,
  ArticleSectionTitle,
  SectionTitleDivider,
  ArticleCardsWrapper,
  ArticleCard,
  ArticleCardInfoDiv,
  ArticleCardTitle,
  ArticleCardText,
  ArticleCardImg,
  ArticleSection,
  CommentsSection,
  CommentsCardsWrapper,
  CommentsCard,
  CommentsCardAuthorId,
  CommentsCardAuthorImg,
  CommentsCardImg,
  CommentsCardAuthorImgDiv,
  CommentsCardImgDiv,
  CommentsCardInfoDiv,
  CommentsCardText,
  CommentsCardTitle,
  CommentsSectionTitle,
  ArticleCardImgDiv,
  CommentsCardAuthorDiv,
  Wrapper,
} from "./HomeStyle";
import ArticlePic1 from "../../assets/article-picture-1.jpg";
import ArticlePic2 from "../../assets/article-picture-2.jpg";
import ArticlePic3 from "../../assets/article-picture-3.jpg";
import CommentsPic2 from "../../assets/event-picture-2.jpg";
import AuthorPic1 from "../../assets/Profile.png";
import { useEffect, useState } from "react";
import { firestore } from "../../utilities/firebase.tsx";
import { collection, getDocs, query } from "firebase/firestore";

interface ArticleData {
  picture: string;
  text: string;
  title: string;
  tags: (string | null)[];
  articleUid: string;
}

interface ProductsData {
  bottler: string;
  caskType: string;
  distillery: string;
  picture: string;
  size: string;
  strength: string;
  title: string;
  productUid: string;
}

const Home = () => {
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

  const [productsData, setProductsData] = useState<Array<ProductsData>>([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const db = firestore;
      try {
        const q = query(collection(db, "Products"));
        const querySnapShot = await getDocs(q);
        const newData = querySnapShot.docs.map((doc) => {
          const eventDataFromDoc = doc.data() as ProductsData;
          return eventDataFromDoc;
        });
        setProductsData(newData);
      } catch (err) {
        console.error("Error when fetch Products data : ", err);
      }
    };
    fetchProductsData();
  }, []);
  console.log(productsData);

  return (
    <Container>
      <Wrapper>
        <PromoBanner>
          <PromoBannerTitle>
            探索Woodford : 蜂蜜與橡木的完美結合
          </PromoBannerTitle>
          <PromoBannerBtn>閱讀更多</PromoBannerBtn>
        </PromoBanner>
        <ArticleSection>
          <ArticleSectionTitle>知識專欄</ArticleSectionTitle>
          <SectionTitleDivider />
          <ArticleCardsWrapper>
            {articleData.map((data) => (
              <ArticleCard>
                <ArticleCardImgDiv>
                  <ArticleCardImg src={data.picture} />
                </ArticleCardImgDiv>
                <ArticleCardInfoDiv>
                  <ArticleCardTitle>{data.title}</ArticleCardTitle>
                </ArticleCardInfoDiv>
              </ArticleCard>
            ))}
            <ArticleCard>
              <ArticleCardImgDiv>
                <ArticleCardImg src={ArticlePic1} />
              </ArticleCardImgDiv>
              <ArticleCardInfoDiv>
                <ArticleCardTitle>標題</ArticleCardTitle>
                <ArticleCardText>內文</ArticleCardText>
              </ArticleCardInfoDiv>
            </ArticleCard>
            <ArticleCard>
              <ArticleCardImgDiv>
                <ArticleCardImg src={ArticlePic2} />
              </ArticleCardImgDiv>
              <ArticleCardInfoDiv>
                <ArticleCardTitle>標題</ArticleCardTitle>
                <ArticleCardText>內文</ArticleCardText>
              </ArticleCardInfoDiv>
            </ArticleCard>
            <ArticleCard>
              <ArticleCardImgDiv>
                <ArticleCardImg src={ArticlePic3} />
              </ArticleCardImgDiv>
              <ArticleCardInfoDiv>
                <ArticleCardTitle>標題</ArticleCardTitle>
                <ArticleCardText>內文</ArticleCardText>
              </ArticleCardInfoDiv>
            </ArticleCard>
          </ArticleCardsWrapper>
        </ArticleSection>
        <CommentsSection>
          <CommentsSectionTitle>最新評論</CommentsSectionTitle>
          <SectionTitleDivider />
          <CommentsCardsWrapper>
            {productsData.map((data) => (
              <CommentsCard>
                <CommentsCardImgDiv>
                  <CommentsCardImg src={data.picture} />
                </CommentsCardImgDiv>
                <CommentsCardInfoDiv>
                  <CommentsCardTitle>{data.title}</CommentsCardTitle>
                </CommentsCardInfoDiv>
              </CommentsCard>
            ))}
            <CommentsCard>
              <CommentsCardImgDiv>
                <CommentsCardImg src={CommentsPic2} />
              </CommentsCardImgDiv>
              <CommentsCardInfoDiv>
                <CommentsCardTitle>
                  Laphroaig Cairdeas 2023 White Port & Madeira
                </CommentsCardTitle>
                <CommentsCardText>
                  口感中後段及尾韻表現豐富，明顯喝得出高年份老酒的底蘊，加上恰到好處的煙燻味點綴，整體加分不少，能夠在調和威士忌喝出層次感，可說是....
                  (閱讀全文)
                </CommentsCardText>
              </CommentsCardInfoDiv>
              <CommentsCardAuthorDiv>
                <CommentsCardAuthorImgDiv>
                  <CommentsCardAuthorImg src={AuthorPic1} />
                </CommentsCardAuthorImgDiv>
                <CommentsCardAuthorId>123775+++</CommentsCardAuthorId>
              </CommentsCardAuthorDiv>
            </CommentsCard>
          </CommentsCardsWrapper>
        </CommentsSection>
      </Wrapper>
    </Container>
  );
};
export default Home;
