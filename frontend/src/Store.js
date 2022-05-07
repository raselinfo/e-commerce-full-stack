import { createContext, useReducer } from "react"

export const Store = createContext()
const initialState = {
    cart: {
        cartItems: []
    }
}
const reducer = (state, { type, payload }) => {
    switch (type) {
        case "ADD_TO_CART":
            return { ...state, cart: { ...state.cart, cartItems: [...state.cart.cartItems, payload] } }
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