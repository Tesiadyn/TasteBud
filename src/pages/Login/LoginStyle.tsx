import styled from "styled-components";
import { Link } from "react-router-dom"
import { TextInput, Button } from "evergreen-ui";

export const InputField = styled(TextInput)`
  width: 80%;
`;
export const LoginButton = styled(Button)`
  width: 100%;
  height: 30px;
  text-align: center;
`;
export const PageLink = styled(Link)`
  
`;
export const Container = styled.div`
  width: 100%;
`;
export const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
export const LoginSection = styled.section`
  width: 100%;
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
