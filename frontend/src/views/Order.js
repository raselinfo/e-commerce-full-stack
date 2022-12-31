import React from 'react';
import { useParams } from 'react-router-dom';
const Order = () => {
  const { orderID } = useParams();
  return (
    <div>
      <h1>Order ID {orderID}</h1>
    </div>
  );
};

export default Order;
