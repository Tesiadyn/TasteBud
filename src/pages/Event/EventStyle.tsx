import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;
export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
export const EventSection = styled.section`
  width: 100%;
  display: flex;
  height: 600px;
  background-color: #e9e7e0;
  border-radius: 4px;
  margin: 50px 0;
`;
export const EventImgDiv = styled.div`
  width: 50%;
`;
export const EventImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;
export const EventInfoDiv = styled.div`
  padding: 20px;
`
export const EventTitle = styled.h1``;
export const EventText = styled.p`
  &.location {
  }
  &.maxParticipants {
  }
`;
export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
`