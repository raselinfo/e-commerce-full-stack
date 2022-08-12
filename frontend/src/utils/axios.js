import Axios from "axios";
const axios = Axios.create({
  baseURL: "https://amazonatest.herokuapp.com/api/v1",
});

export default axios;
