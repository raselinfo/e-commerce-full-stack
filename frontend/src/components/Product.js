import React from "react";
import { Link } from "react-router-dom";
const Product = ({ product: { image, name, price } }) => {
  return (
    <div className="border-2 p-5 border-gray-400">
      <img className="w-full" src={image} alt={name} />
      <Link to="/" className="underline text-blue-500">
        {name}
      </Link>
      <span className="font-bold md:text-2xl block my-2">${price}</span>
      <button className="bg-yellow-500 p-1  md:px-3 md:py-2">Ad to cart</button>
    </div>
  );
};

export default Product;
