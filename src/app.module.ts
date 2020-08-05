import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ExperiencesModule } from './experiences/experiences.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { EducationsModule } from './educations/educations.module';
import { CoursesModule } from './courses/courses.module';
import { SkillsModule } from './skills/skills.module';
import { MetasModule } from './metas/metas.module';
import { TestimonialsModule } from './testimonials/testimonials.module';


@Module({
  imports: [
    ExperiencesModule,
    DatabaseModule,
    AuthModule,
    EducationsModule,
    MetasModule,
    CoursesModule,
    SkillsModule,
    TestimonialsModule,
  ],
  controllers: [AppController],
})
export class AppModule {
}

