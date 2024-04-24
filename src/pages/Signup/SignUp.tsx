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
import { auth, firestore } from "../../utilities/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

// TODO :  flavourWheel options

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("handleSubmit running...");

  const register = async (email: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user created", user);
      return user;
    } catch (err: any) {
      console.error("Error creating user: ", err.message);
    }
  };

  const gettingEmailAndPassword = async () => {
    try {
      const emailInput = e.currentTarget.elements.namedItem(
        "email"
      ) as HTMLInputElement | null;
      const email = emailInput?.value;
      const passwordInput = e.currentTarget.elements.namedItem(
        "password"
      ) as HTMLInputElement | null;
      const password = passwordInput?.value;
      if (email && password) {
        const userObj = await register(email, password);
        if (userObj && userObj.user) {
          const userUid = userObj?.user.uid;
          console.log(userUid);
          writingMemberDoc(email, userUid);
        }
      }
    } catch (err: any) {
      console.error("Error when getting email & password : ", err.message);
    }
  };

  const writingMemberDoc = async (email: string, userUid: string) => {
    const memberData = {
      attendedEvents: [],
      commentsUid: "",
      email: email,
      organizedEvents: [],
      wheelData: `{
        "id": 0,
        "name": "flare",
        "children": [{
            "id": 1,
            "name": "Aroma",
            "children": [{
                "id": 2,
                "name": "sap",
                "children": [{
                    "id": 6,
                    "name": "FreshWood",
                    "value": 0
                }, {
                    "id": 7,
                    "name": "WetWood",
                    "value": 0
                }]
            }, {
                "id": 3,
                "name": "Cedar",
                "children": [{
                    "id": 8,
                    "name": "Sawdust",
                    "value": 0
                }, {
                    "id": 9,
                    "name": "Carton",
                    "value": 0
                }, {
                    "id": 10,
                    "name": "SharpenedPencil",
                    "value": 0
                }]
            }, {
                "id": 4,
                "name": "Oak",
                "children": [{
                    "id": 11,
                    "name": "Resin",
                    "value": 0
                }, {
                    "id": 12,
                    "name": "Varnish",
                    "value": 0
                }]
            }, {
                "id": 5,
                "name": "Pine",
                "children": [{
                    "id": 13,
                    "name": "Turpentine",
                    "value": 0
                }, {
                    "id": 14,
                    "name": "Retsina",
                    "value": 0
                }]
            }]
        }]
    }`
    };
    await setDoc(doc(firestore, "Members", userUid), memberData);
  };

  gettingEmailAndPassword();
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user);
  } else {
    console.log("User logged out");
  }
});

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
