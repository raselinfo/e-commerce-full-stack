const CustomError = require("../../utils/error");
const errorMiddleware = (err, req, res, next) => {
  let error = {
    status: err.status ? err.status : 501,
    message: "Something wen wrong",
  };
  if (err instanceof CustomError) {
    error = {
      ...error,
      message:
        process.env.NODE_ENV.trim("") === "development"
          ? err.message
          : "Something went wrong!",
    };
  }

  res.status(error.status).json(error);
};

module.exports = errorMiddleware;
