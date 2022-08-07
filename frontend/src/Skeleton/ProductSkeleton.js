import React from "react";
import Skeleton from "react-loading-skeleton";
const ProductSkeleton = () => {
  return (
    <div className=" p-5 shadow-lg bg-white rounded-lg ">
      <Skeleton height={300} />
      <Skeleton height={40} />
      <Skeleton height={20}  />
      <Skeleton height={20} />
      <Skeleton height={40} width={150} />
    </div>
  );
};

export default ProductSkeleton;
