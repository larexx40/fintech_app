import { TransactionService } from './transaction.service';
import { Controller, Get, Post, Request, Body, Param, UseGuards, Patch } from '@nestjs/common';
import { ChangeTransactionStatusDto, NewTransactionDto } from './transaction.dto';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { RequestWithAuth } from 'src/user/user.interface';
import { ApiResponse } from 'src/response/success.response';


@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createTransaction(
    @Request() req: RequestWithAuth,
    @Body() input: NewTransactionDto
  ):Promise<ApiResponse<any>> {
    const userId = req.user.userId;
    const transaction = await this.transactionService.createTransaction(userId, input);
    return {
      message: "Transaction created successfully",
      data: transaction
    }
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