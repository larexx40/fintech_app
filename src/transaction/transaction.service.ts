import { ChangeTransactionStatusDto, NewTransactionDto } from './transaction.dto';
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { TransactionRepository } from "./transaction.repository";
import { TransactionType } from 'src/utils/enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TransactionService{
    constructor(
        private readonly transactionRepository: TransactionRepository,
        private readonly userService: UserService
    ){}

    async createTransaction(userId: string, input: NewTransactionDto){
        if(!userId || !input) throw new BadRequestException("Pass in transaction data")
        
        if(input.transactionType !== TransactionType.RECEIVE){//!receive, check for balance to debit
            const userBalance = await this.userService.getUserBalance(userId);
            if(input.amount > userBalance)throw new BadRequestException("Insufficient user balance")
        }

        let description
        switch (input.transactionType) {
            case TransactionType.SPEND:
                description = `Spent ${input.amount} on utilities`;
                break;
            case TransactionType.SEND:
                description = `Send ${input.amount} to another user`;
                break;
            case TransactionType.RECEIVE:
                description = `Received ${input.amount} from a user`;
                break;
            default:
                description = ``;
        } 
        input.description = description;

        const transaction = await this.transactionRepository.createTransaction(userId, input);
        let updateBalance;
        if (input.transactionType === TransactionType.RECEIVE) {
            updateBalance = await this.userService.addToUserBalance(userId, input.amount);
        } else {
            updateBalance = await this.userService.deductUserBalance(userId, input.amount);
        }


        return transaction
    }

    async changeTransactionStatus(userId: string, input: ChangeTransactionStatusDto){
        const transaction = await this.transactionRepository.changeTransactionStatus(userId, input)
        return transaction;
    }

    async getUserTransactions(userId: string){
        if(!userId) throw new BadRequestException("Pass in user id")
        const transaction = await this.transactionRepository.getUserTransactions(userId)
        return transaction;
    }

    async getUserTransactionById(userId: string, transactionId: string){
        if(!userId || !transactionId) throw new BadRequestException("Pass in transaction id")
        const transaction = await this.transactionRepository.getUserTransactionById(userId,transactionId)
        if(!transaction) throw new NotFoundException("Transation not found")
        return transaction;
    }

    async getTransactionById(transactionId: string){
        if(!transactionId) throw new BadRequestException("Pass in transaction id")
        const transaction = await this.transactionRepository.findOne(transactionId)
        if(!transaction) throw new NotFoundException("Transation not found")
        return transaction;
    }
}