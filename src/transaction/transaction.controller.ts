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
  ): Promise<ApiResponse<any>> {
    const userId = req.user.userId
    const transactions = await this.transactionService.getUserTransactions(userId);
    return{
      message: "Transaction fetched",
      data: transactions
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTransaction(
    @Param('id') id: string
  ): Promise<ApiResponse<any>> {
    const transaction = await this.transactionService.getTransactionById(id);
    return {
      message:(transaction)? "Transaction fetched": "No record found",
      data: transaction
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTransactionBy(
    @Request()req: RequestWithAuth,
    @Param('id') id: string
  ): Promise<ApiResponse<any>> {
    const userId = req.user.userId
    const transaction = await this.transactionService.getUserTransactionById(userId,id);
    return {
      message: "Transaction fetched",
      data: transaction
    }
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