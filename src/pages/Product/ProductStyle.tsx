import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 1440px;
  margin: 0 auto;
  background-color: transparent;
`;
export const Wrapper = styled.div`
  width: 75%;
  margin: 0 auto;
`;
export const IntroSection = styled.section`
  height: 50%;
  width: 100%;
  display: flex;
`;

export const ProductImgDiv = styled.div`
  width: 20%;
  border-radius: 8px;
`;
export const ProductImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 8px 8px 0 0;
`;
export const ProductIntroTitleDiv = styled.div`
  padding: 25px;
  color: #f7f7f7;
`;
export const TabTogglerDiv = styled.div`
  text-align: center;
  margin: 30px 0 50px;
`;
export const Toggler = styled.span`
  background-color: transparent;
  cursor: pointer;
  margin: 0 20px;
  font-weight: 600;
  font-size: 28px;
  color: #5e3106;
  border-bottom: 5px solid #5e3106;
`;
export const ProductInfoSection = styled.section`
  background-color: #e9e7e0;
  height: 500px;
  padding: 20px;
  border-radius: 0 8px 8px 8px;
`;
export const ProductInfosDiv = styled.div`
  text-align: center;
  gap: 30px;
`;
export const ProductInfoTitle = styled.h2`
  margin: 25px 0;
  font-weight: 400;
  font-size: 28px;
`;
export const ProductInfoText = styled.p`
  margin: 50px 0;
`;

export const PostCommentBtn = styled(Link)`
  width: 80px;
  height: 20px;
  background-color: #a5550b;
  padding: 10px;
  text-decoration: none;
  text-align: center;
  border-radius: 8px;
  color: #f7f7f7;
  box-shadow: 3px 3px 5px 2px rgba(89, 89, 89, 0.3);
  margin-left: auto;
`;
