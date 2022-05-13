import React from 'react';
import { Button, Container, Form } from "react-bootstrap"
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
const SignInScreen = () => {
    const { search } = useLocation()
    const redireactURL = new URLSearchParams(search).get('redirect')
    const redirect = redireactURL ? redireactURL : '/'
    
    return (
        <section>
            <Helmet>
                <title>Sign In  </title>
            </Helmet>
            <Container >
                <div className="py-5">
                    <h1>Sign in </h1>
                    <Form>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                required
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