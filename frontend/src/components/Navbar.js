import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-700 font-bold flex">
      <h1 className="text-3xl text-white p-5">
        <Link to="/">RaselFashion.</Link>
      </h1>
      <span className="p-5 text-2xl text-white">
        Cart 
        <span className="bg-red-700 inline-block w-10 h-10 text-center rounded-full leading-10 ml-2">{0}</span>
      </span>
    </div>
  );
};

export default Navbar;
