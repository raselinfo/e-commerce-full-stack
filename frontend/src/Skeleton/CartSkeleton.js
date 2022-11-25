import React from "react";
import Skeleton from "react-loading-skeleton";
const CartSkeleton = () => {
  return (
    <div className="container mx-auto">
      <h2 className="sm:text-5xl text-white font-bold my-5 text-2xl">
        <Skeleton />
      </h2>
      <div className="grid lg:grid-cols-3 lg:gap-5">
        <div className="lg:col-span-2">
          {Array(5)
            .fill(0)
            .map((_, index) => {
              return <Skeleton key={index} />;
            })}
        </div>
        <div className="right shadow-lg mt-14 lg:mt-0 bg-white rounded-lg lg:col-span-1 p-3 h-52">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
