import styled from "styled-components";
import { Link } from "react-router-dom";
import Banner from "@images/comments-Banner.jpg";

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
  font-size: 44px;
`;
export const PageSubtitle = styled.h3`
  font-size: 18px;
  text-align: center;
  color: #f7f7f7;
`;
export const CardWrapper = styled.div`
  width: 25%;
  @media screen and (max-width: 1279px) {
    width: 30%;
  }
  @media screen and (max-width: 991px) {
    width: 50%;
  }
  @media screen and (max-width: 575px) {
    width: 90%;
  }
`;

export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 230px);
  background-color: #f7f7f7;
`;
export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
  padding: 50px 0;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
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
  flex-wrap: wrap;
  justify-content: center;
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
  background-color: #e6cc85;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  transition: background-color 0.3s;
`;
export const Card = styled(Link)`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #a1803e;
  border-radius: 16px;
  transition: all 0.3s;
  &:hover {
    ${CardImgBg} {
      background-color: #cca86e;
    }
  }
`;
export const CardImg = styled.img`
  max-width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const CardInfoDiv = styled.div``;
export const CardInfos = styled.div``;
export const CardInfoTitle = styled.h3`
  text-align: center;
  font-size: 24px;
  margin: 20px 0 32px;
`;
