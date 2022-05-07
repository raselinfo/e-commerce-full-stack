import React, { useEffect, useReducer, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"
import { Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap"
import Rating from '../components/Rating';
import { Helmet } from "react-helmet-async"
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import handleError from '../utils';
import { Store } from "../Store"
const initialState = {
    product: null,
    loading: true,
    error: ""
}
const reducer = (state, { type, payload }) => {
    switch (type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, product: payload }

        case "FETCH_FAIL":
            return { ...state, loading: false, error: payload }

        default:
            return state
    }
}


const ProductScreen = () => {
    const [{ product, error, loading }, dispatch] = useReducer(reducer, initialState)
    const { state, dispatch: ctxDispatch } = useContext(Store)
    const { slug } = useParams()
    useEffect(() => {
        dispatch({ type: "FETCH_REQUEST" })
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/product/slug/${slug}`)
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: handleError(err) })
            }
        }
        fetchData()


    }, [slug])

    const addToCartHandler = () => {
        ctxDispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: 1 } })        
    }
    return (
        <div>

            {loading ? <Loading /> : error ? <MessageBox variant="danger">{error}</MessageBox> : <div>
                <Helmet>
                    <title>{product.name}</title>
                </Helmet>
                <Row>
                    <Col md={6}>
                        <img src={product.image} alt={product.name} />
                    </Col>
                    <Col md={3}>
                        <ListGroup>
                            <ListGroup.Item>
                                <h1>{product.name}</h1>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating rating={product.rating} numReviews={product.numReviews} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <p>Price : ${product.price}</p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <p>Description : {product.description}</p>
                            </ListGroup.Item>
                        </ListGroup>

                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={6}>Price: </Col>
                                        <Col md={6}>${product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={6}>Status: </Col>
                                        <Col md={6}>{product.countInStock > 0 ? <Badge bg="success">In Stock</Badge> : <Badge bg="danger">Unavailable</Badge>}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>

                                    <Col md={6}>{product.countInStock > 0 && <Button variant="warning" onClick={addToCartHandler}>Add to cart</Button>}</Col>

                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>}

        </div>
    );
};

export default ProductScreen;