import React from 'react';
import { Link } from 'react-router-dom';

const CartItem = () => {
    return (
      <div className="left grid grid-cols-4 lg:grid-cols-5 items-center shadow-lg  p-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:col-span-2 gap-2">
          <Link className="text-blue-500 font-bold" to="#">
            <img
              className="w-20 inline-block"
              src="https://res.cloudinary.com/dg2k9rn0q/image/upload/v1658327169/p1_nqgm7m.jpg"
              alt=""
            />
          </Link>
          <Link className="text-blue-500 font-bold sm:text-2xl" to="#">
            Name Of Product
          </Link>
        </div>
        <div className="handleQuantity flex flex-col sm:flex-row items-center">
          <span className="bg-gray-100 py-2 px-3 cursor-pointer sm:text-2xl rounded-lg hover:bg-gray-200 transition-all">
            <i className="fa-solid fa-circle-minus"></i>
          </span>
          <span className="sm:text-2xl font-bold mx-2 select-none">5</span>
          <span className="bg-gray-100 py-2 px-3 cursor-pointer sm:text-2xl rounded-lg hover:bg-gray-200 transition-all">
            <i className="fa-solid fa-circle-plus"></i>
          </span>
        </div>
        <div className="price">
          <span className="sm:text-2xl font-bold mx-2 select-none">💲65</span>
        </div>
        <div className="delete">
          <span className="bg-gray-100 py-2 px-3 cursor-pointer sm:text-2xl rounded-lg hover:bg-gray-200 transition-all">
            <i className="fa-solid fa-trash"></i>
          </span>
        </div>
      </div>
    );
};

export default CartItem;