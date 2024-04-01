import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { Transaction, TransactionSchema } from '../transactions/transaction.model';
import { databaseProviders } from './mongoose.provider';

@Module({
  imports: [
    ...databaseProviders,
  ],
  exports: [...databaseProviders, MongooseModule],
})
export class DatabaseModule {}