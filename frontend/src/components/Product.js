import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import Rating from './Rating';
import { Store } from "../Store"
import axios from "axios"
const Product = ({ product }) => {
    const { state: { cart: { cartItems } }, dispatch } = useContext(Store)

    const updateAddToCart = async (product) => {
        const existProduct = cartItems.find(item => item._id === product._id)
        const quantity = existProduct ? existProduct.quantity + 1 : 1
        const { data } = await axios.get(`/api/product/${product._id}`)
        if (data.countInStock < quantity) {
            console.log(data.countInStock, quantity)
            window.alert("Product Out of Stock!");
            return;
        }
        dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } })
    }
    return (
        <Col md={3}>
            <Card>
                <Link to={`product/${product.slug}`}>
                    <Card.Img variant="top" src={`${product.image}`} alt={product.name} />
                </Link>
                <Card.Body>
                    <Link to={`product/${product.slug}`}>
                        <Card.Title><h3>{product.name}</h3></Card.Title>
                    </Link>
                    <p>{product.numReviews}</p>
                    <p>${product.price}</p>
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                    <p>{product.countInStock !== 0 ? <button onClick={() => updateAddToCart(product)} className='btn-warning btn mt-2 py-2 px-3'>Add To Cart</button> : <button className='btn' disabled={true}>Out Of Stock </button>}</p>
                </Card.Body>
            </Card>

        </Col>
    );
};

export default Product;