import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 150px;
  background-color: #552100;
  color: #e3e3e3;
`;
export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LogoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
`;
export const LogoImg = styled.img`
  width: 50%;
  height: 70%;
`;

export const SubTitle = styled.p`
  margin: 4px 0 0;
`;
export const InfoDiv = styled.ul`
  padding: 0;
`;
export const InfoDivTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 4px;
  margin: 0 0 12px;
`;
export const InfoDivItem = styled.li`
  list-style: none;
  margin: 0 0 8px;
  font-size: 14px;
`;
export const SocialDiv = styled.div`
  display: flex;
  gap: 24px;
`;
export const InfoDivWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
`;
