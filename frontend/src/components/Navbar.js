import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store/Store';
import Button from './Button/Button';
import publicAxios from '../utils/axios';
import { toast } from 'react-toastify';
import SearchBar from './SearchBar/SearchBar';
const Navbar = ({ isOpenHandler, isOpen }) => {
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
    const handleClickEvent = function (e) {
      if (
        e.target.id !== 'dropdown' &&
        e.target.className !== 'drop_item' &&
        e.target.id !== 'avatar'
      ) {
        setIsShowDropdown(false);
      }
    };

    if (isShowDropdown) {
      document.addEventListener('click', handleClickEvent);
    }

    // Remove click event
    return () => {
      document.removeEventListener('click', handleClickEvent);
    };
  }, [isShowDropdown]);

  const handleSignOut = async () => {
    try {
      const result = await publicAxios.post('/logout');
      if (result.status === 200) {
        ctxDispatch({ type: 'SIGN_OUT' });
        return toast.warn('Your are logged out', {
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
    <div
      style={{ marginLeft: isOpen ? '240px' : '0px' }}
      className={`bg-gray-700  font-bold ${
        isOpen ? 'hidden' : 'flex'
      } sm:flex items-center sticky top-0 z-50 ease-linear duration-300`}
    >
      <h1 className={`text-3xl text-white p-5 ${isOpen && 'hidden lg:block'} `}>
        <Link to='/'>RaselFashion.</Link>
      </h1>
      <div className=' w-full flex items-center justify-between'>
        <div className='flex items-center gap-3 w-full justify-end sm:w-auto sm:justify-self-auto'>
          <span
            onClick={isOpenHandler}
            className='text-white sm:ml-5 mr-3 sm:mr-0 inline-block  text-xl border border-1 py-2 px-3 rounded-lg cursor-pointer humbugger'
            id='humbugger'
          >
            <i id='humbugger' className='fa-solid fa-bars'></i>
          </span>
          <SearchBar className='hidden lg:flex' />
        </div>
        <div className='flex items-center justify-end'>
          {userInfo?.email ? (
            <div className='relative hidden md:block'>
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
                    <li className='drop_item   py-1 px-5 hover:bg-gray-200 cursor-pointer'>
                      <Link to='/profile'>{userInfo.name}</Link>
                    </li>
                    <li className='drop_item py-1 px-5 hover:bg-gray-200 cursor-pointer'>
                      <Link to='/order_history?page=1'>Order History</Link>
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
            <Link className='hidden md:block' to='/signin'>
              <Button text='Sign In' />
            </Link>
          )}
          <Link to='/cart' className='p-5 text-2xl   text-white hidden sm:flex'>
            Cart
            <span className='bg-red-700 inline-block w-10 h-10 text-center rounded-full leading-10 ml-2'>
              {countTotalProduct}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
