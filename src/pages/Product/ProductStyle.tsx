import styled from "styled-components";
import { Link } from "react-router-dom";

interface TogglerProps {
  isActive: boolean;
}
export const PageLink = styled(Link)`
  font-size: 16px;
  text-decoration: underline;
  color: #5e3106;
  margin: 30px 35px;
  border-radius: 12px;
  font-weight: 500;
`;
export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 230px);
`;
export const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  background-color: #e7e7e7;
  display: flex;

  justify-content: center;
  box-shadow: 3px 3px 5px 2px rgba(89, 89, 89, 0.3);
  border-radius: 12px;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`;

export const InfoDiv = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
export const IntroSection = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`;

export const ProductImgDiv = styled.div`
  width: 50%;
  @media screen and (max-width: 1279px) {
    display: flex;
    height: 300px;
    justify-content: center;
    margin: 0 auto;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
export const ProductImg = styled.img`
  height: 100%;
  width: 100%;
  @media screen and (max-width: 1279px) {
    width: 50%;
  }
  @media screen and (max-width: 659px) {
    width: 70%;
  }
`;
export const ProductIntroTitleDiv = styled.div`
  width: 50%;
  color: #5e3106;
  padding: 20px;
  @media screen and (max-width: 1279px) {
    text-align: center;
    width: 100%;
  }
`;
export const ProductIntroText = styled.p`
  line-height: 1.5;
  margin: 30px 0 50px;
`;
export const InfoDivDivider = styled.div`
  height: 3px;
  width: 90%;
  margin: 30px auto 0;
  background-color: #c4c4c4;
  border-radius: 4px;
`;
export const DivDivider = styled.div`
  height: 700px;
  width: 3px;
  margin: auto 0;
  background-color: #c4c4c4;
  border-radius: 4px;
`;
export const ProductIntroTitle = styled.h2`
  font-weight: 500;
  font-size: 28px;
`;
export const ProductInfoText = styled.p`
  color: #5e3106;
  margin: 0 0 0 8px;
`;
export const ProductInfoDiv = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 1279px) {
    justify-content: center;
  }
`;
export const ProductInfoTitle = styled.p`
  font-weight: 600;
  font-style: italic;
  color: #5e3106;
`;
export const PostCommentBtn = styled(Link)`
  background-color: #a5550b;
  padding: 12px;
  text-decoration: none;
  text-align: center;
  border-radius: 12px;
  color: #f7f7f7;
  box-shadow: 2px 3px 6px 1px rgb(202, 91, 0, 0.55);
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #be722c;
  }
  &:active {
    box-shadow: 1px 1px 7px 0px rgb(212, 107, 20, 0.75);
  }
  &.noCommentsBtn {
    display: inline-block;
    text-align: center;
  }
  @media screen and (max-width: 1279px) {
    margin: 0 auto;
    width: 50%;
  }
`;
export const BtnText = styled.p`
  margin: 0 0 0 8px;
`;
export const WheelDiv = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 659px) {
    display: none;
  }
`;
export const NoWheelHintMsg = styled.p`
  display: none;
  @media screen and (max-width: 659px) {
    display: inline-block;
    text-align: center;
    font-size: 12px;
  }
`;
export const InfoSection = styled.div`
  width: 100%;
  padding: 20px 35px;
`;

export const TabTogglerDiv = styled.div`
  text-align: center;
  margin: 30px 0 50px;
`;
export const Toggler = styled.span<TogglerProps>`
  background-color: transparent;
  cursor: pointer;
  margin: 0 20px;
  font-weight: 600;
  font-size: 28px;
  color: #5e3106;

  &.toggler-info {
    border-bottom: ${({ isActive }) =>
      isActive ? "none" : "3px solid #5e3106"};
  }
  &.toggler-comments {
    border-bottom: ${({ isActive }) =>
      isActive ? "3px solid #5e3106" : "none"};
  }
`;
export const ProductInfoSection = styled.section`
  background-color: #e9e7e0;
  padding: 20px;
  border-radius: 0 8px 8px 8px;
  text-align: center;
`;
export const ProductInfosDiv = styled.div`
  text-align: center;
  gap: 30px;
`;

export const NoCommentsHint = styled.h3`
  margin: 100px 0 50px;
  text-align: center;
`;
export const CommentCard = styled.div`
  border-radius: 8px;
`;
export const CommentDiv = styled.div`
  flex: 1;
  padding: 0 50px;
  width: 45%;
  @media screen and (max-width: 1279px) {
    width: 100%;
  }
`;
export const CommentTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  font-size: 20px;
  color: #5e3106;
`;
export const CommentTitle = styled.h3`
  margin: 0 8px 4px 0;
`;
export const CommentWrapper = styled.div`
  border: 1px solid #b6b6b6;
  margin: 0 0 20px;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 3px 3px 5px 2px rgba(89, 89, 89, 0.3);
  @media screen and (max-width: 659px) {
    text-align: center;
  }
`;
export const UserNameText = styled.h3`
  text-align: center;
`;
export const CommentCardDivider = styled.div`
  height: 2px;
  background-color: #b6b3b0;
  width: 70%;
  margin: 0 auto 20px;
`;
export const CommentTextDiv = styled.div`
  word-break: break-all;
`;
