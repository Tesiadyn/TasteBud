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
export const PrevPageBtn = styled(Button)`
  /* color: #f7f7f7;
  padding: 8px;
  width: 100px;
  text-align: center;
  border-radius: 8px;
  background-color: #5e3106;
  box-shadow: 3px 3px 5px 2px rgba(89, 89, 89, 0.3); */
`;
export const BtnDiv = styled.div`
  width: 100%;
  text-align: center;
`;
export const BackToTopBtn = styled(Button)`
  margin: 0 auto;
`;
