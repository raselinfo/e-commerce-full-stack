const { ValidationError } = require("joi");
const CustomError = require("../../utils/Error");
const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  let error = {
    status: err.status ? err.status : 501,
    message:
      process.env.MODE === "development"
        ? err.message
        : "Something went wrong!",
  };
  if (err instanceof CustomError) {
    error = {
      ...error,
    };
  }
  if (err instanceof ValidationError) {
    error = {
      ...error,
      status: 422,
    };
  }

  res.status(error.status).json(error);
};

module.exports = errorMiddleware;
