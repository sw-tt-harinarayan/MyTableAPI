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
        let {
          body = {},
          statusCode = httpResponse.statusCode || 200,
          message = "Record found successfully.",
        } = response;

        // console.info({ response });

        // Set the status code in the response
        httpResponse.status(statusCode);

        // Modify the response data here as needed
        let modifiedData = {
          statusCode,
          message,
          body,
        };

        if (body?.docs) {
          const { docs, ...rest } = body;
          modifiedData = { ...modifiedData, body: docs, ...rest };
        }

        return modifiedData;
      }),
    );
  }
}
