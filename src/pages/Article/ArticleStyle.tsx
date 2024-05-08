import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const Container = styled.div`
  width: 100%;
`;
export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
export const SectionTitle = styled.h2`
  text-align: center;
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
`;
export const PageLink = styled(Link)`
  text-decoration: none;
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
  &:hover {
    background-color: #be722c;
  }
  &:active {
    box-shadow: 1px 1px 7px 0px rgb(212, 107, 20, 0.75);
  }
`;
export const BtnDiv = styled.div`
  width: 100%;
  text-align: center;
`;
export const BackToTopBtn = styled(Button)`
  margin: 0 auto;
`;
