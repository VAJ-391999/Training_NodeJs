export class HttpError<T> extends Error {
  statusCode: number;
  data: T;
  constructor(statusCode: number, data: T) {
    super("Error");
    this.name = "Error";
    this.data = data;
    this.statusCode = statusCode;
  }
}
