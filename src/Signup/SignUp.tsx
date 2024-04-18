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

const SignUp = () => {
  return (
    <Container>
      <Wrapper>
        <SignUpSection>
          <SignUpSectionTitle>Sign Up</SignUpSectionTitle>
          <SignUpForm>
            <InputDiv>
              <InputLabel>Email</InputLabel>
              <EmailInput />
            </InputDiv>
            <InputDiv>
              <InputLabel>Password</InputLabel>
              <PasswordInput />
            </InputDiv>
            <SignUpButton>註冊</SignUpButton>
          </SignUpForm>
        </SignUpSection>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
