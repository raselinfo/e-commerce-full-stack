import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, Form } from "react-bootstrap"
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios"
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import handleError from '../utils';
const SignInScreen = () => {
    const { state: { userInfo }, dispatch } = useContext(Store)
    const navigate = useNavigate()
    const { search } = useLocation()
    const redireactURL = new URLSearchParams(search).get('redirect')
    const redirect = redireactURL ? redireactURL : '/'
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/api/user/signin", {
                email, password
            })
            dispatch({ type: "USER_SIGNIN", payload: data })
            localStorage.setItem("userInfo", JSON.stringify(data))
            navigate(redirect || "/")
        } catch (err) {
            toast.error(handleError(err), {
                theme: "colored",
            });
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])



    return (
        <section>
            <ToastContainer
                position="bottom-center"
                limit={1}
            />
            <Helmet>
                <title>Sign In  </title>
            </Helmet>
            <Container >
                <div className="py-5">
                    <h1>Sign in </h1>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" className="bnt btn-warning mt-3">Sin In</Button>
                        <br />
                        <p>New Customer? <Link to={`/signup?redirect=${redirect}`}>Create Your Account</Link></p>
                    </Form>
                </div>
            </Container>
        </section>
    );
};

export default SignInScreen;