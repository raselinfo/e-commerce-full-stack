import React, { useContext } from 'react';
import { Helmet } from "react-helmet-async"
import { Store } from "../Store"
import { Row, Col, ListGroup, Button, Card } from "react-bootstrap"
import MessageBox from "../components/MessageBox"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const CartScreen = () => {
    const navigate = useNavigate()
    const { state: { cart: { cartItems } }, dispatch } = useContext(Store)
    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/product/${item._id}`)
        
        if (data.countInStock < quantity) {
            window.alert("Sorry, Product is out of stock!");
            return;
        }
        dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } })
    }

    const handleDeleteItem = (item) => {
        dispatch({ type: "DELETE_PRODUCT", payload: item })
    }

    const handleCheckout = () => {
        navigate('/signin?redirect=/shipping')
    }

    return (
        <>
            <Helmet>
                <title>Cart Page</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {
                        cartItems.length === 0 ?
                            (<MessageBox variant="danger">
                                Cart is Empty. <Link to="/">Go Shopping</Link>
                            </MessageBox>) :
                            <ListGroup>
                                {
                                    cartItems.map(item => (
                                        <ListGroup.Item key={item._id}>
                                            <Row className="align-items-center">
                                                <Col md={4}>
                                                    <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail" />
                                                    <Link to={`/ product / ${item.slug}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={3}>
                                                    <Button variant="light" disabled={item.quantity === 1}
                                                        onClick={() => updateCartHandler(item, item.quantity - 1)}
                                                    >
                                                        <i className="fa-solid fa-circle-minus"></i>
                                                    </Button>
                                                    <span>{item.quantity}</span>
                                                    <Button variant="light" disabled={item.quantity === item.countStock}
                                                        onClick={() => updateCartHandler(item, item.quantity + 1)}
                                                    >
                                                        <i className="fa-solid fa-circle-plus"></i>
                                                    </Button>
                                                </Col>
                                                <Col md={3}>{item.price}</Col>
                                                <Col md={2}>
                                                    <Button variant="light" disabled={item.quantity === 1}
                                                        onClick={() => handleDeleteItem(item)}
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flash">
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal ({cartItems.reduce((acc, item) => acc += item.quantity, 0)}) : {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button type="button" variant="primary" disabled={cartItems.length === 0}
                                            onClick={handleCheckout}
                                        >Process to Checkout </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CartScreen;