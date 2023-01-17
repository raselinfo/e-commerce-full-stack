import { lazy } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
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
    name: '1stars & up',
    rating: 0,
  },
];
const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];
const Search = () => {
  return (
    <section className='flex-col lg:flex-row  flex container mx-auto mt-5'>
      <div className='filtered_bar bg-white mb-5 lg:mb-0 p-5 rounded-lg flex-2 mr-3'>
        {/* Department */}
        <div>
          <h4 className='text-3xl font-bold mb-3'>Department</h4>
          <ul className='text-center'>
            <li className='text-xl font-bold'>
              <Link
                className='block bg-yellow-500 py-2 px-3 rounded-lg mb-2 hover:bg-yellow-600'
                to={`/search?category=pant`}
              >
                <i class='fa-solid fa-cart-flatbed'></i> Any
              </Link>
            </li>
            <li className='text-xl font-bold'>
              <Link
                className='block bg-yellow-500 py-2 px-3 rounded-lg mb-2 hover:bg-yellow-600'
                to={`/search?category=pant`}
              >
                <i class='fa-solid fa-cart-flatbed'></i> Pant
              </Link>
            </li>
            <li className='text-xl font-bold'>
              <Link
                className='block bg-yellow-500 py-2 px-3 rounded-lg mb-2 hover:bg-yellow-600'
                to={`/search?category=pant`}
              >
                <i class='fa-solid fa-cart-flatbed'></i> Pant
              </Link>
            </li>
          </ul>
        </div>
        {/* Price */}
        <div className='my-3'>
          <h4 className='text-3xl font-bold mb-3'>Price</h4>
          <ul className='text-center'>
            <li className='text-xl font-bold'>
              <Link
                className='block bg-yellow-500 py-2 px-3 rounded-lg mb-2 hover:bg-yellow-600'
                to={`/search?price=any`}
              >
                Any
              </Link>
            </li>
            {prices.map((price) => (
              <li className='text-xl font-bold' key={price.value}>
                <Link
                  className='block bg-yellow-500 py-2 px-3 rounded-lg mb-2 hover:bg-yellow-600'
                  to={`/search?price=${price.value}`}
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
                <Link to={`/search?rating=${rating.rating}`}>
                  <Rating
                    reviews={[rating]}
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
            <span className='font-bold text-xl bg-yellow-300 inline-block rounded-lg  p-3 '>
              51-200{' '}
              <span className='font-bold bg-gray-700 text-white hover:text-yellow-500 cursor-pointer ml-2 w-7 h-7 text-center rounded-full inline-block'>
                <i class='fa-sharp fa-solid fa-xmark'></i>
              </span>
            </span>
            <span className='font-bold text-xl bg-yellow-300 inline-block rounded-lg p-3 '>
              51-200
              <span className='font-bold bg-gray-700 text-white hover:text-yellow-500 cursor-pointer ml-2 w-7 h-7 text-center rounded-full inline-block'>
                <i class='fa-sharp fa-solid fa-xmark'></i>
              </span>
            </span>
          </div>
          <div className='sorting'>
            {/* Filtered Result */}
            <div class='relative rounded-md shadow-sm'>
              <select class='form-input py-2 px-3 rounded-md text-lg leading-5 bg-white border-gray-300 focus:outline-none focus:shadow-outline-blue-300'>
                <option value='newest' selected>
                  Newest
                </option>
                <option value='lowest'>Price: Low to High</option>
                <option value='highest'>Price: High to Low</option>
                <option value='toprated'>Average Reviews</option>
              </select>
            </div>
          </div>
        </div>
        {/* Products */}
        <div className='box-content mt-5'>
          <div className='flex flex-wrap '>
            <div className='w-full md:w-60 m-5'>
              <Product
                product={{
                  price: 65,
                  name: 'Puma Fit Pant',
                  reviews: [{ rating: 2.5, text: 'Bad Product' }],
                  stock: 5,
                  image:
                    'https://res.cloudinary.com/dg2k9rn0q/image/upload/v1658327165/p3_iuf1q4.jpg',
                }}
              />
            </div>
            <div className='w-full md:w-60 m-5'>
              <Product
                product={{
                  price: 65,
                  name: 'Puma Fit Pant',
                  reviews: [{ rating: 2.5, text: 'Bad Product' }],
                  stock: 5,
                  image:
                    'https://res.cloudinary.com/dg2k9rn0q/image/upload/v1658327165/p3_iuf1q4.jpg',
                }}
              />
            </div>
            <div className='w-full md:w-60 m-5'>
              <Product
                product={{
                  price: 65,
                  name: 'Puma Fit Pant',
                  reviews: [{ rating: 2.5, text: 'Bad Product' }],
                  stock: 5,
                  image:
                    'https://res.cloudinary.com/dg2k9rn0q/image/upload/v1658327165/p3_iuf1q4.jpg',
                }}
              />
            </div>
            <div className='w-full md:w-60 m-5'>
              <Product
                product={{
                  price: 65,
                  name: 'Puma Fit Pant',
                  reviews: [{ rating: 2.5, text: 'Bad Product' }],
                  stock: 5,
                  image:
                    'https://res.cloudinary.com/dg2k9rn0q/image/upload/v1658327165/p3_iuf1q4.jpg',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
