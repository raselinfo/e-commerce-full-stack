import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import { Store } from '../Store';
import { ToastContainer, toast } from 'react-toastify';
const PaymentMethodScreen = () => {
    const { state: { cart: { shippingAddress, paymentMethod } }, dispatch } = useContext(Store)
    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || "")
    const navigate = useNavigate()
    useEffect(() => {   
        if (!shippingAddress.address) {
            navigate("/shipping")
        }
    }, [shippingAddress, navigate])

    const handleONSubmit = (e) => {
        e.preventDefault()
        if (!paymentMethodName) {
            return toast.warn("Please Select A Payment Method", {
                theme: "colored"
            })
        }
        dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName })
        localStorage.setItem("paymentMethod", paymentMethodName)
        navigate("/placeorder")
    }

    return (
        <>
            <Helmet>
                <title>Payment</title>
            </Helmet>
            <ToastContainer
                position="bottom-center"
                limit={1}
            />
            <CheckOutSteps step1 step2 step3 />
            <Form onSubmit={handleONSubmit}>
                <Form.Check
                    label="PayPal"
                    value="PayPal"
                    id="PayPal"
                    checked={paymentMethodName === "PayPal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Form.Check
                    label="Strip"
                    value="Strip"
                    id="Strip"
                    checked={paymentMethodName === "Strip"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Button type="submit">Continue</Button>
            </Form>
        </>
    );
};

export default PaymentMethodScreen;