import styled from "styled-components";
import { Paper } from "@mui/material";
import NewEventBanner from "../../assets/newEvent-Banner.png";

export const Container = styled.div`
  width: 100%;
  background-color: #e7e7e7;
  min-height: calc(100vh - 230px);
  padding: 20px 0;
`;
export const Wrapper = styled(Paper)`
  width: 1280px;
  margin: 0 auto;
  background-color: #e9e7e0;
  display: flex;
  @media screen and (max-width: 1279px) {
    width: 90%;
  }
`;
export const BannerSection = styled.section`
  width: 30%;
  background-image: url(${NewEventBanner});
`;
export const FormSection = styled.section`
  padding: 30px;
  width: 70%;
`;
export const FormTitle = styled.h2`
  font-size: 48px;
  color: #5e3106;
`;
export const FormDivier = styled.div`
  height: 1px;
  background-color: #5e3106;
`;
export const InputForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const InputLabel = styled.label`
  color: #5e3106;
  font-size: 16px;
  &.inputFormLabel {
    margin: 40px 0 8px;
  }
`;

export const InputField = styled.input`
  border: none;
  border-bottom: 1px solid #c29c56;
  &::placeholder {
    color: #5e3106;
  }
  &.checkbox {
    appearance: none;
    width: 15px;
    height: 15px;
    border: 2px solid #5e3106;
    border-radius: 4px;
    outline: none;
    margin: 0 auto;
    cursor: pointer;
    transition: all 0.3s;
    &:checked {
      background-color: #5e3106;
    }
  }
`;
export const SubmitButton = styled.button`
  background-color: #5e3106;
  color: #f7f7f7;
  border-radius: 8px;
  padding: 8px 0;
  margin: 30px 0;
  border: none;
  cursor: pointer;
  box-shadow: 3px 3px 5px 0 rgba(93, 93, 93, 0.54);
  &:active {
    box-shadow: 2px 2px 3px 0 rgba(93, 93, 93, 0.7);
  }
`;
export const TagsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
`;
export const Tag = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 8px;
  flex: 1;
`;
export const HintText = styled.p`
  color: #5e3106;
  text-align: center;
`;
