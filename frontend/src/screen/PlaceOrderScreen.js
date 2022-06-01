import React, { useContext, useEffect, useReducer } from 'react';
import CheckOutSteps from "../components/CheckOutSteps"
import { Helmet } from "react-helmet-async"
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { Store } from '../Store';
import { Link, useNavigate } from "react-router-dom"
import handleError from '../utils';
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import Loading from "../components/Loading"
const reducer = (state, { type }) => {
    switch (type) {
        case "REQUEST":
            return { ...state, loading: true }
        case "SUCCESS":
            return { ...state, loading: false }
        case "FAIL":
            return { ...state, loading: false }
        default:
            return state
    }
}
const PlaceOrderScreen = () => {
    const { state: { cart, userInfo }, dispatch: ctxDispatch } = useContext(Store)
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    })
    const navigate = useNavigate()

    const round = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    // Items Price
    cart.itemsPrice = round(
        cart.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    )
    // Shipping Price . shipping price 0 if itemsPrice getter than 100
    cart.shippingPrice = cart.itemsPrice > 100 ? round(0) : round(10)
    // Tax Price (50%)
    cart.taxPrice = round(0.15 * cart.itemsPrice)
    // Total Price
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

    const placeOrderHandle = async () => {
        dispatch({ type: "REQUEST" })
        try {
            let { data } = await axios.post('/api/orders',
                {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,

                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })


            dispatch({ type: "SUCCESS" })
            localStorage.removeItem('cartItems');
            ctxDispatch({ type: "CART_CLEAR" })
            navigate(`/order/${data.order._id}`);
        } catch (err) {
            dispatch({ type: "FAIL" })
            toast.error(handleError(err), {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
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
            <ToastContainer position='bottom-center' />
            <CheckOutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <h2 className='mt-3'>Preview Order</h2>
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
                                        <Col>Shipping</Col>
                                        <Col>${cart.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${cart.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Order Total</Col>
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
                                    {loading && <Loading />}
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