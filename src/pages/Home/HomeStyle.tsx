import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "evergreen-ui";

export const PageLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  &.articleCard {
    display: inline-block;
    width: 40%;
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
export const FeaturesSection = styled.section`
  color: #a1803e;
  background-color: #e9e7e0;
  height: 500px;
  padding-top: 50px;
`;
export const FeaturesDiv = styled.div`
  height: 100%;
  text-align: center;
`;
export const FeaturesTitle = styled.h2`
  font-size: 40px;
  margin: 0;
`;
export const FeatureSubTitle = styled.p``;
export const FeatureCards = styled.div`
  display: flex;
  margin-top: 75px;
`;
export const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
export const FeatureCardImgDiv = styled.div`
  height: 50%;
  position: relative;
`;
export const FeatureCardImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;
export const FeatureCardInfoDiv = styled.div`
  height: 50%;
`;
export const FeatureCardTitle = styled.h3`
  font-size: 24px;
`;
export const FeatureCardText = styled.p`
  margin: 0 auto;
  width: 75%;
  color: #937e54;
`;

export const ArticleSection = styled.section`
  width: 100%;
  height: 400px;
  background-color: #f7f7f7;
  padding: 50px 0;
  text-align: center;
`;
export const ArticleSectionTitle = styled.h1`
  font-size: 32px;
  margin: 0 0 50px;
  color: #a1803e;
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
export const ArticleCard = styled.div`
  height: 100px;
  background-color: #e9e7e0;
  display: flex;
  box-shadow: 3px 3px 3px 2px rgba(89, 89, 89, 0.5);
  border-radius: 6px;
  text-align: left;
`;
export const ArticleCardImgDiv = styled.div`
  width: 30%;
`;
export const ArticleCardImg = styled.img`
  height: 100%;
  width: 100%;
`;
export const ArticleCardInfoDiv = styled.div`
  width: 70%;
  padding: 16px 16px 0;
`;
export const ArticleCardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #141623;
  font-weight: 500;
`;
export const ArticleCardText = styled.p``;
export const ArticlesLink = styled(Button)`
  border: 1px solid #a1803e;
  margin: 50px auto;
  color: #a1803e;
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
`;
export const ProductCardImgDiv = styled.div`
  height: 100%;
  width: 50%;
`;
export const ProductCardImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 16px 0 0 16px;
`;
export const ProductCardInfoDiv = styled.div`
  width: 50%;
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
`;
export const ProductCardAuthorDiv = styled.div`
  display: flex;
`;
export const ProductCardAuthorImgDiv = styled.div``;
export const ProductCardAuthorImg = styled.img``;
export const ProductCardAuthorId = styled.p``;
