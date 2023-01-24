import React from 'react';
import ReactStars from 'react-rating-stars-component';

const star = ({
  onChange,
  options = {
    count: 5,
    size: 35,
    activeColor: '#EAB308',
    color: '#ddd',
    isHalf: true,
  },
}) => {
  return <ReactStars onChange={onChange} {...options} />;
};

export default star;
