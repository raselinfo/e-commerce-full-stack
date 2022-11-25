import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import CartItem from "../components/CartItem";
import { Store } from "../Store/Store";
import { Link } from "react-router-dom";
import CartSkeleton from "../Skeleton/CartSkeleton";
const Cart = () => {
  const {
    state: {
      cart: { cartItems },
    },
  } = useContext(Store);

  const totalAmount = cartItems.reduce((acc, item) => {
    return (acc += item.price * item.quantity);
  }, 0);

  return !cartItems.length ? (
    <MessageBox
      message={`No products. <a href="/" className="text-red-700 underline decoration-red-4 text-lg block">continue shopping</a>`}
    />
  ) : (
    <div className="container mx-auto">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {!cartItems.length ? (
        <CartSkeleton />
      ) : (
        <>
          <h2 className="sm:text-5xl text-white font-bold my-5 text-2xl">
            Shopping <span className="text-yellow-500">Cart</span> 🛒
          </h2>
          <div className="grid lg:grid-cols-3 lg:gap-5">
            <div className="lg:col-span-2">
              {cartItems?.map((product) => (
                <CartItem key={product._id} product={product} />
              ))}
            </div>
            <div className="right shadow-lg mt-14 lg:mt-0 bg-white rounded-lg lg:col-span-1 p-3 h-52">
              <h3 className="sm:text-3xl font-bold">
                Subtotal ({cartItems.length}) :
              </h3>
              <h3 className="sm:text-3xl font-bold mt-3">💲{totalAmount}</h3>
              <Link
                to="/checkout?step=shipping"
                className="bg-yellow-500 py-4 px-5 block font-bold rounded-xl text-2xl mt-5 hover:bg-yellow-600"
              >
                🛒Proceed To Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
