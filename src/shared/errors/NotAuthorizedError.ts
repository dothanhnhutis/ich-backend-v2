import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError";

export class NotAuthorizedError extends CustomError<ErrorCode> {
  constructor(message = "Authentication failed") {
    super({
      statusCode: StatusCodes.UNAUTHORIZED,
      message,
      code: "UNAUTHORIZED",
    });
  }
}
