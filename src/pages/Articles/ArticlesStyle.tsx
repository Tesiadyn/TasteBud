import styled from "styled-components";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import Banner from "../../assets/articles-Banner.jpg";
export const PageLink = styled(Link)`
  text-decoration: none;
`;
export const Container = styled(Paper)`
  width: 100%;
  background-color: #cecece;
`;

export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
  display: flex;
  padding: 30px;
`;
export const BannerSection = styled.section`
  height: 300px;
  width: 100%;
  background-image: url(${Banner});
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const PageTitle = styled.h1`
  margin: 0;
  text-align: center;
  color: #f7f7f7;
`;
export const PageSubtitle = styled.h3`
  font-size: 18px;
  text-align: center;
  color: #f7f7f7;
`;

export const TagsSection = styled.section`
  margin: 0 auto;
`;
export const TagSectionTitle = styled.h3`
  color: #8c4303;
`;
export const Tags = styled.div`
  list-style: none;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
export const Tag = styled.button`
  padding: 8px;
  background-color: transparent;
  border: 1px solid #5e3106;
  color: #5e3106;
  margin: 10px 0;
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #914b0b;
    border: 1px solid #c5c5c5;
    color: #c5c5c5;
  }
`;
export const SelectedTag = styled(Tag)`
  background-color: #a1803e;
  color: #f7f7f7;
`;

export const ArticlesSection = styled.section`
  width: 70%;
`;
export const ArticleCard = styled.div`
  background-color: #e9e7e0;
  height: 200px;
  display: flex;
  margin: 25px auto;
  box-shadow: 3px 3px 5px 2px rgba(89, 89, 89, 0.3);
  border-radius: 8px;
  transition: all 0.3s;
  &:hover {
    box-shadow: 1px 1px 2px 1px rgba(89, 89, 89, 0.7);
    background-color: #c4c2bc;
  }
`;
export const ArticleImgDiv = styled.div`
  height: 100%;
  width: 30%;
`;
export const ArticleImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 8px 0 0 8px;
`;
export const ArticleInfoDiv = styled.div`
  width: 60%;
  flex: 1;
`;
export const ArticleInfoTags = styled.ul`
  display: flex;
  padding-inline-start: 0px;
  padding: 0 30px;
  color: #a5550b;
`;
export const ArticleInfoTag = styled.li`
  list-style: none;
  margin-right: 20px;
  padding: 6px;
  border: 1px solid #a5550b;
  border-radius: 4px;
`;
export const ArticleInfoTitle = styled.h2`
  padding: 0 30px;
  color: #5e3106;
`;
export const ArticleInfoText = styled.p``;
