import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperiencesModule } from './experiences/experiences.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './core/database/database.module';
import { EducationsModule } from './educations/educations.module';
import { CoursesModule } from './courses/courses.module';


@Module({
  imports: [
    ExperiencesModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    EducationsModule,
    CoursesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
