import styled from "styled-components";
import { TextInput } from "evergreen-ui";
import SignupBanner from "../../assets/signup-banner.jpg";
export const InputField = styled(TextInput)`
  width: 70%;
`;
export const SignUpButton = styled.button`
  width: 100%;
  height: 30px;
  text-align: center;
  background-color: #a5550b;
  border: none;
  color: #f7f7f7;
  cursor: pointer;
  box-shadow: 2px 3px 6px 1px rgb(202, 91, 0, 0.55);
  transition: all 0.2s;
  border-radius: 12px;
  margin: 35px 0;
  &:hover {
    background-color: #be722c;
  }
  &:active {
    box-shadow: 1px 1px 7px 0px rgb(212, 107, 20, 0.75);
  }
`;
export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 270px);
`;
export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
export const SignUpSection = styled.section`
  width: 100%;
  margin: 0 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
  border-radius: 0 0 12px 12px;
  padding-bottom: 20px;
`;
export const SignUpSectionTitle = styled.h2`
  color: #5e3106;
`;
export const InputDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  position: relative;
  align-items: center;
`;
export const SignUpForm = styled.form`
  width: 30%;
`;

export const InputLabel = styled.label`
  width: 30%;
  color: #5e3106;
`;
export const HintMessage = styled.p`
  width: 100%;
  font-size: 12px;
  color: #b84b4b;
  position: absolute;
  left: 105%;
`;
export const BannerDiv = styled.div`
  background-image: url(${SignupBanner});
  height: 350px;
  border-radius: 12px 12px 0 0;
`;
