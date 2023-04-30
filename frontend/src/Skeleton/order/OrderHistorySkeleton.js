import React from 'react';
import Skeleton from 'react-loading-skeleton';
const OrderHistorySkeleton = () => {
  return (
    <div className='container mx-auto mt-3'>
      <h1 className='text-white font-bold text-5xl mb-5'>Order History</h1>
      <div className='bg-white rounded-lg p-5'>
        <table className=' w-full'>
          <thead className='border-b-2'>
            <tr>
              <th>
                <Skeleton height={70} />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Skeleton height={30} count={15} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrderHistorySkeleton;
