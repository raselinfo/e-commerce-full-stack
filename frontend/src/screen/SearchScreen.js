import React, { useEffect, useReducer, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "axios"
import handleError from '../utils';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

const prices = [
    {
        name: '$1 to $50',
        value: '1-50',
    },
    {
        name: '$51 to $200',
        value: '51-200',
    },
    {
        name: '$201 to $1000',
        value: '201-1000',
    },
];
export const ratings = [
    {
        name: '4stars & up',
        rating: 4,
    },

    {
        name: '3stars & up',
        rating: 3,
    },

    {
        name: '2stars & up',
        rating: 2,
    },

    {
        name: '1stars & up',
        rating: 1,
    },
];
const initialState = {
    loading: true,
    error: ""
}
const reducer = (state, { type, payload }) => {
    switch (type) {
        case "REQUEST":
            return { ...state, loading: true }
        case "SUCCESS":
            return { ...state, products: payload.products, page: payload.page, countProducts: payload.countProducts, loading: false }
        case "FAIL":
            return { ...state, payload: false, error: payload }
        default:
            return state
    }
}
const SearchScreen = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category") ?? 'all'
    const query = searchParams.get("query") ?? "all"
    const price = searchParams.get("price") ?? "all"
    const rating = searchParams.get("rating") ?? "all"
    const order = searchParams.get("order") ?? "newest"
    const page = searchParams.get("page") || 1

    const [{ loading, error, products, pages, countProducts }, dispatch] = useReducer(reducer, initialState)
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const { data } = await axios.get(`/api/product/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`)
    //             dispatch({ type: "SUCCESS", payload: data })
    //             console.log(data)
    //         } catch (err) {
    //             dispatch({
    //                 type: "FAIL",
    //                 payload: handleError(err)
    //             })
    //         }
    //     }
    //     fetchData()
    // }, [page, query, category, price, rating, order])

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(`/api/product/categories`);
                setCategories(data);
            } catch (err) {
                toast.error(handleError(err));
            }
        };
        fetchCategories();
    }, [dispatch]);

    const getFilterUrl = (filter) => {
        const filterPage = filter?.page || page;
        const filterCategory = filter?.category || category;
        const filterQuery = filter?.query || query;
        const filterRating = filter?.rating || rating;
        const filterPrice = filter?.price || price;
        const sortOrder = filter?.order || order;
        return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
    };

    return (
        <div>
            <Helmet>
                <title>Search Product</title>
            </Helmet>
            <Row>
                <Col md={3}>
                    <h3>Department</h3>
                    <div>
                        <ul>
                            <li>
                                <Link className={'all' === category ? "fw-bold" : ""} to={getFilterUrl({ category: 'all' })}>
                                    Any
                                </Link>
                            </li>
                            {categories.map(c => {
                                return <li key={c}>
                                    <Link className={c === category ? "fw-bold" : ""} to={getFilterUrl({ category: c })}>
                                        {c}
                                    </Link>

                                </li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <h3>Price</h3>
                        <ul>
                            <li>
                                <Link className={'all' === price ? "fw-bold" : ''} to={getFilterUrl({ price: "all" })}>Any</Link>
                            </li>
                            {prices.map(p => {
                                return <li key={p.name}>
                                    <Link className={p.value === price ? "fw-bold" : ""} to={getFilterUrl({ price: p.value })}>
                                        {p.name}
                                    </Link>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <h3>Average Rating</h3>
                        <ul>
                            {ratings.map(r => {
                                return <li key={r.name}>
                                    <Link to={r.rating === rating ? "fw-bold" : ""} to={getFilterUrl({ rating: r.rating })}>
                                        <Rating numReviews={r.name} rating={r.raging} />
                                    </Link>
                                </li>
                            })}
                        </ul>
                    </div>
                </Col>
            </Row>
        </div >
    );
};

export default SearchScreen;