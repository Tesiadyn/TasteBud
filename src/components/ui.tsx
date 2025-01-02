import styled from "styled-components";
export const BannerSection = styled.section<{ bgImage?: string }>`
  height: 300px;
  width: 100%;
  background-image: ${({ bgImage }) => `url(${bgImage || null})`};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
