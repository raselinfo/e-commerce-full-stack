import React from 'react';
import Skeleton from 'react-loading-skeleton';

const ItemsSkeleton = ({ items = 3 }) => {
  return (
    <div className='bg-white rounded-xl relative p-5'>
      <h3 className='text-3xl font-bold mb-2'>Items</h3>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            key={index}
            className='rounded-lg'
            width='100%'
            height='50px'
          />
        ))}
    </div>
  );
};

export default ItemsSkeleton;
