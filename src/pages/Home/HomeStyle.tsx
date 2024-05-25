import styled from "styled-components";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { backgroundImgUrlProps } from "@/interface";

export const PageLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  &.articleCard {
    display: inline-block;
    width: 40%;
  }
  &.productLink {
    color: #f7f7f7;
    font-size: 16px;
    font-weight: 400;
    background-color: #a5550b;
    padding: 8px;
    margin-top: 20px;
    border-radius: 8px;
    transition: all 0.2s;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    &:hover {
      background-color: #be722c;
    }
    &:active {
      box-shadow: 1px 1px 7px 0px rgb(212, 107, 20, 0.75);
    }
    @media screen and (max-width: 767px) {
      width: 100px;
    }
  }
`;

export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 230px);
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
export const PromoBannerTitle = styled.h1`
  font-size: 68px;
  color: #f7f7f7;
  width: 100%;
  margin: 0;
  font-weight: 700;
  letter-spacing: 16px;
  @media screen and (max-width: 767px) {
    font-size: 48px;
  }
`;
export const PromoBannerSubTitle = styled.h3`
  color: #f7f7f7;
  font-size: 20px;
  font-weight: 400;
  margin: 12px 0;
`;
export const PromoBannerText = styled.p`
  color: #eaeaea;
  margin: 0;
  font-size: 16px;
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
export const FeaturesDiv = styled.div`
  width: 1280px;
  margin: 0 auto;
  @media screen and (max-width: 1279px) {
    width: 100%;
    text-align: center;
  }
`;
export const FeaturesTitle = styled.h2`
  font-size: 52px;
  margin: 0;
  color: #5e3106;
  margin-left: 30px;
  @media screen and (max-width: 767px) {
    font-size: 40px;
  }
`;
export const FeatureSubTitle = styled.h2`
  font-size: 48px;
  margin: 0 0 0 30px;
  color: #5e3106;
  @media screen and (max-width: 767px) {
    font-size: 36px;
  }
`;
export const FeatureCards = styled.div`
  width: 70%;
  margin-left: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  @media screen and (max-width: 1279px) {
    width: 100%;
    margin-left: 0;
    justify-content: center;
  }
`;
export const FeatureCardsDiv = styled.div`
  display: flex;
  margin-top: 50px;
`;
export const FeatureCard = styled.div`
  width: calc(50% - 30px);
  display: flex;
  flex-direction: column;
  background-color: #e2d0b7;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  @media screen and (max-width: 1279px) {
    align-items: center;
  }
`;
export const FeatureCardImgDiv = styled.div`
  height: 50px;
  width: 50px;
  position: relative;
  background-color: #d6a668;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FeatureBannerDiv = styled.div`
  width: 30%;
  margin-left: 30px;
  height: 100%;
  @media screen and (max-width: 1279px) {
    display: none;
  }
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
  font-size: 24px;
  margin: 12px 0;
  color: #8c4303;
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;
export const FeatureCardText = styled.p`
  margin: 0;
  line-height: 1.5;
  color: #9c602c;
  font-size: 16px;
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
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
`;
export const ArticleCards = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin: 0 auto;
  @media screen and (max-width: 1279px) {
    width: auto;
  }
`;
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
  height: 70px;
`;
export const ArticleCardTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #8c4303;
  font-weight: 500;
  @media screen and (max-width: 767px) {
    font-size: 16px;
  }
`;
export const ArticleCardText = styled.p``;
export const ArticlesLink = styled.button`
  border: 1px solid #a5550b;
  margin: 50px auto;
  padding: 8px 12px;
  color: #a5550b;
  border-radius: 12px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #8c4303;
    color: #f7f7f7;
  }
`;
export const ProductSection = styled.section`
  width: 80%;
  margin: 50px auto;
`;
export const ProductSectionTitle = styled.h1`
  text-align: center;
  color: #6c491e;
  margin-bottom: 30px;
`;

export const ProductCardsWrapper = styled.div`
  display: flex;
  gap: 30px;
`;
export const ProductCard = styled.div`
  width: 80%;
  height: 550px;
  background-color: #e9e7e0;
  display: flex;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 2px 1px -1px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 1279px) {
    height: 350px;
  }
`;
export const ProductCardImgDiv = styled.div`
  height: 100%;
  width: 45%;
  @media screen and (max-width: 1279px) {
    display: none;
  }
`;
export const ProductCardImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 16px 0 0 16px;
`;
export const ProductCardInfoDiv = styled.div`
  width: 45%;
  @media screen and (max-width: 1279px) {
    margin: 0;
    width: 100%;
    text-align: center;
  }
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const ProductCardTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #894a0f;
  margin: 80px 0;
  @media screen and (max-width: 1279px) {
    margin: 40px 0;
    font-size: 28px;
  }
  @media screen and (max-width: 767px) {
    font-size: 24px;
  }
  @media screen and (max-width: 575px) {
    margin: 30px 0;
  }
`;

export const ProductCardText = styled.p`
  width: 90%;
  color: #5e3106;
  line-height: 1.5;
  font-size: 18px;
  height: 40%;
  @media screen and (max-width: 1279px) {
    margin: 0 auto;
    font-size: 16px;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;
export const ProductCardAuthorDiv = styled.div`
  display: flex;
`;
export const ProductCardAuthorImgDiv = styled.div``;
export const ProductCardAuthorImg = styled.img``;
export const ProductCardAuthorId = styled.p``;
