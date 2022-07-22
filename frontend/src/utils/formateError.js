const formateError = (err) => {    
  return err.response.status >= 500
    ? "Server Error! 😢"
    : err.message
    ? err.message
    : "Something went wrong";
};

export default formateError;
