import Axios from 'axios';
import publicAxios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store/Store';
import { useContext } from 'react';
import jwt_decode from 'jwt-decode';
import https from 'https-browserify';

const privateAxios = Axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

//  getAccessToken from session Storage
const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
};
const useAxios = () => {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  const logOut = () => {
    const pathName = window.location.pathname;
    const query = String(window.location.search)?.split('?')[1];
    const redirect = `${pathName}&${query}`;
    // Return in Login Page
    dispatch({ type: 'SIGN_OUT' });
    navigate(`/signin?redirect=${redirect}`, { replace: true });
  };

  // Interceptor Request
  privateAxios.interceptors.request.use(
    (req) => {
      const accessToken = getAccessToken();
      req.headers.authorization = `Bearer ${accessToken}`;

      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // Interceptor Response
  privateAxios.interceptors.response.use(
    (res) => res,
    async (err) => {
      const config = err?.config;

      if (err?.response?.status === 401 && !config?.sent) {
        config.sent = true;
        // Get Refresh Token
        try {
          const result = await publicAxios.post('/refresh-token');
          const accessToken = result?.data?.data?.accessToken;
          if (accessToken) {
            sessionStorage.setItem('accessToken', accessToken);
            config.headers.authorization = `Bearer ${accessToken}`;
          }
          config.sent = false;

          // Decode Access Token
          const user = jwt_decode(accessToken);
          // Save The user on localStorage
          // {name,email,image,role}
          dispatch({
            type: 'SAVE_USER',
            payload: {
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role,
            },
          });
          return privateAxios(config);
        } catch (error) {
          if (error?.response?.status === 403) {
            logOut();
          }
          return Promise.reject(error);
        }
      }

      // Log out if status code 403
      if (err?.response?.status === 403) {
        logOut();
      }
      return Promise.reject(err);
    }
  );

  return privateAxios;
};
export default useAxios;
