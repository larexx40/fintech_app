// success.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BaseResponse<T> {
  message: string;
  data: T;
}
@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // const response = context.switchToHttp().getResponse();
        const message = data.message || 'Operation completed successfully';
        console.log("data:",data)
        return {
          status: true,
          statusCode: HttpStatus.OK,
          message,
          data: data.data || {}
        };
      }),
    );
  }
}
