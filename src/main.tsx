import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/normalize.css";
import App from "./App.tsx";
import Events from "./components/Events.tsx";
import Comments from "./components/Comments.tsx";
import Member from "./components/Member.tsx";
import Articles from "./components/Articles.tsx";
import Product from "./components/Product.tsx";
import Login from "./components/Login.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="events" element={<Events />} />
        <Route path="comments" element={<Comments />} />
        <Route path="member" element={<Member />} />
        <Route path="articles" element={<Articles />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
