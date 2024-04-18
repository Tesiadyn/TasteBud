import {
  Container,
  Wrapper,
  SignUpButton,
  EmailInput,
  PasswordInput,
  SignUpForm,
  SignUpSection,
  SignUpSectionTitle,
  InputLabel,
  InputDiv,
} from "./SignUpStyle";
import { auth } from "../../utilities/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const register = async (email: string, password: string) => {
  console.log("registering");
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log("user created", user);
  } catch (err: any) {
    console.error("Error creating user: ", err.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user);
  } else {
    console.log("User logged out");
  }
});

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("handleSubmit running...");
  const emailInput = event.currentTarget.elements.namedItem(
    "email"
  ) as HTMLInputElement | null;
  const email = emailInput?.value;
  console.log(email);

  const passwordInput = event.currentTarget.elements.namedItem(
    "password"
  ) as HTMLInputElement | null;
  const password = passwordInput?.value;
  console.log(password);

  if (email && password) {
    register(email, password);
  }
};

const SignUp = () => {
  return (
    <Container>
      <Wrapper>
        <SignUpSection>
          <SignUpSectionTitle>Sign Up</SignUpSectionTitle>
          <SignUpForm onSubmit={handleSubmit}>
            <InputDiv>
              <InputLabel htmlFor="email">Email</InputLabel>
              <EmailInput id="email" type="email" name="email" />
            </InputDiv>
            <InputDiv>
              <InputLabel htmlFor="password">Password</InputLabel>
              <PasswordInput id="password" type="password" name="password" />
            </InputDiv>
            <SignUpButton type="submit">註冊</SignUpButton>
          </SignUpForm>
        </SignUpSection>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
