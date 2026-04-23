class ErrorLoggerService {

  static log(error, context = "Unknown") {

    const errorData = {
      message: error.message || "Unknown error",
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    };

    console.error("Logged Error:", errorData);

  }

}

export default ErrorLoggerService;