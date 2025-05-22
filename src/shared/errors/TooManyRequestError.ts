import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError";

export class TooManyRequestError extends CustomError<ErrorCode> {
  constructor(message = "Too many requests") {
    super({
      message,
      statusCode: StatusCodes.TOO_MANY_REQUESTS,
      code: "TOO_MANY_REQUESTS",
    });
  }
}
