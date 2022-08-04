import React, { useEffect, useReducer } from "react";
import Product from "../components/Product";
import axios from "../utils/axios";
import formateError from "../utils/formateError";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";

import MessageBox from "../components/MessageBox";
const initialData = {
  loading: false,
  error: "",
  products: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "REQUEST":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, loading: false, products: payload };
    case "FAIL":
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
const Home = () => {
  const [{ loading, error, products }, dispatch] = useReducer(
    reducer,
    initialData
  );
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "REQUEST" });
      try {
        const { data } = await axios.get("/products");
        dispatch({ type: "SUCCESS", payload: data.data });
      } catch (err) {
        dispatch({ type: "FAIL", payload: formateError(err) });
      }
    };
    fetchProducts();
  }, []);
  return (
    <section className="relative">
      <Helmet>
        <title>Home</title>
      </Helmet>
      {loading ? (
        <Loading loading={loading} />
      ) : error ? (
        <MessageBox error={error} />
      ) : (
        <div className="md:container md:mx-auto">
          <h1 className="md:text-5xl text-white sm:text-4xl text-3xl font-bold my-12">
            <span className="text-yellow-500">Featured </span>
            Products 😃
          </h1>
          <div className="gap-5  grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
            {products.map((product) => {
              return <Product key={product._id} product={product} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
