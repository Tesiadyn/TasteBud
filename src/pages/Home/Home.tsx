import {
  Container,
  PromoBannerSection,
  PromoBannerTitle,
  PromoBannerText,
  ArticleSectionTitle,
  ArticleCard,
  ArticleCards,
  ArticleCardTitle,
  ArticleSection,
  ProductSection,
  ProductCardsWrapper,
  ProductCard,
  ProductCardImg,
  ProductCardImgDiv,
  ProductCardInfoDiv,
  ProductCardTitle,
  ProductSectionTitle,
  ArticlesLink,
  Wrapper,
  PageLink,
  PromoBannerInfoDiv,
  PromoBannerSubTitle,
  PromoBannerIconDiv,
  PromoBannerImg,
  FeaturesSection,
  FeaturesDiv,
  FeatureCardsDiv,
  FeaturesTitle,
  FeatureCard,
  FeatureCardImgDiv,
  FeatureCardImg,
  FeatureCardInfoDiv,
  FeatureCardTitle,
  FeatureCardText,
  FeatureCards,
  FeatureSubTitle,
  ProductCardText,
  FeatureBannerDiv,
  FeatureBanner,
  ArticleCardImgDiv,
  ArticleCardInfoDiv,
} from "./HomeStyle";
import { useEffect, useState } from "react";
import { firestore } from "../../utilities/firebase.tsx";
import { collection, getDocs, query } from "firebase/firestore";
import PromoBannerIcon from "../../assets/promoBannerIcon.png";
import ArticlesIcon from "../../assets/articlesIcon.svg";
import CommentsIcon from "../../assets/commentsIcon.svg";
import EventsIcon from "../../assets/eventsIcon.svg";
import WheelIcon from "../../assets/wheelIcon.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HomeStyles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FeatureBannerImage from "../../assets/featureBanner.jpg";

const theme = createTheme({
  palette: {
    background: {
      paper: "#f7f7f7",
    },
    text: {
      primary: "#a1803e",
      secondary: "#937e54",
    },
  },
});

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
  introText: string;
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
    <ThemeProvider theme={theme}>
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
          <FeaturesSection elevation={12} sx={{ bgcolor: "#e9e2db" }}>
            <FeaturesDiv>
              <FeaturesTitle>WHAT IS TASTEBUD?</FeaturesTitle>
              <FeatureSubTitle>THIS IS OUR MAIN FEATURES.</FeatureSubTitle>
              <FeatureCardsDiv>
                <FeatureBannerDiv>
                  <FeatureBanner src={FeatureBannerImage} />
                </FeatureBannerDiv>
                <FeatureCards>
                  <FeatureCard>
                    <FeatureCardImgDiv>
                      <FeatureCardImg src={ArticlesIcon} />
                    </FeatureCardImgDiv>
                    <FeatureCardInfoDiv>
                      <FeatureCardTitle>Articles by pros</FeatureCardTitle>
                      <FeatureCardText>
                        Explore our knowledge column to learn about whisky
                        craftsmanship, history, and tasting techniques, becoming
                        a whisky connoisseur.
                      </FeatureCardText>
                    </FeatureCardInfoDiv>
                  </FeatureCard>
                  <FeatureCard>
                    <FeatureCardImgDiv>
                      <FeatureCardImg src={CommentsIcon} />
                    </FeatureCardImgDiv>
                    <FeatureCardInfoDiv>
                      <FeatureCardTitle>
                        Comments of real people
                      </FeatureCardTitle>
                      <FeatureCardText>
                        In our user reviews section, you can rate and review
                        various whiskies, engaging in discussions with others
                        and sharing your perspectives.
                      </FeatureCardText>
                    </FeatureCardInfoDiv>
                  </FeatureCard>
                  <FeatureCard>
                    <FeatureCardImgDiv>
                      <FeatureCardImg src={EventsIcon} />
                    </FeatureCardImgDiv>
                    <FeatureCardInfoDiv>
                      <FeatureCardTitle>Events for community</FeatureCardTitle>
                      <FeatureCardText>
                        Our regular tasting events provide unique tasting
                        experiences and opportunities to connect with whisky
                        experts and fellow enthusiasts.
                      </FeatureCardText>
                    </FeatureCardInfoDiv>
                  </FeatureCard>
                  <FeatureCard>
                    <FeatureCardImgDiv>
                      <FeatureCardImg src={WheelIcon} />
                    </FeatureCardImgDiv>
                    <FeatureCardInfoDiv>
                      <FeatureCardTitle>Personal FlavourWheel</FeatureCardTitle>
                      <FeatureCardText>
                        Share comments to build your own flavourwheel graph.
                      </FeatureCardText>
                    </FeatureCardInfoDiv>
                  </FeatureCard>
                </FeatureCards>
              </FeatureCardsDiv>
            </FeaturesDiv>
          </FeaturesSection>
          <ArticleSection elevation={12} sx={{ bgcolor: "#ddd4c5" }}>
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
                    <ArticleCardImgDiv
                      $backgroundImageUrl={data.picture}
                    ></ArticleCardImgDiv>
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
            <ProductSectionTitle>New Whiskies</ProductSectionTitle>
            <ProductCardsWrapper>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {productsData.map((data, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard>
                      <ProductCardImgDiv>
                        <ProductCardImg src={data.picture} />
                      </ProductCardImgDiv>
                      <ProductCardInfoDiv>
                        <ProductCardTitle>{data.title}</ProductCardTitle>
                        <ProductCardText>{data.introText}</ProductCardText>
                        <PageLink
                          className="productLink"
                          to={`/product/${data.productUid}`}
                        >
                          詳細資訊
                        </PageLink>
                      </ProductCardInfoDiv>
                    </ProductCard>
                  </SwiperSlide>
                ))}
              </Swiper>
            </ProductCardsWrapper>
          </ProductSection>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
};
export default Home;
