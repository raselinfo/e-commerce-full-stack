import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import StoreProvider from "./Store/Store";
import { HelmetProvider } from "react-helmet-async";
const preventInspect = () => {
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
  document.onkeydown = function (e) {
    if (e.keyCode === 123) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === "I".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === "C".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === "J".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) {
      return false;
    }
  };
};
// Call prevent inspect function
process.env.NODE_ENV.trim("") !== "development" && preventInspect();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <HelmetProvider>
      <StoreProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </HelmetProvider>
  // </React.StrictMode>
);
