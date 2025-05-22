import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError";

export default class BadRequestError extends CustomError<ErrorCode> {
  constructor(message: string) {
    super({
      message,
      statusCode: StatusCodes.BAD_REQUEST,
      code: "BAD_REQUEST",
    });
  }
}
