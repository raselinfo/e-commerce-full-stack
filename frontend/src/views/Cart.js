import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import CartItem from "../components/CartItem";
import { Store } from "../Store/Store";
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
      message={`No products. <a href="/" class="text-red-700 underline decoration-red-4 text-lg block">continue shopping</a>`}
    />
  ) : (
    <div className="container mx-auto">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h2 className="sm:text-5xl font-bold my-5 text-2xl">
        Shopping <span className="text-yellow-500">Cart</span> 🛒
      </h2>
      <div className="grid lg:grid-cols-3 lg:gap-5">
        <div className="lg:col-span-2">
          {cartItems?.map((product) => (
            <CartItem key={product._id} product={product} />
          ))}
        </div>
        <div className="right shadow-lg mt-14 lg:mt-0  lg:col-span-1 p-3 h-36">
          <h3 className="sm:text-3xl font-bold">Subtotal (10 items):</h3>
          <h3 className="sm:text-3xl font-bold">💲{totalAmount}</h3>
        </div>
      </div>
    </div>
  );
};

export default Cart;
