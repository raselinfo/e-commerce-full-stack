import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store/Store";
const Payment = () => {
  const { state } = useContext(Store);
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.userInfo.email) {
      navigate("/checkout?step=shipping", { replace: true });
    }
  }, [navigate, state.userInfo.email]);
  return <div>Payment</div>;
};

export default Payment;
