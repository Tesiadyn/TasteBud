import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home.tsx';
import Checkout from "./pages/Checkout";
import Layout from "./pages/Layout/Layout.tsx";
const App = () => {
  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Layout />}>
         <Route index element={<Home />} />
         <Route path="checkout" element={<Checkout />} />
        </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
