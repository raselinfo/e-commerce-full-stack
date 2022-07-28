import React from "react";
import CartItem from "../components/CartItem";
const Cart = () => {
  return (
    <div className="container mx-auto">
      <h2 className="sm:text-5xl font-bold my-5 text-2xl">Shopping Cart 🛒</h2>
      <div className="grid lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <div className="right shadow-lg mt-14 lg:mt-0  lg:col-span-1 p-3 h-36">
          <h3 className="sm:text-3xl font-bold">Subtotal (10 items):</h3>
          <h3 className="sm:text-3xl font-bold">💲925</h3>
        </div>
      </div>
    </div>
  );
};

export default Cart;
