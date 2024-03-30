import { MongooseModule } from '@nestjs/mongoose';

export const databaseProviders = [
    MongooseModule.forRoot('mongodb://localhost/nest-mongodb-api'),
];
