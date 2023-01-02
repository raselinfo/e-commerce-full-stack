import { useReducer, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import pAxios from '../Hocks/useAxios';
import OrderSkeleton from '../Skeleton/order/OrderSkeleton';
import ItemsSkeleton from '../Skeleton/order/ItemsSkeletor';
import Skeleton from 'react-loading-skeleton';
import MessageBox from '../components/MessageBox';
import formateError from '../utils/formateError';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Helmet from 'react-helmet-async';
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'REQUEST':
      return { ...state, error: '', loading: true };
    case 'SUCCESS':
      return { ...state, error: '', loading: false, orderDetails: payload };
    case 'FAIL':
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};
const initialState = {
  error: '',
  loading: true,
  orderDetails: null,
};

const Order = () => {
  const { orderID } = useParams();
  const privateAxios = pAxios();
  const [{ error, loading, orderDetails }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        dispatch({ type: 'REQUEST' });
        const { data } = await privateAxios.get(`/order/${orderID}`);
        const getOrder = data?.data;
        if (getOrder) {
          dispatch({ type: 'SUCCESS', payload: getOrder });
        }
      } catch (err) {
        dispatch({ type: 'FAIL', payload: await formateError(err) });
      }
    };
    // Call getOrderDetails function
    if (orderID) {
      getOrderDetails();
    }
  }, [privateAxios, orderID]);
  return (
    <>
      <Helmet>
        <title>Order</title>
      </Helmet>
      error ? (
      <MessageBox error={error} />) : (
      <div className='md:w-5/6  mx-auto  md:my-28'>
        <h2 className='text-5xl mb-5 text-white font-bold '>
          <span className='text-yellow-500'>ORDER ID: </span> {orderID}
        </h2>
        <div className='flex  gap-y-5 lg:gap-x-5 flex-col lg:flex-row justify-center'>
          <div className='left order-1 w-full'>
            {/* Shipping Details */}
            {loading ? (
              <OrderSkeleton />
            ) : (
              <div className='bg-white rounded-xl relative p-5 mb-5'>
                <h3 className='text-3xl font-bold mb-2'>Shipping</h3>
                <p className='text-2xl'>
                  <span className=' font-bold'>Name: </span>
                  <span>{orderDetails?.shippingAddress?.fullName}</span>
                </p>
                <p className='text-2xl'>
                  <span className=' font-bold'>Address:</span>
                  <span>
                    {' '}
                    {` ${orderDetails?.shippingAddress?.address}, ${orderDetails?.shippingAddress?.city} (${orderDetails?.shippingAddress?.postalCode}), ${orderDetails?.shippingAddress?.country}`}
                  </span>
                </p>
                <div
                  className={`${
                    orderDetails?.isDelivered ? 'bg-green-100' : 'bg-red-100'
                  } mt-5 py-6 rounded-lg px-5 font-bold text-xl`}
                >
                  {orderDetails?.isDelivered ? 'Delivered' : 'Not Delivered'}
                </div>
              </div>
            )}

            {/* Payment Details */}
            {loading ? (
              <OrderSkeleton />
            ) : (
              <div className='bg-white rounded-xl relative p-5 mb-5'>
                <h3 className='text-3xl font-bold mb-2'>Payment</h3>
                <p className='text-2xl'>
                  <span className=' font-bold'>Method:</span>{' '}
                  {orderDetails?.paymentMethod}
                </p>
                <div
                  className={`${
                    orderDetails?.isPaid ? 'bg-green-100' : 'bg-red-100'
                  } mt-5 py-6 rounded-lg px-5 font-bold text-xl`}
                >
                  {orderDetails?.isPaid ? 'Paid' : 'Not Paid'}
                </div>
              </div>
            )}

            {/* Items Details */}
            <div className='bg-white rounded-xl relative p-5'>
              <h3 className='text-3xl font-bold mb-2'>Items</h3>
              {loading ? (
                <ItemsSkeleton />
              ) : (
                orderDetails?.orderItems.map(
                  ({ image, name, quantity, price, slug, _id }) => (
                    <div className='shadow-lg p-3 rounded-lg' key={_id}>
                      <div className='flex justify-between items-center'>
                        {/* <img className='w-20' src={image} alt={name} /> */}
                        <LazyLoadImage
                          effect='blur'
                          width={100}
                          src={image}
                          alt={name}
                        />
                        <span className='text-2xl font-bold'>{quantity}</span>
                        <span className='text-2xl font-bold'>{price}</span>
                        <Link to={`/product/${slug}`}>
                          <span className='cursor-pointer flex items-center justify-center w-10 h-10 bg-yellow-500 p-3 hover:bg-yellow-600 text-2xl rounded-xl'>
                            <i className='fa-solid fa-pen-to-square'></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>
          {/* Right */}

          <div className='bg-white p-5 rounded-xl order-2 w-full md:w-1/2'>
            <h3 className='text-3xl font-bold mb-5'>
              ORDER <span className='text-yellow-500'>SUMMERY</span>
            </h3>
            {loading ? (
              <Skeleton
                width='100%'
                height='30px'
                className='mb-5 rounded-lg'
                count={5}
              />
            ) : (
              <div className='items text-2xl font-bold'>
                <div className='item flex justify-between'>
                  <span>Items</span>
                  <span className='mr-20'>${orderDetails?.itemsPrice}</span>
                </div>
                <hr className='mb-3' />
                <div className='item flex justify-between '>
                  <span>Shipping</span>
                  <span className='mr-20'>${orderDetails?.shippingPrice}</span>
                </div>
                <hr className='mb-3' />
                <div className='item flex justify-between '>
                  <span>Tax</span>
                  <span className='mr-20'>{orderDetails?.taxPrice}%</span>
                </div>
                {orderDetails?.coupon?.code && (
                  <div className='item flex justify-between '>
                    <span>Coupon</span>
                    <span className='mr-20'>
                      - ${orderDetails?.coupon?.price}
                    </span>
                  </div>
                )}

                <hr className='mb-3' />
                <div className='total flex justify-between my-5'>
                  <span>Total</span>
                  <span className='mr-20'>${orderDetails?.totalPrice}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      );
    </>
  );
};

export default Order;
