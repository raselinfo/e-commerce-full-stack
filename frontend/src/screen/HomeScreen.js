import React, { useEffect, useReducer } from 'react';
import { Link } from "react-router-dom"
import axios from "axios"

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}

const HomeScreen = () => {
    const [{ loading, error, products }, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: ""
    })
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const result = await axios.get('/api/product')
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message })
            }
        }
        fetchData()
    }, [])

    return (
        <section>
            <div className='container'>
                <h1>Featured Products</h1>
                <div className="products">
                    <div className="row">
                        {loading && <h1>Loading.....</h1>}
                        {products.map(product => {
                            return <div className="col-md-3" key={product.slug}>
                                <Link to={`product/${product.slug}`}>
                                    <img src={`${product.image}`} alt={product.name} />
                                    <h3>{product.name}</h3>
                                </Link>

                                <p>{product.numReviews}</p>
                                <p>${product.price}</p>
                                <p>{product.countInStock && <button className='btn-warning py-2 px-3'>Add To Cart</button>}</p>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeScreen;