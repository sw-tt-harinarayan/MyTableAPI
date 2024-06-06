import { Response } from "express";
import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const statusCode = exception.getStatus();
    const response = ctx.getResponse<Response>();
    let errorResponse: any = exception.getResponse();
    console.error({ errorResponse });

    if (Array.isArray(errorResponse.message))
      errorResponse = {
        ...errorResponse,
        message: errorResponse.message[0],
      };

    response.status(statusCode).json(errorResponse);
  }
}