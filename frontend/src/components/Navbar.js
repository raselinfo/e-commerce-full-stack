import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store/Store';
import Button from './Button/Button';
import publicAxios from '../utils/axios';
import { toast } from 'react-toastify';
const Navbar = () => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const {
    state: {
      cart: { cartItems },
      userInfo,
    },
    dispatch: ctxDispatch,
  } = useContext(Store);
  const countTotalProduct = cartItems.reduce((acc, item) => {
    return (acc += item.quantity);
  }, 0);
  useEffect(() => {
    const handleDropdown = () => {
      if (isShowDropdown) {
        const body = window.document.getElementById('htmlBody');
        body.addEventListener('click', function (e) {
          if (
            e.target.id !== 'dropdown' &&
            e.target.className !== 'drop_item' &&
            e.target.id !== 'avatar'
          ) {
            setIsShowDropdown(false);
          }
        });
      }
    };
    handleDropdown();
  }, [isShowDropdown]);

  const handleSignOut = async () => {
    try {
      const result = await publicAxios.post('/logout');
      if (result.status === 200) {
        ctxDispatch({ type: 'SIGN_OUT' });
        return toast.success('Login Fail', {
          position: 'bottom-right',
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        });
      }
    } catch (err) {
      return toast.error('Login Fail', {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div className='bg-gray-700  font-bold flex items-center'>
      <h1 className='text-3xl text-white p-5'>
        <Link to='/'>RaselFashion.</Link>
      </h1>
      <Link to='/cart' className='p-5 text-2xl flex  text-white'>
        Cart
        <span className='bg-red-700 inline-block w-10 h-10 text-center rounded-full leading-10 ml-2'>
          {countTotalProduct}
        </span>
      </Link>
      {userInfo?.email ? (
        <div className='relative'>
          {/* Avatar */}
          <img
            id='avatar'
            onClick={() => setIsShowDropdown(!isShowDropdown)}
            className='w-14 h-14 rounded-full cursor-pointer'
            src={userInfo.image.url || userInfo.image}
            alt={userInfo?.name}
          />
          {isShowDropdown && (
            <div
              id='dropdown'
              onClick={() => setIsShowDropdown(true)}
              className='dropdown absolute rounded-lg bg-white  w-40 overflow-hidden'
            >
              <ul className='text-center'>
                <li className='drop_item text-gray-500 mb-3 py-1 px-5 '>
                  {userInfo?.name}
                </li>
                <li className='drop_item py-1 px-5 hover:bg-gray-200 cursor-pointer'>
                  <Link to="/order_history">Order History</Link>
                </li>
                <li
                  onClick={handleSignOut}
                  className='drop_item py-1 px-5 hover:bg-gray-200 cursor-pointer'
                >
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link to='/signin'>
          <Button text='Sign In' />
        </Link>
      )}
    </div>
  );
};

export default Navbar;
