import { lazy, useEffect, useReducer, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/MessageBox';
import Rating from '../components/Rating';
import axios from '../utils/axios';
import formateError from '../utils/formateError';
import { Helmet } from 'react-helmet-async';
import useCheckPdQuantity from '../Hooks/useCheckPdQuantity.js';
import ProductDetailsSkeleton from '../Skeleton/ProductDetailsSkeleton';
import flashMessage from '../utils/flashMessage';
import Button from '../components/Button/Button';
import useFetch from '../Hooks/useFetch';
const Star = lazy(() => import('../components/Star/Star'));

const initialState = {
  loading: false,
  error: '',
  product: {},
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'REQUEST':
      return { ...state, loading: true };
    case 'SUCCESS':
      return { ...state, loading: false, product: payload };
    case 'FAIL':
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
const ProductDetails = () => {
  const [options, setOptions] = useState({
    url: '/reviews',
    options: {
      method: null,
      private: true,
      body: null,
    },
  });
  const { data, error: reviewError } = useFetch(options);
  const [ratingCount, setRatingCount] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const navigate = useNavigate();
  const { handelAddToCart } = useCheckPdQuantity();
  const { slug } = useParams();
  const [{ loading, error, product }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // Rating Count Handler
  const reviewSubmit = () => {
    if (reviewText || ratingCount) {
      setOptions({
        url: '/reviews',
        options: {
          method: 'post',
          private: true,
          body: {
            ...(reviewText && { text: reviewText }),
            ...(ratingCount !== 0 && { rating: ratingCount }),
            product: product._id,
          },
        },
      });
    }
    if (data?.data?._id) {
      setReviewText('');
    }
    if (reviewError) {
      flashMessage({ type: 'error', text: 'You have a review already!' });
    }
  };
  const handleCart = async () => {
    try {
      await handelAddToCart(product, { increase: true });
      navigate('/cart');
    } catch (err) {
      flashMessage({ type: 'error', text: formateError(err) });
    }
  };

  useEffect(() => {
    let isMount = true;
    dispatch({ type: 'REQUEST' });
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`/products/slug/${slug}`);
        dispatch({ type: 'SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FAIL', payload: formateError(err) });
      }
    };
    if (isMount) {
      fetchData();
    }
    if (reviewError) {
      flashMessage({ type: 'error', text: 'You have a review already!' });
    }
    if (data?.data?._id) {
      dispatch({ type: 'SUCCESS', payload: data?.data });
    }

    return () => {
      isMount = false;
    };
  }, [slug, data, reviewError]);

  return loading ? (
    <ProductDetailsSkeleton />
  ) : error ? (
    <ErrorMessage error={error} />
  ) : (
    <div className='container mx-auto'>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div className='grid md:grid-cols-2 justify-center mt-12'>
        <div>
          <img
            className='w-full rounded-lg'
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className='wrapper'>
          {/* Product details */}
          <div className='grid lg:grid-cols-2 sm:grid-cols-1 p-5  bg-white ml-3 rounded-lg'>
            <div className='left-side'>
              <h3 className='md:text-5xl text-3xl font-bold mb-5'>
                {product.name}
              </h3>
              <hr />
              <div className='my-3'>
                <Rating
                  reviews={{
                    rating: product.avgRating,
                    numberOfReviews: product?.reviews?.length,
                  }}
                />
              </div>
              <hr />
              <p className='font-bold my-3'>Price : ${product.price}</p>
              <hr className='mb-3' />
              <p className='font-bold'>Description : {product.description}</p>
            </div>
            <div className='right-side p-5 lg:h-2/6 h-6/6'>
              <div>
                <div className='price font-bold text-left my-5'>
                  <span>
                    <span>Price : </span>
                    <span className='py-3 px-4 rounded-lg'>
                      ${product.price}
                    </span>
                  </span>
                </div>
                <div className='font-bold'>
                  <span>
                    {product.stock > 0 ? (
                      <>
                        <div>
                          <span>Status : </span>
                          <button
                            disabled
                            className='bg-green-300 p-1 my-1 md:px-3 md:py-2 text-white rounded-lg'
                          >
                            In Stock
                          </button>
                        </div>
                        <button
                          onClick={handleCart}
                          className='bg-yellow-500 py-3 px-4 rounded-lg'
                        >
                          Add To Cart
                        </button>
                      </>
                    ) : (
                      <>
                        <span>Status : </span>
                        <button
                          disabled
                          className='bg-red-500 p-1 mt-1 md:px-3 md:py-2 text-white rounded-lg'
                        >
                          Out of stock
                        </button>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Give rating */}
          <div className='bg-white md:ml-3 mt-3 p-5 rounded-lg'>
            {/* Reviews box and rating */}
            <textarea
              className='border-gray-700 border w-full rounded-lg p-3'
              cols='30'
              rows='5'
              placeholder='Give your reviews 🥰'
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <div className='flex items-center gap-3'>
              <Star onChange={(rating) => setRatingCount(rating)} />
              {ratingCount !== 0 && (
                <span className='font bold '>{ratingCount} Star</span>
              )}
            </div>
            <Button text='Submit' onClick={reviewSubmit} />
            <hr className='my-3' />
            {data?.data?.length === 0 && (
              <h3 className='text-red-500 text-center'>No reviews!</h3>
            )}

            {product?.reviews?.map((review, index) => {
              return (
                <div key={index}>
                  <div className='flex items-center gap-3 my-3'>
                    <img
                      src={review?.user?.image?.url}
                      alt={review?.user?.name}
                      className='w-16 h-16 bg-gray-600 rounded-full'
                    />
                    <span className='text-xl font-bold '>
                      {review?.user?.name}
                    </span>
                  </div>
                  <div className='ml-5'>
                    <div className='flex items-center gap-3 font-bold'>
                      {review?.rating && (
                        <Rating
                          reviews={{
                            rating: review.rating,
                          }}
                          isShowLength={false}
                        />
                      )}

                      <span>{review.rating}</span>
                    </div>
                    <p className='font-bold'>{review.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
