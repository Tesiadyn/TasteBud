import styled from "styled-components";

interface backgroundImgUrlProps {
  $backgroundImageUrl: string;
}
export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 270px);
`;
export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
export const EventSection = styled.section`
  width: 100%;
  display: flex;
  background-color: #e9e7e0;
  border-radius: 12px;
  margin: 50px 0;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;
export const EventImgDiv = styled.div<backgroundImgUrlProps>`
  width: 30%;
  border-radius: 12px 0 0 12px;
  background-image: url(${(props) => props.$backgroundImageUrl});
`;

export const EventInfoDiv = styled.div`
  width: 70%;
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
export const EditFormInputDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
`
export const EditFormLabel = styled.label`
    margin-bottom: 8px;
`
export const EditFormInput = styled.input`
  
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
  cursor: pointer;
  &:hover{
    background-color: #a27a55;
  }
  &:active{
    box-shadow: 3px 3px 10px 0px rgba(156, 131, 85, 0.871);
    padding: 10px;
  }
  &.editFormBtn{
    margin: 30px 0 20px
  }
` 