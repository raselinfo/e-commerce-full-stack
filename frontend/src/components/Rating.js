import React from "react";

const Rating = ({ reviews }) => {
  // Todo: if not reviews
  if (!reviews) {
    return "";
  }
  // Todo: if reviews
  let rating = reviews.reduce((acc, item) => {
    if (acc > !item.rating) return acc;
    return (acc = item.rating);
  }, 0);
  return (
    <div className="ratting_wrapper">
      <i
        className={
          rating >= 1
            ? "fa-solid fa-star"
            : rating >= 0.5
            ? "fa-solid fa-star-half-stroke"
            : "fa-regular fa-star"
        }
      ></i>
      <i
        className={
          rating >= 2
            ? "fa-solid fa-star"
            : rating >= 1.5
            ? "fa-solid fa-star-half-stroke"
            : "fa-regular fa-star"
        }
      ></i>
      <i
        className={
          rating >= 3
            ? "fa-solid fa-star"
            : rating >= 2.5
            ? "fa-solid fa-star-half-stroke"
            : "fa-regular fa-star"
        }
      ></i>
      <i
        className={
          rating >= 4
            ? "fa-solid fa-star"
            : rating >= 3.5
            ? "fa-solid fa-star-half-stroke"
            : "fa-regular fa-star"
        }
      ></i>
      <i
        className={
          rating >= 5
            ? "fa-solid fa-star"
            : rating >= 4.5
            ? "fa-solid fa-star-half-stroke"
            : "fa-regular fa-star"
        }
      ></i>{" "}
      <span className="text-yellow-500 font-bold">{reviews.length} Reviews</span>
    </div>
  );
};

export default Rating;
