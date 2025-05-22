import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError";

export class PermissionError extends CustomError<ErrorCode> {
  constructor(message = "Permission denied") {
    super({ statusCode: StatusCodes.FORBIDDEN, message, code: "FORBIDDEN" });
  }
}
