import Axios from 'axios';
import https from 'https';
const axios = Axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default axios;
