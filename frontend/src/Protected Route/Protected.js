import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store/Store";
const Protected = ({ children }) => {
  const pathName = window.location.pathname;
  const {
    state: { userInfo },
  } = useContext(Store);
  return !userInfo.email ? (
    <Navigate to={`/signin?redirect=${pathName}`} />
  ) : (
    children
  );
};

export default Protected;
