import Axios from "axios";
console.log(process.env.REACT_APP_SERVER_URL);
const axios = Axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export default axios;
