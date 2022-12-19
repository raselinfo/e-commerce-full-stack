import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store/Store';
import Paypal from '../assets/images/payment/paypal.png';
import Stripe from '../assets/images/payment/stripe.png';
import Button from '../components/Button/Button';
import { BarLoader } from 'react-spinners';
import { toast } from 'react-toastify';
const Payment = () => {
  const {
    state: {
      cart: { payment_method, cartItems },
    },
    dispatch: ctxDispatch,
  } = useContext(Store);
  const [paymentMethod, setPaymentMethod] = useState(
    payment_method ? payment_method : ''
  );

  const { state } = useContext(Store);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!state.userInfo.email || cartItems.length === 0) {
      navigate('/checkout?step=shipping', { replace: true });
    }
  }, [navigate, state.userInfo.email, cartItems]);
  // Handel Payment Method
  const handelPaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };
  // Save Payment Method
  const savePaymentMethod = () => {
    setLoading(true);
    if (!paymentMethod) {
      return toast.warn('Please Select A Payment Method.💳', {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        style: {
          color: '#000',
        },
      });
    }
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
    setLoading(false);
    navigate('/checkout?step=order', { replace: true });
  };
  return (
    <div className='md:w-1/2 sm:w-full mx-auto bg-white md:my-28 p-5 rounded-lg'>
      <div className='flex flex-col justify-center items-center flex-wrap'>
        <div className='flex items-center'>
          <input
            type='radio'
            className='payment_checkbox mr-3'
            name='payment'
            id='paypal'
            value='Paypal'
            onChange={handelPaymentMethod}
            checked={paymentMethod === 'Paypal'}
          />
          <label htmlFor='paypal'>
            <img className='w-24' src={Paypal} alt='Paypal' />
          </label>
        </div>
        <div className='flex items-center'>
          <input
            type='radio'
            className='payment_checkbox mr-3'
            name='payment'
            id='stripe'
            value='Stripe'
            onChange={handelPaymentMethod}
            checked={paymentMethod === 'Stripe'}
          />
          <label htmlFor='stripe'>
            <img className='w-24' src={Stripe} alt='stripe' />
          </label>
        </div>
        <div className='flex gap-3'>
          <Button
            text='BACK'
            onClick={() =>
              navigate('/checkout?step=shipping', { replace: true })
            }
            className='text-2xl'
          />
          <Button onClick={savePaymentMethod} text='NEXT' className='text-2xl'>
            <BarLoader
              color='#000'
              loading={loading}
              id='spinner'
              cssOverride={{
                marginRight: 10,
              }}
              margin={5}
              size={10}
              disabled={loading}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
