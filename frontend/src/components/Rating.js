import React from 'react';

const Rating = ({
  reviews, // [{rating:4.5}]
  isShowLength = true, // Boolean
  caption, // String
  className = '',
  style,
}) => {
  // Todo: if not reviews
  if (!reviews) {
    return '';
  }
  // Todo: if reviews
  let totalReviews = reviews?.numberOfReviews;
  return (
    <div className={`ratting_wrapper ${className}`} style={style && style}>
      <i
        className={
          reviews.rating >= 1
            ? 'fa-solid fa-star'
            : reviews.rating >= 0.5
            ? 'fa-solid fa-star-half-stroke'
            : 'fa-regular fa-star'
        }
      ></i>
      <i
        className={
          reviews.rating >= 2
            ? 'fa-solid fa-star'
            : reviews.rating >= 1.5
            ? 'fa-solid fa-star-half-stroke'
            : 'fa-regular fa-star'
        }
      ></i>
      <i
        className={
          reviews.rating >= 3
            ? 'fa-solid fa-star'
            : reviews.rating >= 2.5
            ? 'fa-solid fa-star-half-stroke'
            : 'fa-regular fa-star'
        }
      ></i>
      <i
        className={
          reviews.rating >= 4
            ? 'fa-solid fa-star'
            : reviews.rating >= 3.5
            ? 'fa-solid fa-star-half-stroke'
            : 'fa-regular fa-star'
        }
      ></i>
      <i
        className={
          reviews.rating >= 5
            ? 'fa-solid fa-star'
            : reviews.rating >= 4.5
            ? 'fa-solid fa-star-half-stroke'
            : 'fa-regular fa-star'
        }
      ></i>{' '}
      {isShowLength && (
        <span className='text-yellow-500 font-bold'>
          {totalReviews} Reviews
        </span>
      )}
      {caption && <span className='text-yellow-500 font-bold'>{caption}</span>}
    </div>
  );
};

export default Rating;
