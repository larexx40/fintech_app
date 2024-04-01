import { ChangeTransactionStatusDto, NewTransactionDto } from './transaction.dto';
import { Injectable } from "@nestjs/common";
import { TransactionRepository } from "./transaction.repository";

@Injectable()
export class TransactionService{
    constructor(
        private readonly transactionRepository: TransactionRepository
    ){}

    async createTransaction(userId: string, input: NewTransactionDto){
        const transaction = await this.transactionRepository.createTransaction(userId, input);
        return transaction
    }

    async changeTransactionStatus(userId: string, input: ChangeTransactionStatusDto){
        const transaction = await this.transactionRepository.changeTransactionStatus(userId, input)
        return transaction;
    }

    async getUserTransactions(userId: string){
        const transaction = await this.transactionRepository.getUserTransactions(userId)
        return transaction;
    }

    async getUserTransactionById(userId: string, transactionId: string){
        const transaction = await this.transactionRepository.getUserTransactionById(userId,transactionId)
        return transaction;
    }
}