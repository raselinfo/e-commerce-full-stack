const formateError = (err) => {
  return err.response.status >= 500
    ? `Server Down! 😢 <p>Please give us sometime to fix this issue.OR mail us : example@gmail.com</p>`
    : err.response.data.message
    ?  err.response.data.message
    : err.response.status > 400
    ? "Client Error! <p>Please give us sometime to fix this issue.OR mail us : example@gmail.com</p>"
    : "Something went Wrong <p>Please give us sometime to fix this issue.OR mail us : example@gmail.com</p>";
};

export default formateError;
