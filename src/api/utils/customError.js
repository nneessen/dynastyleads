export class CustomError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;
    this.code = code;
  }
}
