
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb-srv://kareem_1:cohqom-jifgE4-pufpym@cluster0.2pd2c.mongodb.net/resume?retryWrites=true&w=majority')]
})
export class DatabaseModule {}
