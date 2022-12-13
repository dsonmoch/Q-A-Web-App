class ErrorHandler extends Error {
  status(status: any) {
    throw new Error("Method not implemented.");
  }
  constructor(status: any, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static serverError(msg: string) {
    return new ErrorHandler(500, msg);
  }

  static validationError(msg: string) {
    return new ErrorHandler(400, msg);
  }

  static authTokenError(msg: string) {
    return new ErrorHandler(401, msg);
  }
}

export default ErrorHandler;
