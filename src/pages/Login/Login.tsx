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
  SignUpText,
  SignupLinkDiv,
} from "./LoginStyle";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toaster } from "evergreen-ui";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleGuestLogin = () => {
    const email = "guest@guest.com";
    const password = "112233aA";

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toaster.success(`Welcome back! ${user.displayName}`);
        navigate("/member");
      })
      .catch((err) => {
        console.error("Error when signing in : ", err.message);
        toaster.danger("Error signing in with guest account!");
      });
  };

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
        toaster.success(`Welcome back! ${user.displayName}`);
        navigate("/member");
      })
      .catch((err) => {
        console.error("Error when signing in : ", err.message);
        toaster.danger("Accout is not existed or password wrong!");
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
            <SignUpText>Not a member? </SignUpText>
            <SignupLinkDiv>
              <PageLink to="/signup" className="signupLink">
                <SignupBtn>Sign up now</SignupBtn>
              </PageLink>
            </SignupLinkDiv>
            <LoginButton type="submit">Login</LoginButton>
          </LoginForm>
          <LoginButton
            className="testAccount"
            onClick={() => handleGuestLogin()}
          >
            Login with Guest Account
          </LoginButton>
        </LoginSection>
      </Wrapper>
    </Container>
  );
};

export default Login;
