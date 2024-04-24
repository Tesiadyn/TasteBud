import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageLink = styled(Link)`
  text-decoration: none;
  width: 80%;
`;
export const Container = styled.div`
  width: 100%;
  background-color: #7c7e80;
`;

export const Wrapper = styled.div`
  width: 1280px;
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
export const Tags = styled.div`
  display: flex;
  list-style: none;
`;
export const Tag = styled.button`
  width: 50px;
  text-align: center;
  background-color: #592b2b;
  margin-left: 20px;
  color: #f7f7f7;
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
  width: 80%;
  display: flex;
  margin: 25px auto;
`;
export const ArticleImgDiv = styled.div`
  height: 100%;
  width: 40%;
`;
export const ArticleImg = styled.img`
  height: 100%;
  width: 100%;
`;
export const ArticleInfoDiv = styled.div`
  width: 60%;
`;
export const ArticleInfoTags = styled.ul`
  display: flex;
`;
export const ArticleInfoTag = styled.li`
  list-style: none;
`;
export const ArticleInfoTitle = styled.h2``;
export const ArticleInfoText = styled.p``;
