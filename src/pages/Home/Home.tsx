import {
  Container,
  PromoBannerSection,
  PromoBannerTitle,
  PromoBannerText,
  ArticleSectionTitle,
  ArticleCards,
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
  ArticlesLink,
  Wrapper,
  PageLink,
  PromoBannerInfoDiv,
  PromoBannerSubTitle,
  PromoBannerIconDiv,
  PromoBannerImg,
  FeaturesSection,
  FeaturesDiv,
  FeaturesTitle,
  FeatureCard,
  FeatureCardImgDiv,
  FeatureCardImg,
  FeatureCardInfoDiv,
  FeatureCardTitle,
  FeatureCardText,
  FeatureCards,
  FeatureSubTitle,
} from "./HomeStyle";
import { useEffect, useState } from "react";
import { firestore } from "../../utilities/firebase.tsx";
import { collection, getDocs, query } from "firebase/firestore";
import PromoBannerIcon from "../../assets/promoBannerIcon.png";
import ArticlesIcon from "../../assets/articlesIcon.svg";
import CommentsIcon from "../../assets/commentsIcon.svg";
import EventsIcon from "../../assets/eventsIcon.svg";

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

  return (
    <Container>
      <Wrapper>
        <PromoBannerSection>
          <PromoBannerInfoDiv>
            <PromoBannerTitle>TASTEBUD</PromoBannerTitle>
            <PromoBannerSubTitle>
              True comments about teste.
            </PromoBannerSubTitle>
            <PromoBannerIconDiv>
              <PromoBannerImg src={PromoBannerIcon} />
            </PromoBannerIconDiv>
            <PromoBannerText>
              - Founded in 2024 & made with passion -
            </PromoBannerText>
          </PromoBannerInfoDiv>
        </PromoBannerSection>
        <FeaturesSection>
          <FeaturesDiv>
            <FeaturesTitle>Features</FeaturesTitle>
            <FeatureSubTitle>
              What is TasteBud? This is our main feature.
            </FeatureSubTitle>
            <FeatureCards>
              <FeatureCard>
                <FeatureCardImgDiv>
                  <FeatureCardImg src={ArticlesIcon} />
                </FeatureCardImgDiv>
                <FeatureCardInfoDiv>
                  <FeatureCardTitle>Articles</FeatureCardTitle>
                  <FeatureCardText>
                    Explore our knowledge column to learn about whisky
                    craftsmanship, history, and tasting techniques, becoming a
                    whisky connoisseur.
                  </FeatureCardText>
                </FeatureCardInfoDiv>
              </FeatureCard>
              <FeatureCard>
                <FeatureCardImgDiv>
                  <FeatureCardImg src={CommentsIcon} />
                </FeatureCardImgDiv>
                <FeatureCardInfoDiv>
                  <FeatureCardTitle>Comments</FeatureCardTitle>
                  <FeatureCardText>
                    In our user reviews section, you can rate and review various
                    whiskies, engaging in discussions with others and sharing
                    your perspectives.
                  </FeatureCardText>
                </FeatureCardInfoDiv>
              </FeatureCard>
              <FeatureCard>
                <FeatureCardImgDiv>
                  <FeatureCardImg src={EventsIcon} />
                </FeatureCardImgDiv>
                <FeatureCardInfoDiv>
                  <FeatureCardTitle>Events</FeatureCardTitle>
                  <FeatureCardText>
                    Our regular tasting events provide unique tasting
                    experiences and opportunities to connect with whisky experts
                    and fellow enthusiasts.
                  </FeatureCardText>
                </FeatureCardInfoDiv>
              </FeatureCard>
            </FeatureCards>
          </FeaturesDiv>
        </FeaturesSection>
        <ArticleSection>
          <ArticleSectionTitle>Latest Articles</ArticleSectionTitle>
          {/* <SectionTitleDivider /> */}
          <ArticleCards>
            {articleData.map((data, index) => (
              <PageLink
                key={index}
                to={`/article/${data.articleUid}`}
                className="articleCard"
              >
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
          </ArticleCards>
          <PageLink to="/articles">
            <ArticlesLink>Read More</ArticlesLink>
          </PageLink>
        </ArticleSection>
        <ProductSection>
          <ProductSectionTitle>最新評論</ProductSectionTitle>

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
