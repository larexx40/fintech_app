import { IsString, IsNumber, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TransactionStatus, TransactionType } from 'src/utils/enum';

export class NewTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
  
  @IsNotEmpty()
  @IsString()
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @IsOptional()
  @IsString()
  description?: string
}

export class ChangeTransactionStatusDto {
  @IsNotEmpty()
  @IsString()
  transactionId: string;
  
  @IsNotEmpty()
  @IsString()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}



