import CustomError from "./CustomError";

export class RedisConnectError extends CustomError<RedisCode> {
  constructor(message = "Redis connect error") {
    super({
      message,
      statusCode: 600,
      code: "CONNECT_FAIL",
    });
  }
}
