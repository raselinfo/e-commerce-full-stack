const formateError = (err) => {
  return err?.message ? err?.message : err;
};

class CustomError {
  constructor(message, status) {
    this.message = message;
    this.status = status;
  }

  static notFound(message = "Not Found!", status = 404) {
    return new CustomError(formateError(message), status);
  }
  static unauthorized(message = "Unauthorized", status = 401) {
    return new CustomError(formateError(message), status);
  }
  static severError(message = "Server Error", status = 501) {
    return new CustomError(formateError(message), status);
  }
}

module.exports = CustomError;
