import { useContext } from "react";
import { Store } from "../Store/Store";
import { Navigate } from "react-router-dom";
const AuthProtect = ({ children }) => {
  const {
    state: { userInfo },
  } = useContext(Store);
  return !userInfo.email ? children : <Navigate to="/" />;
};

export default AuthProtect;
