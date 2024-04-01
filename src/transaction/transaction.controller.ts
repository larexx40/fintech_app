import { TransactionService } from './transaction.service';
import { Controller, Get, Post, Request, Body, Param, UseGuards, Patch, HttpStatus } from '@nestjs/common';
import { ChangeTransactionStatusDto, NewTransactionDto } from './transaction.dto';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { RequestWithAuth } from 'src/user/user.interface';

export interface ApiResponse<T> {
  message: string;
  data?: T;
  statusCode?: HttpStatus;
}

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(AuthGuard)
  createTransaction(
    @Request() req: RequestWithAuth,
    @Body() input: NewTransactionDto
  ) {
    const userId = req.user.userId;
    return this.transactionService.createTransaction(userId, input);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUserTransactions(
    @Request()req: RequestWithAuth
  ) {
    const userId = req.user.userId
    return await this.transactionService.getUserTransactions(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTransaction(
    @Request()req: RequestWithAuth,
    @Param('id') id: string
  ) {
    const userId = req.user.userId
    return await this.transactionService.getUserTransactionById(userId,id);
  }

  @Patch('change-status/:id')
  async changeStatus(
    @Request()req: RequestWithAuth, 
    @Body() input: ChangeTransactionStatusDto
  ) {
    const userId = req.user.userId
    return this.transactionService.changeTransactionStatus(userId, input);
  }
}