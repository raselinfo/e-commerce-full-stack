import { useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import Rating from "../components/Rating";
import axios from "../utils/axios";
import formateError from "../utils/formateError";
const initialState = {
  loading: false,
  error: "",
  product: {},
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "REQUEST":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, loading: false, product: payload };
    case "FAIL":
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
const ProductDetails = () => {
  const { slug } = useParams();
  const [
    {
      loading,
      error,
      product: { name, description, price, reviews, stock, image },
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: "REQUEST" });
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`/products/${slug}`);
        dispatch({ type: "SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FAIL", payload: formateError(err) });
      }
    };
    fetchData();
  }, [slug]);
  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorMessage error={error} />
  ) : (
    <div className="container mx-auto">
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <div className="grid md:grid-cols-2 justify-center mt-12">
        <div>
          <img className="w-full" src={image} alt={name} />
        </div>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1">
          <div className="left-side">
            <h3 className="md:text-5xl text-3xl font-bold mb-5">{name}</h3>
            <hr />
            <div className="my-3">
              <Rating reviews={reviews} />
            </div>
            <hr />
            <p className="font-bold my-3">Price : ${price}</p>
            <hr className="mb-3" />
            <p className="font-bold">Description : {description}</p>
          </div>
          <div className="right-side shadow-lg p-5 lg:h-2/6 h-6/6">
            <div>
              <div className="price font-bold text-left my-5">
                <span>
                  <span>Price : </span>
                  <span className="py-3 px-4 rounded-lg">${price}</span>
                </span>
              </div>
              <div className="font-bold">
                <span>
                  {stock > 0 ? (
                    <button className="bg-yellow-500 py-3 px-4 rounded-lg">
                      Add To Cart
                    </button>
                  ) : (
                    <>
                      <span>Status : </span>
                      <button
                        disabled
                        className="bg-red-500 p-1 mt-1 md:px-3 md:py-2 text-white rounded-lg"
                      >
                        Out of stock
                      </button>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
