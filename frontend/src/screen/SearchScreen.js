import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchScreen = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category") ?? 'all'
    const query = searchParams.get("query") ?? "all"
    const price = searchParams.get("price") ?? "all"
    const rating = searchParams.get("rating") ?? "all"
    const order = searchParams.get("order") ?? "newest"

    return (
        <div>
            <h1>Search Screen</h1>
        </div>
    );
};

export default SearchScreen;