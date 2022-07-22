import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
const Product = ({ product: { image, name, price, reviews, slug, stock } }) => {
  const navigate = useNavigate();
  const seeDetailsPageHandler = (e) => {
    if (e.target.tagName === "IMG") {
      navigate(`/product/${slug}`);
    }
  };
  return (
    <div className=" p-5 shadow-lg" onClick={seeDetailsPageHandler}>
      <img
        className="w-full hover:scale-95 transition-all cursor-pointer"
        src={image}
        alt={name}
      />
      <Link
        to={`/product/${slug}`}
        className="underline text-blue-500 lg:text-3xl text-2xl font-bold mb-3 block"
      >
        {name}
      </Link>
      <Rating reviews={reviews} />
      <span className="font-bold md:text-2xl block my-2">${price}</span>
      {stock > 0 ? (
        <button className="bg-yellow-500 p-1 mt-1 rounded-lg  md:px-3 md:py-2">
          Ad to cart
        </button>
      ) : (
        <button
          disabled
          className="bg-red-500 p-1 mt-1 md:px-3 md:py-2 text-white rounded-lg"
        >
          Out of stock
        </button>
      )}
    </div>
  );
};

export default Product;
