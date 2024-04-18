import {
  Container,
  Wrapper,
  LoginSection,
  LoginSectionTitle,
  InputDiv,
  LoginForm,
  EmailInput,
  InputLabel,
  PasswordInput,
  LoginButton,
} from "./LoginStyle";
const Login = () => {
  return (
    <Container>
      <Wrapper>
        <LoginSection>
          <LoginSectionTitle>Login</LoginSectionTitle>
          <LoginForm>
            <InputDiv>
              <InputLabel>Email</InputLabel>
              <EmailInput />
            </InputDiv>
            <InputDiv>
              <InputLabel>Password</InputLabel>
              <PasswordInput />
            </InputDiv>
            <LoginButton>註冊</LoginButton>
          </LoginForm>
        </LoginSection>
      </Wrapper>
    </Container>
  );
};

export default Login;
