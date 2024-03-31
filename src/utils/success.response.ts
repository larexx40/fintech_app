import { Response } from 'express';

export class SuccessResponse {
  constructor(private response: Response) {}

  send(message: string, data?: any, status = 200) {
    this.response.status(status).json({
      success: true,
      message,
      data,
    });
  }
}