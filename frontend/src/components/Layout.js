import React from "react";
import Navbar from "./Navbar";
const Layout = () => {
  const pathname = window.location.pathname;
  if (!(pathname.includes("/admin") || pathname.includes("/dashboard"))) {
    return <Navbar />
  }
  return <div>Admin Navbar</div>
};

export default Layout;
