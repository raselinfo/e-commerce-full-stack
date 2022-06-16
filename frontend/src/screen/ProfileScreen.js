import React, { useState, useReducer, useContext } from 'react';
import { Helmet } from "react-helmet-async"
import { Form, Button } from "react-bootstrap"
import { Store } from "../Store"
import handleError from "../utils"
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"
const initialState = {
    loadingUpdate: false,
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'REQUEST':
            return { ...state, loadingUpdate: true };
        case 'SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'FAIL':
            return { ...state, loadingUpdate: false };
        default:
            return state;
    }
};



const ProfileScreen = () => {
    const { state: { userInfo }, dispatch: ctxDispatch } = useContext(Store);

    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, initialState);


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: "REQUEST" })
            const { data } = await axios.put('/api/user/profile', {
                name, email, password
            }, {
                headers: {
                    authorization: `Bearer ${userInfo.token}`
                }
            })
            console.log(data)
            dispatch({ type: "SUCCESS" })
            ctxDispatch({ type: "USER_SIGNIN", payload: data })
            localStorage.setItem("userInfo", JSON.stringify(data))
            toast.success("Update Successfully")
        }
        catch (err) {
            toast.error(handleError(err))
            dispatch({ type: "FAIL" })
        }
    };

    return (
        <div className="container small-container">
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <ToastContainer />
            <h1 className="my-3">User Profile</h1>
            <form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </div>
    );
};

export default ProfileScreen;