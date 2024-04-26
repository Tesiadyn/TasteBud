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
} from "./LoginStyle";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// TODO: redirect after login & notification for user

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.namedItem("email") as HTMLInputElement | null;
    const passwordInput = e.currentTarget.elements.namedItem("password") as HTMLInputElement | null;
    const email = emailInput?.value || '';
    const password = passwordInput?.value || '';
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user); 
        navigate("/member");
      })
      .catch((err) => {
        console.error("Error when signing in : ", err.message)
      });
  };

  return (
    <Container>
      <Wrapper>
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
            <LoginButton type="submit">登入</LoginButton>
          </LoginForm>
        </LoginSection>
        <PageLink to="/signup">
          <div>註冊</div>
        </PageLink>
      </Wrapper>
    </Container>
  );
};

export default Login;
