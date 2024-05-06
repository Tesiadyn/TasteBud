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
  color: #5e3106;
`
export const EventTitle = styled.h1`
  margin-bottom: 50px;
`;
export const EventSubDiv = styled.div`
  margin-bottom: 30px;
`
export const EventSubTitle = styled.h3`
  margin: 0 0 6px;
`;
export const EventText = styled.p`
  margin: 0;
`;
export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
`
export const EventActButton = styled.button`
  border: none;
  background-color: #b26218;
  padding: 12px;
  border-radius: 8px;
  color: #f7f7f7;
  box-shadow: 5px 5px 15px 0px rgba(156,131,85,0.75);
  transition: all .2s;
  margin-right: 30px;
  &:hover{
    background-color: #a27a55;
  }
  &:active{
    box-shadow: 3px 3px 10px 0px rgba(156, 131, 85, 0.871);
    padding: 10px;
  }
` 