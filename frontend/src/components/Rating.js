import React from 'react';

const Rating = ({ rating, numReviews }) => {
    return (
        <div>
            {/* {rating => 4 ? <i class="fa-solid fa-star"></i> : <i class="fa-solid fa-star-half-stroke"></i>} */}
            <i className={
                rating >= 1 ? "fa-solid fa-star" : rating >= 0.5 ? "fa-solid fa-star-half-stroke" : "fa-solid fa-star"
            }></i> 
            <i className={
                rating >= 2 ? "fa-solid fa-star" : rating >= 1.5 ? "fa-solid fa-star-half-stroke" : "fa-solid fa-star"
            }></i>
            <i className={
                rating >= 3 ? "fa-solid fa-star" : rating >= 2.5 ? "fa-solid fa-star-half-stroke" : "fa-solid fa-star"
            }></i>
             <i className={
                rating >= 4 ? "fa-solid fa-star" : rating >= 3.5 ? "fa-solid fa-star-half-stroke" : "fa-solid fa-star"
            }></i>
            <i className={
                rating >= 5 ? "fa-solid fa-star" : rating >= 4.5 ? "fa-solid fa-star-half-stroke" : "fa-solid fa-star"
            }></i>
            <span className='reviews'>
                {numReviews} Reviews
            </span>
        </div>
    );
};

export default Rating;