import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../Hocks/useFetch';
import MessageBox from '../components/MessageBox';
import OrderHistorySkeleton from '../Skeleton/order/OrderHistorySkeleton';
import getQuery from '../utils/getQueryString';
import { Helmet } from 'react-helmet-async';
const OrderHistory = () => {
  const navigate = useNavigate();
  const { page } = getQuery(['page']);
  const { data, loading, error } = useFetch({
    url: `/order_history?page=${page}&limit=10`,
    options: {
      method: 'get',
      body: null,
      private: true,
    },
  });

  const changeStepQuery = (index) => {
    console.log(index);
    navigate(`/order_history?page=${index}`);
  };
  return (
    <>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      {loading ? (
        <OrderHistorySkeleton />
      ) : error ? (
        <MessageBox error={error} />
      ) : (
        <div className='container mx-auto mt-3'>
          <h1 className='text-white font-bold text-5xl mb-5 uppercase'>
            Total Order : {data?.data?.length}
          </h1>
          {data?.data?.length === 0 ? (
            <MessageBox message='No Order Found' />
          ) : (
            <div className='bg-white rounded-lg p-5'>
              <table className=' w-full'>
                <thead className='border-b-2'>
                  <tr className='font-bold text-2xl text-left'>
                    <th className='p-3'>ID</th>
                    <th className='p-3'>Date</th>
                    <th className='p-3'>Total</th>
                    <th className='p-3'>Paid</th>
                    <th className='p-3'>Delivered</th>
                    <th className='p-3'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((order) => {
                    const date = new Date(order.createdAt)
                      .toLocaleString()
                      .replace(/\//g, '-');
                    return (
                      <tr
                        key={order?._id}
                        className='font-bold text-xl text-left'
                      >
                        <td className='p-3'>{order._id}</td>
                        <td className='p-3'>{date}</td>
                        <td className='p-3'>${order.totalPrice}</td>
                        <td className='p-3'>
                          <span
                            className={`${
                              order.isPaid ? 'bg-green-200' : 'bg-red-200 '
                            } inline-block px-5 py-2 rounded-xl`}
                          >
                            {order.isPaid ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className='p-3'>
                          <span
                            className={`${
                              order.isDelivered ? 'bg-green-200' : 'bg-red-200 '
                            } inline-block px-5 py-2 rounded-xl`}
                          >
                            {order.isDelivered ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className='p-3'>
                          <Link
                            className='py-2 px-5 bg-gray-200 rounded-xl'
                            to={`/order/${order._id}`}
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {!(Array(data?.pagination?.pages).length === 1) && (
                <ul className='flex justify-start '>
                  {Array(data?.pagination?.pages)
                    .fill(data?.pagination?.pages)
                    .map((_item, index) => {
                      index = index + 1;
                      return (
                        <li
                          className={`${
                            Number(page) === index
                              ? 'bg-green-500'
                              : 'bg-green-100'
                          } m-2 py-2 font-bold px-4 rounded-lg cursor-pointer`}
                          key={index}
                          onClick={() => changeStepQuery(index)}
                        >
                          {index}
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderHistory;
