import React from 'react';
import data from "../data"
import { Link } from "react-router-dom"

const HomeScreen = () => {


    return (
        <section>
            <div className='container'>
                <h1>Featured Products</h1>
                <div className="products">
                    <div className="row">
                        {data.products.map(product => {
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