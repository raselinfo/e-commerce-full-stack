import React from 'react';
import Skeleton from 'react-loading-skeleton';
const OrderSkeleton = () => {
  return (
    <div className='bg-white rounded-xl relative p-5 mb-5'>
      <Skeleton width={'100%'} height={'30px'} />
      <div>
        <Skeleton width={'100%'} count={2} />
      </div>

      <div>
        <Skeleton className='rounded-lg' width={'100%'} height={'50px'} />
      </div>
    </div>
  );
};

export default OrderSkeleton;
