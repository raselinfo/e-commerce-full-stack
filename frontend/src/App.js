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
import AuthProtect from "./Protected Route/AuthProtect";
import Google from "./components/Google";
const rootPath = window.location.pathname;
function App() {
  return (
    <>
      <ToastContainer theme="colored" />
      <Layout />
      {rootPath === "/" && <Google isOpenLoginButton={false} />}
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
        <Route
          path="/signin"
          element={
            <AuthProtect>
              <SignIn />
            </AuthProtect>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthProtect>
              <SignUp />
            </AuthProtect>
          }
        />
        <Route
          path="/Verify/:email/:token"
          element={
            <AuthProtect>
              <VerifyMail />
            </AuthProtect>
          }
        />
      </Routes>
    </>
  );
}

export default App;
