import React from "react";
import Skeleton from "react-loading-skeleton";
const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 justify-center mt-12">
        <div>
          <Skeleton height={"100vh"} />
        </div>
        <div className="grid sm:grid-cols-1 p-5 lg:h-2/6 h-6/6  ml-3 rounded-lg">
          <Skeleton height={"100%"} width={"100%"}/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
