import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from "@nestjs/common";

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: any) => {
        const httpResponse = context.switchToHttp().getResponse();
        const {
          body = {},
          statusCode = httpResponse.statusCode || 200,
          message = "Record found successfully.",
        } = response;

        console.log({ response });

        // Set the status code in the response
        httpResponse.status(statusCode);

        // Modify the response data here as needed
        const modifiedData = {
          statusCode,
          message,
          body,
        };

        return modifiedData;
      }),
    );
  }
}
