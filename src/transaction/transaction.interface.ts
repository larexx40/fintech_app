import { TransactionStatus, TransactionType } from "src/utils/enum";

export interface ITransaction {
    _id?: string;
    transactionId:string;
    userId: string;
    amount: number;
    transactionType: TransactionType;
    status: TransactionStatus;
    description: string;
}
