import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.tsx";
import Articles from "./pages/Articles/Articles.tsx";
import Layout from "./pages/Layout/Layout.tsx";
import Comments from "./pages/Comments/Comments.tsx";
import Login from "./pages/Login/Login.tsx";
import Member from "./pages/Member/Member.tsx";
import Product from "./pages/Product/Product.tsx";
import Events from "./pages/Events/Events.tsx"

const App = () => {
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
