import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from "./transaction.model";
import { ChangeTransactionStatusDto, NewTransactionDto } from "./transaction.dto";
import { TransactionStatus } from "src/utils/enum";
import { ITransaction } from "./transaction.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TransactionRepository{
    constructor(
        @InjectModel(Transaction.name) 
        private readonly transactionModel: Model<Transaction>
    ){}

    async createTransaction(userId: string, input: NewTransactionDto): Promise<Transaction> {
        const createTransaction = await this.transactionModel.create({
            transactionId: uuidv4(),
            userId,
            amount: input.amount,
            transactionType: input.transactionType,
            status: TransactionStatus.SUCCESS,
            description: input.description
        });
        return createTransaction;
    }

    async getAll(): Promise<ITransaction[]> {
        return await this.transactionModel.find().exec();
    }

    async findOne(transactionId: string): Promise<ITransaction> {
        return await this.transactionModel.findOne({transactionId}).exec();
    }

    async getUserTransactions(userId: string):Promise<ITransaction[]>{
        const transactions = await this.transactionModel.find({userId}).exec();
        return transactions
    }

    async getUserTransactionById(userId: string, transactionId: string):Promise<ITransaction>{
        const transactions = await this.transactionModel.findOne({userId, transactionId}).exec();
        return transactions
    }

    async checkExist(whereClause: Partial<ITransaction>): Promise<Transaction> {
        return await this.transactionModel.findOne(whereClause).exec();
    }

    async changeTransactionStatus(userId: string, input: ChangeTransactionStatusDto): Promise<Transaction> {
        return await this.transactionModel.findOneAndUpdate({transactionId: input.transactionId, userId}, {status: input.status}, { new: true }).exec();
    }

    async deleteTransaction(trnasactionId: string): Promise<boolean> {
        const del = await this.transactionModel.findOneAndDelete({trnasactionId}).exec();
        return !!del
    }

}