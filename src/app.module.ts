import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperiencesModule } from './experiences/experiences.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { EducationsModule } from './educations/educations.module';
import { CoursesModule } from './courses/courses.module';
import { SkillsModule } from './skills/skills.module';
import { MetaModule } from './meta/meta.module';


@Module({
  imports: [
    ExperiencesModule,
    DatabaseModule,
    AuthModule,
    EducationsModule,
    CoursesModule,
    SkillsModule,
    MetaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

