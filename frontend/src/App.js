import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./components/Layout";
import ProductDetails from "./views/ProductDetails";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import SignIn from "./views/SignIn";
import Protected from "./Protected Route/Protected";
import SignUp from "./views/SignUp";
import VerifyMail from "./views/VerifyMail";
function App() {
  return (
    <>
      <ToastContainer theme="colored" />
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<h1>Hello Admin</h1>} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <Protected>
              <Checkout />
            </Protected>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Verify/:token/:email" element={<VerifyMail />} />
      </Routes>
    </>
  );
}

export default App;
