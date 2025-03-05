class ApiResponse {
  constructor(success, message, data) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
