import styled from "styled-components";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";

interface backgroundImgUrlProps {
  $backgroundImageUrl: string;
}

export const PageLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  &.articleCard {
    display: inline-block;
    width: 40%;
  }
  &.productLink {
    margin: auto 0;
    color: #8c4303;
    font-size: 24px;
    font-weight: 600;
    text-decoration: underline;
  }
`;

export const Container = styled.div`
  width: 100%;
`;
export const Wrapper = styled.div`
  margin: 0 auto;
`;
export const PromoBannerSection = styled.section`
  width: 100%;
  height: calc(100vh - 120px);
  position: relative;
  display: flex;
`;
export const PromoBannerInfoDiv = styled.div`
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
export const PromoBannerTitle = styled.h1`
  font-size: 64px;
  color: #f7f7f7;
  width: 100%;
  margin: 0;
  font-weight: 700;
  letter-spacing: 16px;
`;
export const PromoBannerSubTitle = styled.h3`
  color: #f7f7f7;
  font-size: 14px;
  font-weight: 400;
`;
export const PromoBannerText = styled.p`
  color: #eaeaea;
  margin: 0;
  font-size: 10px;
`;
export const PromoBannerIconDiv = styled.div`
  width: 20px;
  height: 20px;
  margin: 50px auto 10px;
`;
export const PromoBannerIconImg = styled.img`
  width: 100%;
  height: 100%;
`;
export const PromoBannerImgDiv = styled.div`
  width: 50%;
  text-align: center;
`;
export const PromoBannerImg = styled.img`
  height: 100%;
`;
// export const FeaturesSection = styled(Paper)`
//   /* width: 100%; */
//   padding: 50px;
// `; elevation={12} sx={{ bgcolor: "#e9e2db" }
export const FeaturesDiv = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
export const FeaturesTitle = styled.h2`
  font-size: 52px;
  margin: 0;
  color: #5e3106;
`;
export const FeatureSubTitle = styled.h2`
  font-size: 48px;
  margin: 0;
  color: #5e3106;
`;
export const FeatureCards = styled.div`
  width: 80%;
  margin-left: 5%;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;
export const FeatureCardsDiv = styled.div`
  display: flex;
  margin-top: 50px;
`;
export const FeatureCard = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  /* border: 1px solid #d6a668; */
  background-color: #e2d0b7;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;
export const FeatureCardImgDiv = styled.div`
  height: 50px;
  width: 50px;
  position: relative;
  background-color: #d6a668;
  border-radius: 12px;
`;
export const FeatureBannerDiv = styled.div`
  width: 30%;
  height: 100%;
`;
export const FeatureBanner = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;
export const FeatureCardImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
`;
export const FeatureCardInfoDiv = styled.div``;
export const FeatureCardTitle = styled.h3`
  font-size: 20px;
  margin: 10px 0;
  color: #8c4303;
`;
export const FeatureCardText = styled.p`
  margin: 0;
  line-height: 1.5;
  color: #9c602c;
`;
export const ArticleSection = styled(Paper)`
  width: 100%;
  padding: 50px 0;
  text-align: center;
`;
export const ArticleSectionTitle = styled.h1`
  font-size: 32px;
  margin: 0 0 50px;
  color: #8c4303;
  text-decoration: underline;
`;
// export const SectionTitleDivider = styled.div`
//   height: 1px;
//   width: 80%;
//   background-color: #070707;
//   margin: 20px auto;
// `;
export const ArticleCards = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin: 0 auto;
`;
// export const ArticleCard = styled.div`
//   background-color: #e2d0b7;
//   display: flex;
//   flex-direction: column;
//   box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
//     0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
//   border-radius: 12px;
//   &.hover {
//     opacity: 0.7;
//   }
// `;
export const ArticleCardImgDiv = styled.div<backgroundImgUrlProps>`
  background-image: url(${(props) => props.$backgroundImageUrl});
  background-size: cover;
  background-position: center;
  height: 150px;
  border-radius: 12px 12px 0 0;
`;
export const ArticleCardImg = styled.img`
  height: 100%;
  width: 100%;
`;
export const ArticleCardInfoDiv = styled.div`
  width: 100%;
  padding: 20px 0;
`;
export const ArticleCardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #8c4303;
  font-weight: 500;
`;
export const ArticleCardText = styled.p``;
export const ArticlesLink = styled.button`
  border: 1px solid #a5550b;
  margin: 50px auto;
  padding: 8px 12px;
  color: #a5550b;
  border-radius: 12px;
  transition: all 0.2s;
`;
export const ProductSection = styled.section`
  width: 80%;
  margin: 50px auto;
`;
export const ProductSectionTitle = styled.h1`
  text-align: center;
  color: #6c491e;
`;

export const ProductCardsWrapper = styled.div`
  display: flex;
  gap: 30px;
`;
export const ProductCard = styled.div`
  width: 70%;
  height: 550px;
  background-color: #e9e7e0;
  display: flex;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 2px 1px -1px rgba(0, 0, 0, 0.2);
`;
export const ProductCardImgDiv = styled.div`
  height: 100%;
  width: 45%;
`;
export const ProductCardImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 16px 0 0 16px;
`;
export const ProductCardInfoDiv = styled.div`
  width: 45%;
  margin-left: 50px;
`;

export const ProductCardTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #5e3106;
  margin: 80px 0;
`;

export const ProductCardText = styled.p`
  width: 70%;
  color: #5e3106;
  line-height: 1.3;
  height: 40%;
`;
export const ProductCardAuthorDiv = styled.div`
  display: flex;
`;
export const ProductCardAuthorImgDiv = styled.div``;
export const ProductCardAuthorImg = styled.img``;
export const ProductCardAuthorId = styled.p``;
