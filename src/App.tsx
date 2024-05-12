import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home/Home.tsx";
import Articles from "./pages/Articles/Articles.tsx";
import Layout from "./pages/Layout/Layout.tsx";
import Products from "./pages/Products/Products.tsx";
import Login from "./pages/Login/Login.tsx";
import Member from "./pages/Member/Member.tsx";
import Product from "./pages/Product/Product.tsx";
import Events from "./pages/Events/Events.tsx";
import Post from "./pages/Post/Post.tsx";
import SignUp from "./pages/Signup/SignUp.tsx";
import NewEvent from "./pages/NewEvent/NewEvent.tsx";
import Event from "./pages/Event/Event.tsx";
import Article from "./pages/Article/Article.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="articles" element={<Articles />} />
      <Route path="products" element={<Products />} />
      <Route path="events" element={<Events />} />
      <Route path="login" element={<Login />} />
      <Route path="member" element={<Member />} />
      <Route path="product/:id" element={<Product />} />
      <Route path="product/:id/post" element={<Post />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="newEvent" element={<NewEvent />} />
      <Route path="event/:id" element={<Event />} />
      <Route path="article/:id" element={<Article />} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
