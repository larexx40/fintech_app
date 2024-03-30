import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { Transaction, TransactionSchema } from '../transactions/transaction.model';
import { databaseProviders } from './mongoose.provider';
import { User, UserSchema } from 'src/user/user.model';

@Module({
  imports: [
    ...databaseProviders,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    //   { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  exports: [...databaseProviders, MongooseModule],
})
export class DatabaseModule {}