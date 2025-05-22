import CustomError from "./CustomError";
import { StatusCodes } from "http-status-codes";

export default class NotFoundError extends CustomError<ErrorCode> {
  constructor(message = "Resource not found") {
    super({
      message,
      statusCode: StatusCodes.NOT_FOUND,
      code: "NOT_FOUND",
    });
  }
}
