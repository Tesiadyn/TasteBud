import styled from "styled-components";
import { Link } from "react-router-dom";
import Banner from "../../assets/login-banner.jpg";
export const InputField = styled.input`
  width: 80%;
  margin-left: 12px;
  border: none;
  border-bottom: 1px solid #5e3106;
  background-color: #f7f7f7;
`;
export const LoginButton = styled.button`
  width: 100%;
  height: 30px;
  text-align: center;
  margin-top: 40px;
  background-color: #a5550b;
  border: none;
  color: #f7f7f7;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 2px 3px 6px 1px rgb(202, 91, 0, 0.55);
  transition: all 0.2s;
  &:hover {
    background-color: #be722c;
  }
  &:active {
    box-shadow: 1px 1px 7px 0px rgb(212, 107, 20, 0.75);
  }
`;
export const SignupBtn = styled.div`
  text-align: center;
  color: #5e3106;
  text-decoration: underline;
  font-weight: 500;
`;
export const PageLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
`;
export const SignupLinkDiv = styled.div`
  width: 100%;
  text-align: center;
`;
export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 230px);
`;
export const Wrapper = styled.div`
  width: 1280px;
  background-color: #f7f7f7;
  border-radius: 12px;
  margin: 0 auto;
`;
export const BannerDiv = styled.div`
  height: 300px;
  background-image: url(${Banner});
  background-position: center;
  border-radius: 12px 12px 0 0;
`;
// export const BannerImg = styled.img`
//   width: 100%;
//   height: 100%;
// `
export const LoginSection = styled.section`
  width: 100%;
  height: 450px;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const LoginSectionTitle = styled.h2`
  color: #5e3106;
`;
export const InputDiv = styled.div`
  display: flex;
  margin: 40px 0;
`;
export const LoginForm = styled.form`
  width: 30%;
`;
export const InputLabel = styled.label`
  width: 20%;
  color: #5e3106;
`;
export const SignUpText = styled.p`
  text-align: center;
  margin: 0 0 8px;
  font-size: 14px;
  color: #5e3106;
`;
