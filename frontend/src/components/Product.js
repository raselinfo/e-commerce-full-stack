import { Link, useNavigate } from "react-router-dom";
import useCheckPdQuantity from "../Hocks/useCheckPdQuantity";

import Rating from "./Rating";
const Product = ({ product }) => {
  const { setProduct } = useCheckPdQuantity({});
  const navigate = useNavigate();
  const seeDetailsPageHandler = (e) => {
    if (e.target.tagName === "IMG") {
      navigate(`/product/${product.slug}`);
    }
  };
  const handelAddToCart = (product) => {
    setProduct(product);
  };
  return (
    <div className=" p-5 shadow-lg" onClick={seeDetailsPageHandler}>
      <img
        className="w-full hover:scale-95 transition-all cursor-pointer"
        src={product.image}
        alt={product.name}
      />
      <Link
        to={`/product/${product.slug}`}
        className="underline text-blue-500 lg:text-3xl text-2xl font-bold mb-3 block"
      >
        {product.name}
      </Link>
      <Rating reviews={product.reviews} />
      <span className="font-bold md:text-2xl block my-2">${product.price}</span>
      {product.stock > 0 ? (
        <button
          onClick={() => handelAddToCart(product)}
          className="bg-yellow-500 p-1 mt-1 rounded-lg  md:px-3 md:py-2"
        >
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
