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
  ArticleCardImg,
  ArticleSection,
  ProductSection,
  ProductCardsWrapper,
  ProductCard,
  ProductCardImg,
  ProductCardImgDiv,
  ProductCardInfoDiv,
  ProductCardTitle,
  ProductSectionTitle,
  ArticleCardImgDiv,
  Wrapper,
  PageLink,
} from "./HomeStyle";
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
            {articleData.map((data, index) => (
              <PageLink key={index} to={`/article/${data.articleUid}`} className="article">
                <ArticleCard>
                  <ArticleCardImgDiv>
                    <ArticleCardImg src={data.picture} />
                  </ArticleCardImgDiv>
                  <ArticleCardInfoDiv>
                    <ArticleCardTitle>{data.title}</ArticleCardTitle>
                  </ArticleCardInfoDiv>
                </ArticleCard>
              </PageLink>
            ))}
          </ArticleCardsWrapper>
        </ArticleSection>
        <ProductSection>
          <ProductSectionTitle>最新評論</ProductSectionTitle>
          <SectionTitleDivider />
          <ProductCardsWrapper>
            {productsData.map((data, index) => (
              <PageLink key={index} to={`/product/${data.productUid}`}>
                <ProductCard>
                  <ProductCardImgDiv>
                    <ProductCardImg src={data.picture} />
                  </ProductCardImgDiv>
                  <ProductCardInfoDiv>
                    <ProductCardTitle>{data.title}</ProductCardTitle>
                  </ProductCardInfoDiv>
                </ProductCard>
              </PageLink>
            ))}
          </ProductCardsWrapper>
        </ProductSection>
      </Wrapper>
    </Container>
  );
};
export default Home;
