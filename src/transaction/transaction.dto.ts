import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { TransactionStatus, TransactionType } from 'src/utils/enum';

export class NewTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
  
  @IsNotEmpty()
  @IsString()
  transactionType: TransactionType;
}

export class ChangeTransactionStatusDto {
  @IsNotEmpty()
  @IsString()
  transactionId: string;
  
  @IsNotEmpty()
  @IsString()
  status: TransactionStatus;
}



