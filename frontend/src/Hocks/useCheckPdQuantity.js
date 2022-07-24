import { useContext, useState } from "react";
import { Store } from "../Store/Store";
const useCheckPdQuantity = (pd) => {
  const [product, setProduct] = useState(pd);
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const existProduct = cart.cartItems.find((pd) => pd._id === product._id);
  const quantity = existProduct ? existProduct.quantity + 1 : 1;
  //  Todo: Check Stock in DB
  console.log(product)
  return { setProduct };
};
export default useCheckPdQuantity;
