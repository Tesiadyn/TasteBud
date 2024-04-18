import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.tsx";
import Articles from "./pages/Articles/Articles.tsx";
import Layout from "./pages/Layout/Layout.tsx";
import Comments from "./pages/Comments/Comments.tsx";
import Login from "./pages/Login/Login.tsx";
import Member from "./pages/Member/Member.tsx";
import Product from "./pages/Product/Product.tsx";
import Events from "./pages/Events/Events.tsx";
import Post from "./pages/Post/Post.tsx";

const App = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const autoLogin = async () => {
  //     /* ----------------------------- firebase config ---------------------------- */
  //     const firebaseConfig = {
  //       apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  //       authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  //       projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  //       storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  //       messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  //       appId: import.meta.env.VITE_FIREBASE_APP_ID,
  //     };
  //     /* ------------------------------ firebase init ----------------------------- */
  //     const app = initializeApp(firebaseConfig);
  //     const auth = getAuth(app);

  //     const email = "test@test.com";
  //     const password = "112233";
  //     try {
  //       const userIdent = await signInWithEmailAndPassword(
  //         auth,
  //         email,
  //         password
  //       );
  //       const user = userIdent.user;
  //       console.log(user);

  //       const userUid = user.uid;
  //       console.log(userUid);

  //       console.log("logged in as :", user.email);
  //       setIsLoading(false);
  //     } catch (err: any) {
  //       console.error("Login failed:", err.message);
  //       setIsLoading(false);
  //     }
  //   };
  //   autoLogin();
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="articles" element={<Articles />} />
            <Route path="comments" element={<Comments />} />
            <Route path="events" element={<Events />} />
            <Route path="login" element={<Login />} />
            <Route path="member" element={<Member />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="product/:id/post" element={<Post />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
