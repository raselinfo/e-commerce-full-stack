import Axios from "axios";
const axios = Axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

export default axios;
