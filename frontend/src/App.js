import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./components/Layout";
import ProductDetails from "./views/ProductDetails";
import Cart from "./views/Cart";
import SignIn from "./views/SignIn";
import Protected from "./Protected Route/Protected";
import SignUp from "./views/SignUp";
import VerifyMail from "./views/VerifyMail";
import AuthProtect from "./Protected Route/AuthProtect";
import Google from "./components/Google";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import Shipping from "./views/Shipping";

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
          path="/shipping"
          element={
            <Protected>
              <Shipping />
            </Protected>
          }
        />
        <Route
          path="/order"
          element={
            <Protected>
              <Shipping />
            </Protected>
          }
        />
        <Route
          path="/payment"
          element={
            <Protected>
              <Shipping />
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
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/reset/password/:token" element={<ResetPassword />} />
        <Route path="*" element={<h1>Not Found 404 </h1>} />
      </Routes>
    </>
  );
}

export default App;
