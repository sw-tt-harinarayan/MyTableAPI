import { Response, Request } from "express";
import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from "@nestjs/common";

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const statusCode = exception.getStatus();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    let errorResponse: any = exception.getResponse();

    console.error({ request: request.body, errorResponse });

    if (errorResponse.statusCode === 403)
      errorResponse = {
        ...errorResponse,
        message: "You don't have permission!",
      };

    if (Array.isArray(errorResponse.message))
      errorResponse = {
        ...errorResponse,
        message: errorResponse.message[0],
      };

    response.status(statusCode).json(errorResponse);
  }
}
