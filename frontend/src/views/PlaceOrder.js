import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store/Store';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import formateError from '../utils/formateError';
import pAxios from '../Hocks/useAxios';
const PlaceOrder = () => {
  const [shippingCharge, setShippingCharge] = useState(0);
  const [tax, setTax] = useState(0);
  const navigate = useNavigate();
  const {
    state: {
      cart: { cartItems, payment_method, shipping_address },
    },
  } = useContext(Store);

  // Make Decimal number
  const decimal = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.567=> 123.56
  // Items price
  const itemPrice = decimal(
    cartItems.reduce((acc, item) => (acc += item.quantity * item.price), 0)
  );

  // Fetch Shipping Details
  const shippingHandler = useCallback(async () => {
    console.log('i am shippingHandler');
    try {
      const { data } = await axios.get(
        `getShippingCharge?city=${shipping_address.city.trim()}&itemPrice=${itemPrice}`
        // 'getShippingCharge?city=chandpur&itemPrice=500'
      );

      // setShippingCharge;
      setShippingCharge(data.data);

      return data.data;
    } catch (err) {
      formateError(err);
      console.log(formateError(err));
    }
  }, [shipping_address, itemPrice]);
  // Const Tax Handler
  const taxHandler = async () => {
    const { data } = await axios.get(`/getStoreUtils?tax=true`);
    const tax = data?.data?.tax;
    console.log('tax', tax);

    return tax;
  };

  // Redirect Payment screen if payment method not exist
  useEffect(() => {
    const callAPI = async () => {
      // Call shipping handler
      setShippingCharge(await shippingHandler());
      setTax(await taxHandler());
    };
    callAPI();
    // redirect payment step if payment method not present
    if (!payment_method || !shipping_address || cartItems.length === 0) {
      navigate('/checkout?step=payment', { replace: true });
    }
  }, [payment_method, navigate, shipping_address, cartItems, shippingHandler]);

  return (
    <div className='md:w-5/6  mx-auto  md:my-28'>
      <h2 className='text-5xl mb-5 text-white font-bold '>
        Preview <span className='text-yellow-500'>Order</span>
      </h2>
      <div className='flex  gap-y-5 lg:gap-x-5 flex-col lg:flex-row justify-center'>
        <div className='left order-1 w-full'>
          {/* Shipping Details */}
          <div className='bg-white rounded-xl relative p-5 mb-5'>
            <h3 className='text-3xl font-bold mb-2'>Shipping</h3>
            <p className='text-2xl'>
              <span className=' font-bold'>Name:</span> {shipping_address.name}
            </p>
            <p className='text-2xl'>
              <span className=' font-bold'>Address:</span>{' '}
              {`${shipping_address.address}, ${shipping_address.city}, ${shipping_address.postal}, ${shipping_address.country}`}
            </p>
            <Link to='/checkout?step=shipping'>
              <span className='order_edit cursor-pointer flex items-center justify-center w-10 h-10 bg-yellow-500 p-3 hover:bg-yellow-600 text-2xl rounded-xl'>
                <i className='fa-solid fa-pen-to-square'></i>
              </span>
            </Link>
          </div>
          {/* Payment Details */}
          <div className='bg-white rounded-xl relative p-5 mb-5'>
            <h3 className='text-3xl font-bold mb-2'>Payment</h3>
            <p className='text-2xl'>
              <span className=' font-bold'>Method:</span> {payment_method}
            </p>

            <Link to='/checkout?step=payment'>
              <span className='order_edit cursor-pointer flex items-center justify-center w-10 h-10 bg-yellow-500 p-3 hover:bg-yellow-600 text-2xl rounded-xl'>
                <i className='fa-solid fa-pen-to-square'></i>
              </span>
            </Link>
          </div>
          {/* Items Details */}
          <div className='bg-white rounded-xl relative p-5'>
            <h3 className='text-3xl font-bold mb-2'>Items</h3>

            {cartItems.map(({ image, name, quantity, price, slug, _id }) => (
              <div className='shadow-lg p-3 rounded-lg' key={_id}>
                <div className='flex justify-between items-center'>
                  <img className='w-20' src={image} alt={name} />
                  <span className='text-2xl font-bold'>{quantity}</span>
                  <span className='text-2xl font-bold'>{price}</span>
                  <Link to={`/product/${slug}`}>
                    <span className='cursor-pointer flex items-center justify-center w-10 h-10 bg-yellow-500 p-3 hover:bg-yellow-600 text-2xl rounded-xl'>
                      <i className='fa-solid fa-pen-to-square'></i>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right */}
        <div className='bg-white p-5 rounded-xl order-2 w-full md:w-1/2'>
          <h3 className='text-3xl font-bold'>
            Order <span className='text-yellow-500'>Summary</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
