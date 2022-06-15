import React, { useReducer, useEffect, useContext } from 'react';
import Loading from "../components/Loading"
import MessageBox from "../components/MessageBox"
import { useParams, useNavigate, Link } from "react-router-dom"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { Helmet } from "react-helmet-async"
import axios from "axios"
import { Store } from "../Store"
import handleError from "../utils"
import { toast, ToastContainer } from "react-toastify"
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
const initialState = {
    loading: false,
    error: "",
    order: null,
    successPay: false,
    loadingPay: false
}
const reducer = (state, { type, payload }) => {
    switch (type) {
        case "REQUEST":
            return { ...state, loading: true }
        case "SUCCESS":
            return { ...state, loading: false, order: payload }
        case "FAIL":
            return { ...state, loading: false, error: payload }
        case "PAY_REQUEST":
            return { ...state, loadingPay: true }
        case "PAY_SUCCESS":
            return { ...state, loadingPay: false, successPay: true }
        case "PAY_FAIL":
            return { ...state, loadingPay: false }
        case "PAY_RESET":
            return { ...state, loadingPay: false, successPay: false }
        default:
            return state
    }
}

const OrderScreen = () => {

    const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(reducer, initialState)
    const { id: orderId } = useParams()
    const { state: { userInfo }, dispatch: ctxDispatch } = useContext(Store)
    const navigate = useNavigate()
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: order.totalPrice },
                    },
                ],
            })
            .then((orderID) => {
                return orderID;
            });
    }
    const onApprove = (data, actions) => {
        return actions.order.capture()
            .then(async (details) => {
                try {
                    console.log("Inside")

                    dispatch({ type: "PAY_REQUEST" })
                    const { data } = await axios.put(`/api/orders/${order._id}/pay`, details, {

                        headers: {
                            authorization: `Bearer ${userInfo.token}`
                        }
                    })
                    dispatch({ type: "PAY_SUCCESS" })
                    toast.success("Order is paid")
                }
                catch (err) {
                    dispatch({ type: "PAY_FAIL", payload: handleError(err) })
                    toast.error(handleError(err))
                }
            });
    }
    const onError = (error) => {
        toast.error(handleError(error))
        console.log(handleError(error))
    }

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ tyep: "REQUEST" })
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                dispatch({ type: "SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: "FAIL", payload: handleError(err) })
            }
        }
        if (!userInfo) {
            navigate("/signin")
        }
        if (!order?._id || successPay || order?._id !== orderId) {
            fetchOrder()
            if (successPay) {
                dispatch({ type: "PAY_REST" })
            }
        } else {
            const loadPaypalScript = async () => {
                const { data: clientId } = await axios(`http://localhost:4000/api/key/paypal`, {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                        "client-id": clientId,
                        currency: "USD",
                    },
                })

                paypalDispatch({ type: "setLoadingStatus", value: "pending" })
            }
            loadPaypalScript()
        }

    }, [orderId, userInfo, order, navigate, paypalDispatch, successPay])

    return loading ? (
        <Loading></Loading>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div className="mb-5">
            <Helmet>
                <title>Order {orderId}</title>
            </Helmet>
            <ToastContainer />
            <h1 className="my-3">Order {orderId}</h1>
            {
                order && (<Row>
                    <Col md={8}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Shipping</Card.Title>
                                <Card.Text>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Address: </strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                    ,{order.shippingAddress.country}
                                </Card.Text>
                                {order.isDelivered ? (
                                    <MessageBox variant="success">
                                        Delivered at {order.deliveredAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Not Delivered</MessageBox>
                                )}
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Payment</Card.Title>
                                <Card.Text>
                                    <strong>Method:</strong> {order.paymentMethod}
                                </Card.Text>
                                {order.isPaid ? (
                                    <MessageBox variant="success">
                                        Paid at {order.paidAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">Not Paid</MessageBox>
                                )}
                            </Card.Body>
                        </Card>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Items</Card.Title>
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row className="align-items-center">
                                                <Col md={6}>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="img-fluid rounded img-thumbnail"
                                                    ></img>{' '}
                                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={3}>
                                                    <span>{item.quantity}</span>
                                                </Col>
                                                <Col md={3}>${item.price}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Order Summary</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice.toFixed(2)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <strong> Order Total</strong>
                                            </Col>
                                            <Col>
                                                <strong>${order.totalPrice.toFixed(2)}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!order.isPaid &&
                                        <ListGroup.Item>
                                            {isPending ? <Loading /> :
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                ></PayPalButtons>}
                                        </ListGroup.Item>
                                    }
                                    {
                                        loadingPay && <Loading />
                                    }
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>)
            }

        </div>
    )
};

export default OrderScreen;