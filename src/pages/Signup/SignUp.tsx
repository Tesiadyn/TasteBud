import {
  Container,
  Wrapper,
  SignUpButton,
  Input,
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
import { useNavigate } from "react-router-dom";

// TODO :  flavourWheel options

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user);
  } else {
    console.log("User logged out");
  }
});

const SignUp = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit running...");

    const register = async (email: string, password: string) => {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
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
        const userNameInput = e.currentTarget.elements.namedItem(
          "userName"
        ) as HTMLInputElement | null;
        const userName = userNameInput?.value;
        if (email && password) {
          const userObj = await register(email, password);
          if (userObj && userObj.user) {
            const userUid = userObj?.user.uid;
            console.log(userUid);
            writingMemberDoc(email, userUid, userName!);
            navigate("/login");
          }
        }
      } catch (err: any) {
        console.error("Error when getting email & password : ", err.message);
      }
    };

    const writingMemberDoc = async (email: string, userUid: string, userName: string) => {
      const memberData = {
        attendedEvents: [],
        commentsUid: "",
        email: email,
        userName: userName,
        userUid: userUid,
        organizedEvents: [],
        wheelData: `{
          "name": "flare",
          "children": [
            {
              "name": "Aroma",
              "children": [
                {
                  "name": "Sap",
                  "children": [
                    { "name": "FreshWood", "value": 0 },
                    { "name": "WetWood", "value": 0 }
                  ]
                },
                {
                  "name": "Cedar",
                  "children": [
                    { "name": "Sawdust", "value": 0 },
                    { "name": "LinkDistance", "value": 0 },
                    { "name": "Carton", "value": 0 },
                    { "name": "SharpenedPencil", "value": 0 }
                  ]
                },
                {
                  "name": "Oak",
                  "children": [
                    { "name": "Resin", "value": 0 },
                    { "name": "Varnish", "value": 0 }
                  ]
                }
              ]
            },
            {
              "name": "Woody Extract",
              "children": [
                {
                  "name": "Nut",
                  "children": [
                    { "name": "Coconut", "value": 0 },
                    { "name": "Mulberry", "value": 0 },
                    { "name": "Almond", "value": 0 },
                    { "name": "Walnut", "value": 0 }
                  ]
                },
                {
                  "name": "Vanilla",
                  "children": [
                    { "name": "Ice cream", "value": 0 },
                    { "name": "Toffee", "value": 0 },
                    { "name": "Chocolate", "value": 0 },
                    { "name": "Cola", "value": 0 }
                  ]
                },
                {
                  "name": "Spices",
                  "children": [
                    { "name": "Clove", "value": 0 },
                    { "name": "Cinnamon", "value": 0 },
                    { "name": "Ginger", "value": 0 },
                    { "name": "Star anise", "value": 0 }
                  ]
                },
                {
                  "name": "Caramel",
                  "children": [
                    { "name": "Molasses", "value": 0 },
                    { "name": "Coffee", "value": 0 },
                    { "name": "Toast", "value": 0 },
                    { "name": "Licorice", "value": 0 }
                  ]
                },
                {
                  "name": "Moisten Wine",
                  "children": [
                    { "name": "Sherry", "value": 0 },
                    { "name": "Bourbon", "value": 0 },
                    { "name": "Port", "value": 0 },
                    { "name": "Rum", "value": 0 },
                    { "name": "Blendy", "value": 0 }
                  ]
                }
              ]
            },
            {
              "name": "Rotten Wood",
              "children": [
                {
                  "name": "Storage",
                  "children": [
                    { "name": "Paraffin", "value": 0 },
                    { "name": "Naphtha", "value": 0 },
                    { "name": "Mothballs", "value": 0 }
                  ]
                },
                {
                  "name": "Mold",
                  "children": [
                    { "name": "Mouldy", "value": 0 },
                    { "name": "Dirt", "value": 0 },
                    { "name": "Mildew", "value": 0 },
                    { "name": "Rotten Cork", "value": 0 }
                  ]
                },
                {
                  "name": "Vinegar",
                  "children": [
                    { "name": "Acetic acid", "value": 0 },
                    { "name": "Sour", "value": 0 }
                  ]
                }
              ]
            },
            {
              "name": "Sweet",
              "children": [
                { "name": "Butter Sweet", "value": 0 },
                { "name": "Fruit Sweet", "value": 0 },
                { "name": "Flower Sweet", "value": 0 },
                { "name": "Wooden Sweet", "value": 0 }
              ]
            },
            {
              "name": "Stale",
              "children": [
                {
                  "name": "Carton",
                  "children": [
                    { "name": "Paper", "value": 0 },
                    { "name": "Filter Paper", "value": 0 }
                  ]
                },
                {
                  "name": "Metal",
                  "children": [
                    { "name": "Ink", "value": 0 },
                    { "name": "Tin", "value": 0 },
                    { "name": "Wet Iron", "value": 0 },
                    { "name": "Rust", "value": 0 }
                  ]
                }
              ]
            },
            {
              "name": "Sulfur",
              "children": [
                {
                  "name": "Dead Water",
                  "children": [
                    { "name": "Sewage pipe", "value": 0 },
                    { "name": "Drain pipe", "value": 0 },
                    { "name": "Sewage", "value": 0 },
                    { "name": "Rotten Vegetables", "value": 0 }
                  ]
                }
              ]
            },
            {
              "name": "Fragrance",
              "children": [
                {
                  "name": "Sour",
                  "children": [
                    { "name": "Bad sour", "value": 0 },
                    { "name": "Baby spitted Milk", "value": 0 },
                    { "name": "Oxidized grease", "value": 0 }
                  ]
                },
                {
                  "name": "Sweat",
                  "children": [
                    { "name": "Old socks", "value": 0 },
                    { "name": "Musk", "value": 0 },
                    { "name": "Pig Farm", "value": 0 }
                  ]
                }
              ]
            },
            {
              "name": "Greasy",
              "children": [
                {
                  "name": "Soap",
                  "children": [
                    { "name": "Wax", "value": 0 },
                    { "name": "Unscented Soap", "value": 0 },
                    { "name": "Detergent", "value": 0 },
                    { "name": "Washing machine inner tank", "value": 0 }
                  ]
                },
                {
                  "name": "Butter",
                  "children": [
                    { "name": "Butter", "value": 0 },
                    { "name": "Toffee", "value": 0 },
                    { "name": "Butterscotch", "value": 0 }
                  ]
                },
                {
                  "name": "Lubricating oil",
                  "children": [{ "name": "Mineral oil" }]
                },
                {
                  "name": "Greasy smell",
                  "children": [
                    { "name": "Fat", "value": 0 },
                    { "name": "Fish oil", "value": 0 },
                    { "name": "Grease", "value": 0 },
                    { "name": "Ramie oil", "value": 0 }
                  ]
                }
              ]
            },
            {
              "name": "Basic flavour",
              "children": [
                {
                  "name": "Bitterness",
                  "value": 1231
                },
                { "name": "Salty", "value": 0 },
                { "name": "Sour taste", "value": 0 },
                { "name": "Sweet", "value": 0 }
              ]
            },
            {
              "name": "Taste",
              "children": [
                {
                  "name": "Astringency",
                  "children": [
                    { "name": "Dry", "value": 0 },
                    { "name": "Hairy feeling", "value": 0 },
                    { "name": "Powdery feeling", "value": 0 }
                  ]
                },
                {
                  "name": "Enveloping feeling",
                  "children": [
                    { "name": "Oil", "value": 0 },
                    { "name": "Milk fat", "value": 0 }
                  ]
                },
                {
                  "name": "Warmth",
                  "children": [
                    { "name": "Alcoholic", "value": 0 },
                    { "name": "Burning", "value": 0 },
                    { "name": "Hot", "value": 0 }
                  ]
                }
              ]
            },
            {
              "name": "Smell",
              "children": [
                {
                  "name": "Pungent feeling",
                  "children": [
                    { "name": "Ehanol", "value": 0 },
                    { "name": "Pepper", "value": 0 },
                    { "name": "Tingling", "value": 0 }
                  ]
                },
                {
                  "name": "Dry",
                  "value": 651
                }
              ]
            },
            {
              "name": "Peat",
              "children": [
                {
                  "name": "Burnt smell",
                  "children": [
                    { "name": "Asphalt", "value": 0 },
                    { "name": "Coal Ash", "value": 0 },
                    { "name": "Ash", "value": 0 }
                  ]
                },
                {
                  "name": "Potion smell",
                  "children": [
                    { "name": "TCP Potion", "value": 0 },
                    { "name": "Disinfectant Water", "value": 0 },
                    { "name": "Ointment", "value": 0 },
                    { "name": "Hospital", "value": 0 }
                  ]
                },
                {
                  "name": "Smokey",
                  "children": [
                    { "name": "Wood", "value": 0 },
                    { "name": "Smokey Fish", "value": 0 },
                    { "name": "Becon", "value": 0 }
                  ]
                }
              ]
            },
            {
              "name": "Cereals",
              "children": [
                {
                  "name": "Cereal",
                  "children": [
                    { "name": "Biscuit", "value": 0 },
                    { "name": "Chaff", "value": 0 },
                    { "name": "Bran", "value": 0 },
                    { "name": "Leather", "value": 0 },
                    { "name": "Tobacco", "value": 0 }
                  ]
                },
                {
                  "name": "Malt",
                  "children": [
                    { "name": "Malt extract", "value": 0 },
                    { "name": "Malted barley", "value": 0 }
                  ]
                },
                {
                  "name": "Cereal porridge",
                  "children": [
                    { "name": "Oatmeal", "value": 0 },
                    { "name": "Dross", "value": 0 },
                    { "name": "Boiled corn", "value": 0 }
                  ]
                }
              ]
            },
            {
              "name": "Grass",
              "children": [
                {
                  "name": "Grass",
                  "children": [
                    { "name": "Leaves", "value": 0 },
                    { "name": "Freshly cutted grass", "value": 0 },
                    { "name": "Flower stem", "value": 0 },
                    { "name": "Green Apple", "value": 0 },
                    { "name": "Greem Banana", "value": 0 }
                  ]
                },
                {
                  "name": "Hay",
                  "children": [
                    { "name": "Haystack", "value": 0 },
                    { "name": "Straw", "value": 0 },
                    { "name": "Tea", "value": 0 }
                  ]
                }
              ]
            }
          ]
        }
        `,
      };
      await setDoc(doc(firestore, "Members", userUid), memberData);
    };

    gettingEmailAndPassword();
  };
  return (
    <Container>
      <Wrapper>
        <SignUpSection>
          <SignUpSectionTitle>Sign Up</SignUpSectionTitle>
          <SignUpForm onSubmit={handleSubmit}>
            <InputDiv>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" type="email" name="email" />
            </InputDiv>
            <InputDiv>
              <InputLabel htmlFor="userName">UserName</InputLabel>
              <Input id="userName" type="text" name="userName" />
            </InputDiv>
            <InputDiv>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" type="password" name="password" />
            </InputDiv>
            <SignUpButton type="submit">註冊</SignUpButton>
          </SignUpForm>
        </SignUpSection>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
