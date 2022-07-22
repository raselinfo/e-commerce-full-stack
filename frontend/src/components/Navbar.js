import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-700 font-bold">
      <h1 className="text-3xl text-white p-5">
        <Link to="/">RaselFashion.</Link>
      </h1>
    </div>
  );
};

export default Navbar;
