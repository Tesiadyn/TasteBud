import {
  Container,
  Wrapper,
  LoginSection,
  LoginSectionTitle,
  InputDiv,
  LoginForm,
  InputLabel,
  LoginButton,
  PageLink,
  InputField,
  BannerDiv,
  SignupBtn,
} from "./LoginStyle";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toaster } from "evergreen-ui";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.namedItem(
      "email"
    ) as HTMLInputElement | null;
    const passwordInput = e.currentTarget.elements.namedItem(
      "password"
    ) as HTMLInputElement | null;
    const email = emailInput?.value || "";
    const password = passwordInput?.value || "";

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toaster.success(`Welcome back! ${user.displayName}`);
        navigate("/member");
      })
      .catch((err) => {
        console.error("Error when signing in : ", err.message);
        toaster.danger("帳號或密碼錯誤");
      });
  };

  return (
    <Container>
      <Wrapper>
        <BannerDiv />
        <LoginSection>
          <LoginSectionTitle>Login</LoginSectionTitle>
          <LoginForm onSubmit={handleSubmit}>
            <InputDiv>
              <InputLabel htmlFor="email">Email</InputLabel>
              <InputField type="email" id="email" name="email" />
            </InputDiv>
            <InputDiv>
              <InputLabel htmlFor="password">Password</InputLabel>
              <InputField type="password" id="password" name="password" />
            </InputDiv>
            <PageLink to="/signup">
              <SignupBtn>還沒有帳號嗎？ 馬上註冊</SignupBtn>
            </PageLink>
            <LoginButton type="submit">登入</LoginButton>
          </LoginForm>
        </LoginSection>
      </Wrapper>
    </Container>
  );
};

export default Login;
