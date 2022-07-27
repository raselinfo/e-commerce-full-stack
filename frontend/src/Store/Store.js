import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};
const reducer = (state, { type, payload = {} }) => {
  switch (type) {
    case "ADD_TO_CART":
      const isExistItem = state.cart.cartItems.find(
        (item) => item._id === payload._id
      );

      let newItems;
      if (!isExistItem) {
        newItems = [...state.cart.cartItems, payload];
      } else {
        newItems = state.cart.cartItems.map((item) => {
          if (item._id === payload._id) {
            item.quantity = payload.quantity;
          }
          return item;
        });
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: newItems,
        },
      };
    default:
      return state;
  }
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};

export default StoreProvider;
