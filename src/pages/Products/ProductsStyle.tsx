import styled from "styled-components";
import { Link } from "react-router-dom";

export interface CardImgDivProps {
  $bgImage: string;
}
export const Container = styled.div`
  width: 1440px;
`;
export const Wrapper = styled.div`
  width: 100%;
  margin: 50px auto;
  display: flex;
  justify-content: center;
`;
export const Card = styled(Link)`
  width: 350px;
  height: 400px;
  background-color: #48a4d4;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #f7f7f7;
`;
export const CardImgDiv = styled.div<CardImgDivProps>`
  width: 100%;
  height: 50%;
  background-position: center;
  background-image: url(${(props) => props.$bgImage});
`;
// export const CardImg = styled.img`
//     width: 100%;
//     height: 100%;
// `
export const CardInfoDiv = styled.div``;
export const CardInfos = styled.div``;
export const CardInfoTitle = styled.h2``;
