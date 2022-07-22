import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./components/Layout";
function App() {
  return (
    <>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<h1>Hello Admin</h1>} />

      </Routes>
    </>
  );
}

export default App;
