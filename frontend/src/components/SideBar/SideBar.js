import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../Hocks/useFetch';

const SearchBar = lazy(() => import('../SearchBar/SearchBar'));

const SideBar = ({ isOpen, isOpenHandler }) => {
  const { data } = useFetch({
    url: '/categories',
    options: {
      method: 'get',
      body: null,
      private: false,
    },
  });
  return (
    <div
      //   style={{ marginLeft: `${isOPen ? '260px' : '-260px'}` }}
      style={{ marginLeft: isOpen ? '0px' : '-301px' }}
      className={` h-screen ${
        isOpen && 'w-full'
      } sm:w-60 fixed z-50 top-0  bottom-0 ease-linear duration-300 sidebar py-5  overflow-hidden`}
      id='sidebar'
    >
      <div className='flex flex-col items-center gap-5'>
        <span
          onClick={isOpenHandler}
          className='text-white mr-3 sm:mr-0  text-xl border border-1 py-2 px-3 rounded-lg cursor-pointer block sm:hidden'
        >
          <i className='fa-solid fa-bars'></i>
        </span>
        <h2 className='text-bold text-white text-3xl block lg:hidden'>
          RaselFashion.
        </h2>
        <div>
          <SearchBar className='flex-col lg:hidden' />
        </div>
        {data?.data?.length && (
          <div className='categories'>
            <h4 className='text-2xl text-white font-bold mb-3'>Categories</h4>
            <ul>
              {data?.data?.map((category) => {
                return (
                  <li key={category._id}>
                    <Link
                      className='text-xl block text-gray-50 font-bold bg-yellow-500 py-2 px-5 rounded  m-3 text-center'
                      to={`/search?category=${category.name}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
