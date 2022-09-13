import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {},
};
const reducer = (state, { type, payload = {} }) => {
  switch (type) {
    case "ADD_TO_CART": {
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
      localStorage.setItem("cartItems", JSON.stringify(newItems));

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: newItems,
        },
      };
    }
    case "REMOVE_TO_CART":
      const newItems = state.cart.cartItems.filter(
        (item) => item._id !== payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(newItems));
      return { ...state, cart: { ...state.cart, cartItems: newItems } };

    case "SAVE_USER":
      localStorage.setItem("userInfo", JSON.stringify(payload));
      return { ...state, userInfo: payload };

    case "SIGN_OUT":
      localStorage.removeItem("userInfo");
      return { ...state, cart: { ...state.cart }, userInfo: {} };

    case "SAVE_ADDRESS":
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const updatedUser = { ...userInfo, address_details: { ...payload } };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      return {
        ...state,
        cart: { ...state.cart },
        userInfo: updatedUser,
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
