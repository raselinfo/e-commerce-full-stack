import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useReducer,
} from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store/Store';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import formateError from '../utils/formateError';
import pAxios from '../Hocks/useAxios';
import Button from '../components/Button/Button';
import { BarLoader } from 'react-spinners';
import { toast } from 'react-toastify';
// Reducer
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'REQUEST':
      return { ...state, error: '', loading: true };
    case 'SUCCESS':
      return { ...state, error: '', loading: false };
    case 'FAIL':
      return { ...state, error: payload, loading: false };
    case 'ORDER':
      return {
        ...state,
        error: '',
        loading: false,
        orderSummary: { ...state.orderSummary, ...payload },
      };
    case 'COUPON':
      return { ...state, error: '', message: payload, loading: false };
    default:
      return state;
  }
};

const PlaceOrder = () => {
  const privateAxios = pAxios();
  const [{ error, loading, message, orderSummary }, dispatch] = useReducer(
    reducer,
    {
      error: '',
      loading: '',
      orderSummary: {
        taxPrice: 0,
        shippingPrice: 0,
        coupon: {
          code: '',
          price: 0,
        },
        totalPrice: 0,
      },
    }
  );

  const [timer, setTimer] = useState(null);
  const [isCouponApply, setIsCouponApply] = useState(false);
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
    try {
      const { data } = await axios.get(
        `getShippingCharge?city=${shipping_address.city.trim()}&itemPrice=${itemPrice}`
        // 'getShippingCharge?city=chandpur&itemPrice=500'
      );
      return data.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }, [shipping_address, itemPrice]);
  // Const Tax Handler
  const taxHandler = async () => {
    try {
      const { data } = await axios.get(`/getStoreUtils?tax=true`);
      const tax = data?.data?.tax;

      return tax;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Const Calculate
  const calCulate = useCallback(
    ({ shipping, tax }) => {
      const newTaxPrice = (itemPrice * tax) / 100;
      const total = itemPrice + shipping + newTaxPrice;

      dispatch({
        type: 'ORDER',
        payload: {
          taxPrice: tax,
          shippingPrice: shipping,
          totalPrice: decimal(total),
        },
      });
    },
    [itemPrice]
  );

  // Coupon Handler
  const couponHandler = async (couponCode) => {
    try {
      const { data } = await axios.get(`/get_coupon?code=${couponCode}`);
      if (!data?.data?.discount) throw new Error('Invalid Coupon');
      const discount = data?.data?.discount;
      const code = data?.data?.code;
      return { discount, code };
    } catch (err) {
      throw new Error(err.message);
    }
  };
  const handleCouponInput = (e) => {
    clearTimeout(timer);
    const newTimer = setTimeout(async () => {
      try {
        const { discount, code } = await couponHandler(e.target.value);
        const newTotal = orderSummary.totalPrice - discount;

        dispatch({
          type: 'ORDER',
          payload: {
            ...orderSummary,
            totalPrice: newTotal,
            coupon: { ...orderSummary.coupon, code: code, price: discount },
          },
        });
        setIsCouponApply(true);
        dispatch({ type: 'COUPON', payload: '✅ Coupon Applied.' });
      } catch (err) {
        if (isCouponApply) {
          calCulate({
            shipping: orderSummary.shippingPrice,
            tax: orderSummary.taxPrice,
          });
          setIsCouponApply(false);
        }
        dispatch({ type: 'COUPON', payload: '❌ Invalid Coupon!' });
      }
    }, 500);
    setTimer(newTimer);
  };

  // Redirect Payment screen if payment method not exist
  useEffect(() => {
    const callAPI = async () => {
      try {
        dispatch({ type: 'REQUEST' });
        // Call shipping handler
        const shipping = await shippingHandler();
        const tax = await taxHandler();
        calCulate({ shipping, tax });
        dispatch({ type: 'SUCCESS' });
      } catch (err) {
        dispatch({ type: 'FAIL', payload: formateError(err) });
      }
    };
    callAPI();
    // redirect payment step if payment method not present
    if (!payment_method || !shipping_address || cartItems.length === 0) {
      navigate('/checkout?step=payment', { replace: true });
    }
  }, [
    payment_method,
    navigate,
    shipping_address,
    cartItems,
    shippingHandler,
    calCulate,
  ]);

  // Place Order Handler
  const placeOrderHandler = async () => {
    try {
      const { data } = await privateAxios.post('/order', {
        orderItems: cartItems,
        shippingAddress: shipping_address,
        paymentMethod: payment_method,
        itemPrice: itemPrice,
        shippingPrice: orderSummary.shippingPrice,
        taxPrice: orderSummary.taxPrice,
        totalPrice: orderSummary.totalPrice,
        coupon: orderSummary.coupon,
      });
      if (data?.data) {
        const orderID = data?.data?._id;
        navigate(`/order/${orderID}`);
        return;
      }
    } catch (err) {
      toast.error(formateError(err), {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
  };

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
          <h3 className='text-3xl font-bold mb-5'>
            ORDER <span className='text-yellow-500'>SUMMERY</span>
          </h3>
          {loading ? (
            <h1>Loading....</h1>
          ) : error ? (
            <p className='text-red-500'>{error}</p>
          ) : (
            <div className='items text-2xl font-bold'>
              <div className='item flex justify-between'>
                <span>Items</span>
                <span className='mr-20'>${itemPrice}</span>
              </div>
              <hr />
              <div className='item flex justify-between '>
                <span>Shipping</span>
                <span className='mr-20'>${orderSummary.shippingPrice}</span>
              </div>
              <hr />
              <div className='item flex justify-between '>
                <span>Tax</span>
                <span className='mr-20'>{orderSummary.taxPrice}%</span>
              </div>
              <hr />
              <div className='total flex justify-between my-5'>
                <span>Total</span>
                <span className='mr-20'>${orderSummary.totalPrice}</span>
              </div>
              <hr />
              <div className='flex justify-between'>
                <span>Coupon</span>
                <div>
                  <input
                    className='text-1xl border-2 focus:border-amber-500 rounded-md  text-xl p-2 border-amber-300'
                    type='text'
                    placeholder='rasel360'
                    onChange={handleCouponInput}
                  />
                  <p className='text-xl'>{message && message}</p>
                </div>
              </div>
              <div className='d-flex items-center'>
                <Button text='Place Order' onClick={placeOrderHandler}>
                  <BarLoader
                    color='#000'
                    loading={true}
                    id='spinner'
                    cssOverride={{
                      marginRight: 10,
                    }}
                    width={170}
                    margin={50}
                    size={10}
                    disabled={false}
                  />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
