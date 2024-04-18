import styled from "styled-components";

export const Container = styled.div`
  width: 1440px;
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
`;
export const SectionTitleDivider = styled.div`
  height: 1px;
  width: 80%;
  background-color: #070707;
  margin: 50px auto;
`;
export const ArticleCardsWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
`;
export const ArticleCard = styled.div`
  width: 40%;
  height: 100px;
  margin: 30px auto 0;
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
export const ArticleCardInfoDiv = styled.div``;
export const ArticleCardTitle = styled.h1`
  margin: 0;
`;
export const ArticleCardText = styled.p``;
export const CommentsSection = styled.section`
  width: 80%;
  margin: 0 auto;
`;
export const CommentsSectionTitle = styled.h1`
  text-align: center;
`;

export const CommentsCardsWrapper = styled.div`
  height: 100%;
  display: flex;
  gap: 30px;
`;
export const CommentsCard = styled.div`
  width: 50%;
  height: 100%;
  background-color: #37757e;
`;
export const CommentsCardImgDiv = styled.div`
  width: 100%;
  height: 50%;
`;
export const CommentsCardImg = styled.img`
  width: 100%;
  height: 100%;
`;
export const CommentsCardInfoDiv = styled.div``;
export const CommentsCardTitle = styled.h1``;
export const CommentsCardText = styled.p``;
export const CommentsCardAuthorDiv = styled.div`
  display: flex;
`;
export const CommentsCardAuthorImgDiv = styled.div``;
export const CommentsCardAuthorImg = styled.img``;
export const CommentsCardAuthorId = styled.p``;
