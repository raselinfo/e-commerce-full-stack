import "./App.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./components/Layout";
import ProductDetails from "./views/ProductDetails";
function App() {
  return (
    <>
      <ToastContainer theme="colored" />
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<h1>Hello Admin</h1>} />
        <Route path="/product/:slug" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
