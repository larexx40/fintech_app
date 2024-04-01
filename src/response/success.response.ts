import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  message: string;
  data?: T;
  statusCode?: HttpStatus
}
@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // const response = context.switchToHttp().getResponse();
        const message = data.message || 'Operation completed successfully';
        return {
          status: true,
          statusCode: data.statusCode || HttpStatus.OK,
          message,
          data: data.data || {}
        };
      }),
    );
  }
}
