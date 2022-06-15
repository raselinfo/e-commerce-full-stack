import React, { useReducer, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Helmet } from "react-helmet-async"
import Loading from "../components/Loading"
import MessageBox from "../components/MessageBox"
import { Store } from "../Store"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import handleError from "../utils"
const initialState = {
    loading: false,
    error: "",
    orders: []
}
const reducer = (state, { type, payload }) => {
    switch (type) {
        case "REQUEST":
            return { ...state, loading: true }
        case "SUCCESS":
            return { ...state, orders: payload, loading: false }
        case "FAIL":
            return { ...state, loading: false, error: payload }
        default:
            return state
    }
}
const OrderHistoryScreen = () => {
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, initialState)
    const { state: { userInfo }, dispatch: ctxDispatch } = useContext(Store)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "REQUEST" })
                const { data } = await axios.get(`/api/orders/mine`, {
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
            navigate("/signin?redirect=/orderhistory")
        } else {
            fetchData()
        }
    }, [navigate, userInfo])
    return (
        <>
            <Helmet>
                <title>Order History</title>
            </Helmet>
            <h1>Order History</h1>
            {
                loading ? <Loading /> : error ? <MessageBox /> : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                return <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                    <td>
                                        {order.isDelivered
                                            ? order.deliveredAt.substring(0, 10)
                                            : 'No'}
                                    </td>
                                    <td>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() => {
                                                navigate(`/order/${order._id}`);
                                            }}
                                        >
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                )
            }
        </>
    );
};

export default OrderHistoryScreen;