import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageLink = styled(Link)`
  text-decoration: none;
  &.article {
    width: 40%;
    margin: 30px 0;
  }
`;

export const Container = styled.div`
  width: 100%;
`;
export const Wrapper = styled.div`
  margin: 0 auto;
  width: 1280px;
`;
export const PromoBanner = styled.div`
  width: 100%;
  height: 300px;
  background-color: #e3c579;
  position: relative;
`;
export const PromoBannerTitle = styled.h1`
  font-size: 24px;
  color: #f7f7f7;
  width: 250px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 250px;
  transform: translate(-20%, -50%);
`;
export const PromoBannerBtn = styled.div`
  width: 100px;
  height: 30px;
  font-size: 18px;
  line-height: 27px;
  cursor: pointer;
  position: absolute;
  top: 60%;
  left: 200px;
  color: #f7f7f7;
  background-color: #9e6363;
  text-align: center;
  border-radius: 8px;
`;
export const ArticleSection = styled.section`
  width: 100%;
  height: 400px;
  background-color: #f7f7f7;
`;
export const ArticleSectionTitle = styled.h1`
  font-size: 32px;
  text-align: center;
`;
export const SectionTitleDivider = styled.div`
  height: 1px;
  width: 80%;
  background-color: #070707;
  margin: 20px auto;
`;
export const ArticleCardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export const ArticleCard = styled.div`
  width: 100%;
  height: 100px;
  background-color: #b9b9b9;
  display: flex;
`;
export const ArticleCardImgDiv = styled.div`
  width: 30%;
`;
export const ArticleCardImg = styled.img`
  height: 100px;
  width: 100%;
`;
export const ArticleCardInfoDiv = styled.div`
  width: 70%;
`;
export const ArticleCardTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #000;
`;
export const ArticleCardText = styled.p``;
export const ProductSection = styled.section`
  width: 80%;
  margin: 0 auto;
`;
export const ProductSectionTitle = styled.h1`
  text-align: center;
`;

export const ProductCardsWrapper = styled.div`
  height: 100%;
  display: flex;
  gap: 30px;
`;
export const ProductCard = styled.div`
  width: 100%;
  background-color: #37757e;
`;
export const ProductCardImgDiv = styled.div`
  width: 100%;
  height: 50%;
`;
export const ProductCardImg = styled.img`
  width: 100%;
  height: 100%;
`;
export const ProductCardInfoDiv = styled.div``;
export const ProductCardTitle = styled.h1`
  color: #000;
`;
export const ProductCardText = styled.p``;
export const ProductCardAuthorDiv = styled.div`
  display: flex;
`;
export const ProductCardAuthorImgDiv = styled.div``;
export const ProductCardAuthorImg = styled.img``;
export const ProductCardAuthorId = styled.p``;
