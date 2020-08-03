import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperiencesModule } from './experiences/experiences.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ExperiencesModule,
    MongooseModule.forRoot('mongodb+srv://kareem_1:cohqom-jifgE4-pufpym@cluster0.2pd2c.mongodb.net/resume?retryWrites=true&w=majority'),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
