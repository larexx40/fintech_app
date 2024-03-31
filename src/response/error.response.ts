// error.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  
  @Injectable()
  export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const ctx = context.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      return next.handle().pipe(
        catchError((error) => {
          let status = HttpStatus.INTERNAL_SERVER_ERROR;
          let message = 'Internal server error';
          let errorResponse: any = { message };
  
          if (error instanceof HttpException) {
            status = error.getStatus();
            errorResponse = error.getResponse();
            message = errorResponse.message || message;
          }
  
          if (!response.headersSent) { // Check if headers are already sent
            response.status(status).json({
              status: false,
              statusCode: status,
              message,
              error: (message !== error.message) ? error.message : [],
              path: request.url,
              timestamp: new Date().toISOString()
            });
          }
  
          return throwError(() => error);
        }),
      );
    }
  }
  