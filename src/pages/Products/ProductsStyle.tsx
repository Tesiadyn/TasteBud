import styled from "styled-components";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import Banner from "../../assets/comments-Banner.jpg";

export interface CardImgDivProps {
  $bgImage: string;
}

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
export const CardWrapper = styled.div`
  width: 25%;
`;

export const Container = styled(Paper)`
  width: 100%;
  background-color: #f7f7f7;
`;
export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
  padding: 50px 0;
`;
export const SectionTitle = styled.h2`
  color: #a1803e;
  text-align: center;
  font-size: 28px;
  margin: 50px 0;
`;
export const Cards = styled.section`
  margin: 0 auto;
  display: flex;
  /* gap: 30px; */
  flex-wrap: wrap;
`;
export const Card = styled(Link)`
  width: 100%;
  height: 300px;
  /* background-color: #b66d6d; */
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #a1803e;
  border-radius: 16px;
  transition: all 0.3s;
  /* border: 1px solid #bfbfbf; */
  /* box-shadow: 3px 3px 3px 2px rgba(89, 89, 89, 0.5);
  &:hover{
    box-shadow: 2px 2px 2px 1px rgba(89, 89, 89, 0.3);
  } */
`;
export const CardImgDiv = styled.div`
  width: 250px;
  height: 250px;
  margin: 0 auto;
  background-position: center;
  border-radius: 16px;
  position: relative;
`;
export const CardImgBg = styled.div`
  width: 70%;
  height: 70%;
  position: absolute;
  /* background-color: #dfe2df; */
  background-color: #e6cc85;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
`;
export const CardImg = styled.img`
  max-width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const CardInfoDiv = styled.div`
  /* background-color: burlywood; */
`;
export const CardInfos = styled.div`
  padding: 10px;
`;
export const CardInfoTitle = styled.h3`
  text-align: center;
`;
