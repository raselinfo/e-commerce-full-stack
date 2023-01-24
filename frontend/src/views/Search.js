import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { lazy, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import useFetch from '../Hocks/useFetch';
const Skeleton = lazy(() => import('react-loading-skeleton'));
const Product = lazy(() => import('../components/Product'));
const Rating = lazy(() => import('../components/Rating'));

const ratings = [
  {
    name: '4stars & up',
    rating: 4,
  },

  {
    name: '3stars & up',
    rating: 3,
  },

  {
    name: '2stars & up',
    rating: 2,
  },

  {
    name: '1stars & up',
    rating: 1,
  },
  {
    name: 'no rating',
    rating: 0,
  },
];
const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $500',
    value: '51-500',
  },
  {
    name: '$501 to $1000',
    value: '501-1000',
  },
];
const Search = () => {
  const navigate = useNavigate();
  const [configureRequest, setConfigureRequest] = useState({
    url: '/search',
    options: {
      method: null,
      body: null,
      private: true,
    },
  });
  // Get Categories
  const { data: categories, loading: categoryLoading } = useFetch({
    url: '/categories',
    options: {
      method: 'get',
      body: null,
      private: false,
    },
  });
  // Get Products
  const { data, loading, error } = useFetch(configureRequest);
  // Get Queries
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  const categoryQuery = queryParams.get('category') || 'all';
  const query = queryParams.get('query') || 'all';
  const priceQuery = queryParams.get('price') || 'all';
  const ratingQuery = queryParams.get('rating') || 'all';
  const sort = queryParams.get('sort') || 'newest';
  const page = queryParams.get('page') || 1;
  // Filtered URL
  const filterURL = useCallback(
    (filter, skipPath = false) => {
      const filterCategory = filter.category || categoryQuery;
      const filterQuery = filter.query || query;
      const filterPrice = filter.price || priceQuery;
      const filterRating = filter.rating || ratingQuery;
      const filterSort = filter.sort || sort;
      const filterPage = filter.page || page;
      return `${
        skipPath ? '' : '/search?'
      }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&sort=${filterSort}&page=${filterPage}`;
    },
    [categoryQuery, page, priceQuery, query, ratingQuery, sort]
  );
  // Filtered Result
  const filteredResult = useMemo(() => {
    return [
      { query: 'category', value: categoryQuery },
      { query: 'query', value: query },
      { query: 'price', value: priceQuery },
      { query: 'rating', value: ratingQuery },
    ].filter((item) => item.value !== 'all');
  }, [categoryQuery, priceQuery, query, ratingQuery]);

  // Remove Filter from filteredResult
  const removeFilteredResult = (query) => {
    const result = filterURL({ [query]: 'all', page: 1 });
    navigate(result, { replace: true });
    return;
  };

  // Request for products
  useEffect(() => {
    setConfigureRequest({
      url: `/search?${filterURL(false, true)}`,
      options: {
        method: 'get',
        body: null,
        private: true,
      },
    });
  }, [filterURL]);
  return (
    <section className='flex-col lg:flex-row  flex container mx-auto mt-5'>
      <div className='filtered_bar bg-white mb-5 lg:mb-0 p-5 rounded-lg flex-2 mr-3'>
        {/* Department */}
        <div>
          <h4 className='text-3xl font-bold mb-3'>Department</h4>
          <ul className='text-center'>
            <li className='text-xl font-bold'>
              <Link
                className={`block ${
                  categoryQuery.toLocaleLowerCase() === 'all'
                    ? 'bg-yellow-600'
                    : 'bg-yellow-500'
                } py-2 px-3 rounded-lg mb-2 hover:bg-yellow-600`}
                to={filterURL({ category: 'all', page: 1 })}
              >
                <i className='fa-solid fa-cart-flatbed'></i> Any
              </Link>
            </li>
            {categoryLoading ? (
              <Skeleton count={3} height={50} width='100%' />
            ) : !categories?.data?.length ? (
              <h5 className='text-xl font-bold'>No Category!</h5>
            ) : (
              categories?.data?.map((category) => (
                <li key={category._id} className='text-xl font-bold'>
                  <Link
                    className={`block ${
                      categoryQuery.toLocaleLowerCase() ===
                      category?.name?.trim()
                        ? 'bg-yellow-600'
                        : 'bg-yellow-500'
                    } py-2 px-3 rounded-lg mb-2 hover:bg-yellow-600`}
                    to={filterURL({ category: category?.name, page: 1 })}
                  >
                    <i className='fa-solid fa-cart-flatbed'></i>{' '}
                    <span className='capitalize'> {category?.name}</span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
        {/* Price */}
        <div className='my-3'>
          <h4 className='text-3xl font-bold mb-3'>Price</h4>
          <ul className='text-center'>
            <li className='text-xl font-bold'>
              <Link
                className={`block ${
                  priceQuery.toLocaleLowerCase() === 'all'
                    ? 'bg-yellow-600'
                    : 'bg-yellow-500'
                } py-2 px-3 rounded-lg mb-2 hover:bg-yellow-600`}
                to={filterURL({ price: 'all', page: 1 })}
              >
                Any
              </Link>
            </li>
            {prices.map((price) => (
              <li className='text-xl font-bold' key={price.value}>
                <Link
                  className={`block ${
                    priceQuery.toLocaleLowerCase() === price.value
                      ? 'bg-yellow-600'
                      : 'bg-yellow-500'
                  } py-2 px-3 rounded-lg mb-2 hover:bg-yellow-600`}
                  to={filterURL({ price: price.value, page: 1 })}
                >
                  {price.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* AvgCustomer Review */}
        <div>
          <h4 className='text-3xl font-bold mb-3'>Average Review</h4>
          <ul>
            {ratings.map((rating) => (
              <li key={rating.rating}>
                <Link
                  to={filterURL({ rating: String(rating.rating), page: 1 })}
                >
                  <Rating
                    reviews={{ rating: rating.rating }}
                    isShowLength={false}
                    caption={rating.name}
                    className='parent mb-3 cursor-pointer text-xl'
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='product_bar flex-1 bg-white rounded-lg p-5'>
        <div className='top flex-col md:flex-row flex gap-5 md:gap-0  justify-between'>
          <div className='filtered flex flex-wrap gap-5'>
            <span className='text-xl font-bold bg-gray-700 text-white inline-bold py-3 px-3 rounded-lg '>
              1 Result
            </span>
            {filteredResult?.map((result) => (
              <span
                key={result.query}
                className='font-bold text-xl bg-yellow-300 inline-block rounded-lg  p-3 '
              >
                {result.value}
                <span
                  onClick={() => removeFilteredResult(result.query)}
                  className='font-bold bg-gray-700 text-white hover:text-yellow-500 cursor-pointer ml-2 w-7 h-7 text-center rounded-full inline-block'
                >
                  <i className='fa-sharp fa-solid fa-xmark'></i>
                </span>
              </span>
            ))}
          </div>
          <div className='sorting'>
            {/* Filtered Result */}
            <div className='relative rounded-md shadow-sm'>
              <select
                defaultValue='Newest'
                className='form-input py-2 px-3 rounded-md text-lg leading-5 bg-white border-gray-300 focus:outline-none focus:shadow-outline-blue-300'
                onChange={(e) =>
                  navigate(
                    filterURL({
                      sort: e.target.value.toLocaleLowerCase(),
                      page: 1,
                    }),
                    { replace: true }
                  )
                }
              >
                <option value='newest'>Newest</option>
                <option value='lowest'>Price: Low to High</option>
                <option value='highest'>Price: High to Low</option>
                <option value='toprated'>Average Reviews</option>
              </select>
            </div>
          </div>
        </div>
        {/* Products */}
        {data?.data?.length ? (
          <>
            <div className='box-content mt-5'>
              <div className='flex flex-wrap '>
                {data?.data?.map(
                  ({
                    price,
                    image,
                    reviews,
                    name,
                    stock,
                    slug,
                    avgRating,
                    _id,
                  }) => (
                    <div key={_id} className='w-full md:w-60 m-5'>
                      <Product
                        product={{
                          _id: _id,
                          price: price,
                          name: name,
                          reviews: {
                            rating: avgRating,
                            numberOfReviews: reviews.length,
                          },
                          stock: stock,
                          image: image,
                          slug: slug,
                        }}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              {!(Array(data?.pagination?.pages).length === 1) && (
                <ul className='flex justify-start '>
                  {Array(data?.pagination?.pages)
                    .fill(data?.pagination?.pages)
                    .map((_item, index) => {
                      index = index + 1;
                      return (
                        <Link
                          className={`${
                            Number(page) === index
                              ? 'bg-green-500'
                              : 'bg-green-100'
                          } m-2 py-2 font-bold px-4 rounded-lg cursor-pointer`}
                          key={index}
                          to={filterURL({ page: index })}
                        >
                          {index}
                        </Link>
                      );
                    })}
                </ul>
              )}
            </div>
          </>
        ) : data?.data?.length === 0 ? (
          <div className='mt-9'>
            <MessageBox message='No product found!' />
          </div>
        ) : (
          loading && (
            <h2 className='text-2xl text-center mt-3 font-bold'>Loading...</h2>
          )
        )}
      </div>
    </section>
  );
};

export default Search;
