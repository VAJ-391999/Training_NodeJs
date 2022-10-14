import { Response } from "./interface/response";

export const responseHandler = <T>(statusCode: number, data: T) => {
  const response: Response = {
    statusCode,
    body: JSON.stringify(data),
  };
  return response;
};
