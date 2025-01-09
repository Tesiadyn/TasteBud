import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: #cecece;
  min-height: calc(100vh - 230px);
`;
export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
  display: flex;
  padding: 30px;
  @media screen and (max-width: 1279px) {
    width: 100%;
    flex-direction: column;
  }
`;
export const BannerSection = styled.section<{ bgImage?: string }>`
  height: 300px;
  width: 100%;
  background-image: ${({ bgImage }) => `url(${bgImage || null})`};
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
