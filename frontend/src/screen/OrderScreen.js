import React, { useReducer, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from "react-router-dom"
import Loading from "../components/Loading"
import MessageBox from "../components/MessageBox"
import { Store } from '../Store';
import axios from "axios"
import handleError from "../utils"
import { Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { toast } from 'react-toastify';
const initialValue = {
    loading: true,
    error: "",
    order: {},
    successPay: false,
    loadingPay: false
}
const reducer = (state, { payload, type }) => {
    switch (type) {
        case "REQUEST":
            return { ...state, loading: true }
        case "SUCCESS":
            return { ...state, loading: false, order: payload }
        case "FAIL":
            return { ...state, error: payload, loading: false }
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
    const { id } = useParams()
    const [{ error, loading, order, successPay, loadingPay }, dispatch] = useReducer(reducer, initialValue)
    const { state: { userInfo
    }, dispatch: ctxDispatch } = useContext(Store)
    const navigate = useNavigate()
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
    // Create order
    const createOrder = (data, action) => {
        return action.order.create({
            purchase_units: [{
                amount: { value: order.totalPrice }
            }]
        }).then((orderId) => orderId)
    }
    // On Approve
    const onApprove = (data, action) => {
        return action.order.capture().then(async (details) => {
            try {
                dispatch({ type: "PAY_REQUEST" });
                const { data } = await axios.put(`/api/orders/${id}/pay`, details, {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                dispatch({ type: 'PAY_SUCCESS', payload: data })
                toast.success("Order is Paid")
            } catch (err) {
                dispatch({ type: "PAY_FAIL", payload: handleError(err) })
                toast.error(handleError(err))
            }
        })
    }
    // OnError
    const onError = (err) => {
        toast.error(handleError(err))
    }
    useEffect(() => {
        if (!userInfo) {
            navigate(`/signin?redirect=/order/${id}`)
        }
        async function fetchOrder() {
            try {
                dispatch({ type: "REQUEST" })
                const { data } = await axios.get(`/api/orders/${id}`, {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                console.log(data)
                dispatch({ type: "SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: "FAIL", payload: handleError(err) })
                console.log(err)
            }
        }
        if (!order._id || successPay || (order._id && order._id !== id)) {
            fetchOrder()
            if (successPay) {
                dispatch({ type: "PAY_RESET" })
            }
        } else {
            const loadPaypalScript = async () => {
                const { data: clientId } = await axios.get('/api/key/paypal', {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                        'client-id': clientId,
                        currency: "USD"
                    }
                })
                paypalDispatch({
                    type: "setLoadingStatus",
                    value: "pending"
                })
            }
            loadPaypalScript()
        }
    }, [userInfo, id, order, navigate, paypalDispatch, successPay])


    return (
        <div>
            <Helmet>
                <title>Order</title>
            </Helmet>
            {
                loading ? <Loading /> : error ? <MessageBox /> : (
                    <section>
                        <h2>Order : {id}</h2>
                        <Row>
                            <Col md={8}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            <Card.Text>
                                                <strong>Name :</strong> {order.shippingAddress.fullName} <br />
                                                <strong>Address :</strong> {order.shippingAddress.address} {order.shippingAddress.city} {order.shippingAddress.postalCode} {order.shippingAddress.country}<br />
                                            </Card.Text>
                                            {
                                                order.isDelivered ? <MessageBox variant="success">
                                                    Deliver At {order.deliveredAt}
                                                </MessageBox> : <MessageBox variant="danger">
                                                    Not Delivered
                                                </MessageBox>
                                            }
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Payment</Card.Title>
                                        <Card.Text>
                                            <strong>Method: </strong> {order.paymentMethod}
                                        </Card.Text>
                                        {order.isPaid ? <MessageBox variant="success">
                                            Paid At {order.paidAt}
                                        </MessageBox> : <MessageBox variant="danger" >
                                            Not Paid
                                        </MessageBox>}
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            Items
                                        </Card.Title>
                                        <ListGroup>
                                            {order.orderItems.map(item => {
                                                return <ListGroup.Item key={item._id}>
                                                    <Row className="align-item-center">
                                                        <Col md={6}>
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="img-fluid rounded img-thumbnail"
                                                            />
                                                            <Link to={`/product/${item.slug}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={3}><span>{item.quantity}</span></Col>
                                                        <Col md={3}><span>{item.price}</span></Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            })}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Order Summary</Card.Title>
                                        <ListGroup>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Items</Col>
                                                    <Col>{order.itemsPrice.toFixed(2)}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Shipping</Col>
                                                    <Col>{order.shippingPrice.toFixed(2)}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Tax</Col>
                                                    <Col>{order.taxPrice.toFixed(2)}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        <strong>Total</strong>
                                                    </Col>
                                                    <Col>{order.totalPrice.toFixed(2)}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {
                                                !order.isPaid && (
                                                    <ListGroup.Item>
                                                        {
                                                            isPending ? (
                                                                <Loading />
                                                            ) : (
                                                                <div>
                                                                    <PayPalButtons
                                                                        createOrder={createOrder}
                                                                        onApprove={onApprove}
                                                                        onError={onError}
                                                                    >

                                                                    </PayPalButtons>
                                                                </div>
                                                            )
                                                        }
                                                        {loadingPay && <Loading />}
                                                    </ListGroup.Item>
                                                )
                                            }
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </section>

                )
            }
        </div >

    );
};

export default OrderScreen;