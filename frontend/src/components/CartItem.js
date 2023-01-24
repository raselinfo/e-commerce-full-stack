import { useContext } from 'react';
import { Link } from 'react-router-dom';
import useCheckPdQuantity from '../Hocks/useCheckPdQuantity';
import { Store } from '../Store/Store';
import flashMessage from '../utils/flashMessage';
const CartItem = ({ product }) => {
  const { dispatch } = useContext(Store);
  const { handelAddToCart } = useCheckPdQuantity();
  const decreaseProductCount = async () => {
    await handelAddToCart(product, { decrease: true, toastMsg: false });
  };
  const increaseProductCount = async () => {
    try {
      await handelAddToCart(product, { increase: true, toastMsg: false });
    } catch (err) {
      flashMessage({ text: err.message, type: 'error' });
    }
  };
  const handelRemoveToCart = () => {
    dispatch({ type: 'REMOVE_TO_CART', payload: product });
  };

  return (
    <div className='left bg-white rounded-lg mb-3 grid grid-cols-4 lg:grid-cols-5 items-center shadow-lg  p-3'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:col-span-2 gap-2'>
        <Link
          className='text-blue-500 font-bold'
          to={`/product/${product.slug}`}
        >
          <img
            className='w-20 inline-block'
            src={product.image}
            alt={product.name}
          />
        </Link>
        <Link
          className='text-blue-500 font-bold sm:text-2xl'
          to={`/product/${product.slug}`}
        >
          {product.name}
        </Link>
      </div>
      <div className='handleQuantity flex flex-col sm:flex-row items-center'>
        <button
          className={`bg-gray-100 py-2 px-3 cursor-pointer sm:text-2xl rounded-lg hover:bg-gray-200 transition-all ${
            (product.quantity === 1 || product.quantity < 1) &&
            'bg-gray-300 hover:bg-gray-300 text-gray-500'
          }`}
          disabled={(product.quantity === 1 || product.quantity < 1) && true}
          onClick={decreaseProductCount}
        >
          <i className='fa-solid fa-circle-minus'></i>
        </button>
        <span className='sm:text-2xl font-bold mx-2 select-none'>
          {product.quantity}
        </span>
        <button
          className={`bg-gray-100 py-2 px-3 cursor-pointer sm:text-2xl rounded-lg hover:bg-gray-200 transition-all ${
            product.quantity === product.stock &&
            'bg-gray-300 hover:bg-gray-300 text-gray-500'
          }`}
          disabled={product.quantity === product.stock && true}
          onClick={increaseProductCount}
        >
          <i className='fa-solid fa-circle-plus'></i>
        </button>
      </div>
      <div className='price'>
        <span className='sm:text-2xl font-bold mx-2 select-none'>
          💲{product.price}
        </span>
      </div>
      <div className='delete'>
        <button
          className='bg-gray-100 py-2 px-3 cursor-pointer sm:text-2xl rounded-lg hover:bg-gray-200 transition-all'
          onClick={handelRemoveToCart}
        >
          <i className='fa-solid fa-trash'></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
