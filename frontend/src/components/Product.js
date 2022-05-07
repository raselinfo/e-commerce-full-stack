import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import Rating from './Rating';
const Product = ({ product }) => {
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
                    <Rating rating={product.rating} numReviews={product.numReviews}/>
                    <p>{product.countInStock && <button className='btn-primary py-2 px-3'>Add To Cart</button>}</p>
                </Card.Body>
            </Card>
           
        </Col>
    );
};

export default Product;