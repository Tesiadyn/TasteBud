import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { backgroundImgUrlProps } from "@/interface";

export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 230px);
`;
export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 32px;
  color: #0c0c0f;
`;
export const ArticleSection = styled.section`
  background-color: #e9e7e0;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 3px 3px 5px 2px rgba(89, 89, 89, 0.3);
  margin-bottom: 200px;
`;
export const ArticleText = styled.p`
  line-height: 2;
  color: #0c0c0f;
`;
export const PageLink = styled(Link)`
  text-decoration: none;
`;
export const CoverSection = styled.section<backgroundImgUrlProps>`
  width: 100%;
  height: 300px;
  background-image: url(${(props) => props.$backgroundImageUrl});
  background-position: center;
  background-size: cover;
  border-radius: 12px;
  margin: 30px 0;
  box-shadow: 3px 3px 5px 2px rgba(89, 89, 89, 0.3);
`;
export const BtnText = styled.p`
  margin: 0 0 0 4px;
`;
export const PrevPageBtn = styled.button`
  background-color: #a5550b;
  color: #f7f7f7;
  box-shadow: 2px 3px 6px 1px rgb(202, 91, 0, 0.55);
  padding: 8px 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #be722c;
  }
  &:active {
    box-shadow: 1px 1px 7px 0px rgb(212, 107, 20, 0.75);
  }
  @media screen and (max-width: 1279px) {
    margin: 0 auto;
  }
`;
export const BtnDiv = styled.div`
  width: 100%;
  text-align: center;
`;
export const BackToTopBtn = styled(Button)`
  margin: 0 auto;
`;
export const Tags = styled.div`
  display: flex;
  justify-content: center;
`;
export const Tag = styled.div`
  margin-left: 12px;
  font-size: 16px;
  border: 1px solid #a5550b;
  padding: 8px;
  color: #a5550b;
  border-radius: 8px;
`;
