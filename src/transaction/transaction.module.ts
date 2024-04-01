import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './transaction.model';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';

@Module({imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
  ],
    controllers: [TransactionController],
    providers: [TransactionService, TransactionRepository],
    exports: [TransactionService],
})
export class TransactionModule {}