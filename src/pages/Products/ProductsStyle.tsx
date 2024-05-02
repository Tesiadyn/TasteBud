import styled from "styled-components";
import { Link } from "react-router-dom";

export interface CardImgDivProps {
  $bgImage: string;
}
export const Container = styled.div`
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
`
export const Cards = styled.section`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;
export const Card = styled(Link)`
  width: 20%;
  height: 250px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #a1803e;
  border-radius: 16px;
  /* border: 1px solid #bfbfbf; */
  box-shadow: 3px 3px 3px 2px rgba(89, 89, 89, 0.5);
`;
export const CardImgDiv = styled.div<CardImgDivProps>`
  width: 100%;
  height: 50%;
  background-position: center;
  background-image: url(${(props) => props.$bgImage});
  border-radius: 16px;
`;
// export const CardImg = styled.img`
//     width: 100%;
//     height: 100%;
// `
export const CardInfoDiv = styled.div``;
export const CardInfos = styled.div`
  padding: 10px;
`;
export const CardInfoTitle = styled.h3`
`;
