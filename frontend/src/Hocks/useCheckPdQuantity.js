import { useContext } from 'react';
import axios from '../utils/axios';
import formateError from '../utils/formateError';
import { Store } from '../Store/Store';
import { toast } from 'react-toastify';
const useCheckPdQuantity = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const fetchProduct = async (product, { increase }) => {
    if (product._id) {
      try {
        const existProduct = cart.cartItems.find(
          (pd) => pd._id === product._id
        );
        const quantity = existProduct
          ? increase
            ? existProduct.quantity + 1
            : existProduct.quantity - 1
          : 1;

        //  Todo: Check Stock in DB
        const {
          data: { data },
        } = await axios.get(`/products/_id/${product._id}`);
        if (data.stock < quantity) {
          const err = new Error('Product Out Of Stock!');
          err.state = 404;
          return { err };
        }
        dispatch({
          type: 'ADD_TO_CART',
          payload: { ...product, quantity },
        });
        return { success: true };
      } catch (err) {
        throw new Error(formateError(await err));
      }
    }
  };

  const handelAddToCart = async (pd, { increase = false, toastMsg = true }) => {
    try {
      const { success } = (await fetchProduct(pd, { increase })) || '';
      if (toastMsg && success) {
        toast.success('😃 Product Added To Cart', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }

      if (toastMsg && !success) {
        toast.error('😥 Product Out Of Stock!', {
          toastId: 'product_out_of_stock',
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (err) {
      toast.error(err.message, {
        toastId: 'product_out_of_stock',
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return { handelAddToCart };
};
export default useCheckPdQuantity;
