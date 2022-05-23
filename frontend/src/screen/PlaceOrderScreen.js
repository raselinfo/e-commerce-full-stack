import React, { useContext, useEffect } from 'react';
import CheckOutSteps from "../components/CheckOutSteps"
import { Helmet } from "react-helmet-async"
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { Store } from '../Store';
import { Link, useNavigate } from "react-router-dom"
const PlaceOrderScreen = () => {
    const { state: { cart }, dispatch } = useContext(Store)
    const navigate = useNavigate()
    const placeOrderHandle = () => {
        console.log("hello");
    }
    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate("/payment")
        }
    }, [cart, navigate])
    return (
        <div className="mb-5">
            <Helmet >
                <title>Place Order</title>
            </Helmet>
            <CheckOutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name : </strong>{cart.shippingAddress.fullName}<br />
                                <strong>Address : </strong>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}<br />
                            </Card.Text>
                            <Link to="/shipping">Edit</Link>
                        </Card.Body>

                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method: </strong> {cart.paymentMethod}
                            </Card.Text>
                            <Link to="/payment">Edit</Link>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            {cart.cartItems.map((item, index) => {
                                return <Row key={index}>
                                    <Col md={4} className="d-flex">
                                        <img className='img-fluid' src={item.image} alt={item.name} />
                                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.quantity}
                                    </Col>
                                    <Col md={4}>
                                        {item.price}
                                    </Col>
                                </Row>
                            })}
                        </Card.Body>
                        <Link to="/cart">Edit</Link>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <ListGroup variant="flash">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${cart.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${cart.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${cart.textPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${cart.totalPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button type='button'
                                        onClick={placeOrderHandle}
                                        disabled={cart.cartItems.length === 0}
                                    >
                                        Place Order
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PlaceOrderScreen;