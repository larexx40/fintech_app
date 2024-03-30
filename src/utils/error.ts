import { Catch, HttpException, ExceptionFilter, ArgumentsHost, Logger, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response, Request } from 'express';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const args: HttpArgumentsHost = host.switchToHttp();
    const res: Response = args.getResponse<Response>();
    const req: Request = args.getRequest<Request>();
    const logger: Logger = new Logger('ErrorException');

    logger.error(`
      ==================================
      ======== Error Exception =========
      ==================================

        name: ${exception.name}
        code: ${exception.getStatus()}
        message: ${exception.message}
        Stack: ${exception.stack}

      ==================================
      ==================================
      ==================================
    `);

    const statusCode: number = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const response: any = exception.getResponse();
    const message: any = response && response.hasOwnProperty('message') ? response.message : 'Internal server error';

    return res.status(statusCode).json({
      status: false,
      statusCode,
      message,
      path: req.url,
      timestamp: new Date().toISOString()
    });
  }
}