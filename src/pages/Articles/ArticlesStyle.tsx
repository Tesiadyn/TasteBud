import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: #7c7e80;
`;

export const Wrapper = styled.div`
  width: 1440px;
  margin: 0 auto;
`;
export const PageTitle = styled.h1`
  margin: 0;
  text-align: center;
`;
export const PageSubtitle = styled.h3`
  font-size: 18px;
  text-align: center;
`;

export const TagsSection = styled.section`
  width: 50%;
  padding: 50px;
  margin: 0 auto;
`;
export const TagsDiv = styled.div`
  display: flex;
`;
export const Tags = styled.ul`
  display: flex;
  list-style: none;
`;
export const Tag = styled.li`
  width: 50px;
  text-align: center;
  background-color: #592b2b;
  margin-left: 20px;
`;
export const TagText = styled.span`
  color: #f7f7f7;
`;
export const ArticlesSection = styled.section`
  margin: 50px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const ArticleCard = styled.div`
  background-color: #718c8a;
  height: 200px;
  width: 50%;
  display: flex;
  margin: 25px 0;
`;
export const ArticleImgDiv = styled.div`
  height: 100%;
`;
export const ArticleImg = styled.img`
  height: 100%;
`;
export const ArticleInfoDiv = styled.div``;
export const ArticleInfoTags = styled.ul`
  display: flex;
`;
export const ArticleInfoTag = styled.li``;
export const ArticleInfoTitle = styled.h2``;
export const ArticleInfoText = styled.p``;
