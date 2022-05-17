import { createContext, useReducer } from "react"

export const Store = createContext()
const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    },
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
}
const reducer = (state, { type, payload }) => {
    switch (type) {
        case "ADD_TO_CART":
            const newItem = payload
            const existItem = state.cart.cartItems.find(item => item._id === newItem._id)
            const cartItems = existItem ? state.cart.cartItems.map(item => item._id === existItem._id ? newItem : item) : [...state.cart.cartItems, newItem]
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }
        case "DELETE_PRODUCT": {
            const cartItems = state.cart.cartItems.filter(item => item._id !== payload._id)
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }
        }
        case "USER_SIGNIN": {
            return { ...state, userInfo: payload }
        }
        default:
            return state
    }
}

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <Store.Provider value={{ state, dispatch }}>
        {children}
    </Store.Provider>
}

export default StoreProvider