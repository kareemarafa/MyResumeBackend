import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillSchema } from './skills.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Skill', schema: SkillSchema },
    ]),
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
