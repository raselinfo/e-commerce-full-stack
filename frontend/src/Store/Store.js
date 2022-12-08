import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shipping_address: localStorage.getItem("shipping_address")
      ? JSON.parse(localStorage.getItem("shipping_address"))
      : {},
    payment_method: localStorage.getItem("payment_method")
      ? localStorage.getItem("payment_method")
      : "",
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
      console.log(payload)
      localStorage.setItem("userInfo", JSON.stringify(payload));
      return { ...state, userInfo: payload };

    case "SIGN_OUT":
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shipping_address");
      localStorage.removeItem("payment_method");
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [],
          shipping_address: {},
          payment_method: "",
        },
        userInfo: {},
      };

    case "SAVE_ADDRESS":
      localStorage.setItem("shipping_address", JSON.stringify(payload));
      return {
        ...state,
        cart: { ...state.cart, shipping_address: payload },
      };
    case "SAVE_PAYMENT_METHOD":
      localStorage.setItem("payment_method", payload);
      return {
        ...state,
        cart: { ...state.cart, payment_method: payload },
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
