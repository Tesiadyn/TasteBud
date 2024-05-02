import styled from "styled-components";
import { Link } from "react-router-dom";
import { TextInput, Button } from "evergreen-ui";
import Banner from "../../assets/login-banner.jpg";
export const InputField = styled(TextInput)`
  width: 80%;
`;
export const LoginButton = styled(Button)`
  width: 100%;
  height: 30px;
  text-align: center;
  margin-top: 40px;
`;
export const SignupBtn = styled.div`
  text-align: center;
  color: #5e3106;
`;
export const PageLink = styled(Link)`
  text-decoration: none;
`;
export const Container = styled.div`
  width: 100%;
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
export const LoginSectionTitle = styled.h2``;
export const InputDiv = styled.div`
  display: flex;
  margin: 20px 0;
`;
export const LoginForm = styled.form`
  width: 30%;
`;
export const InputLabel = styled.label`
  width: 20%;
`;
