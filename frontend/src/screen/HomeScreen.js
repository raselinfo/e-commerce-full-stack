import React, { useEffect, useReducer } from 'react';
import axios from "axios"
import Product from '../components/Product';
import { Row } from "react-bootstrap"
import Loading from '../components/Loading';
const initialState = {
    products: [],
    loading: true,
    error: ""
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, products: payload }
        case "FETCH_FAIL":
            return { ...state, loading: false, error: payload }
        default:
            return state
    }
}

const HomeScreen = () => {
    const [{ products, loading, error }, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        dispatch({ type: 'FETCH_REQUEST' })
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/product')
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: "Something Went Wrong!" })
            }
        }

        fetchData()
    }, [])
    return (
        <section>
            <h1>Featured Products</h1>
            <div className="products">
                <Row>

                    {
                        loading ? <Loading /> :
                            error ? <div>${error}</div> :
                                products.map(product => {
                                    return <Product key={product.slug} product={product} />
                                })

                    }
                </Row>
            </div>
        </section>
    );
};

export default HomeScreen;