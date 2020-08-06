import { Module } from '@nestjs/common';
import { EducationsController } from './educations.controller';
import { EducationsService } from './educations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationSchema } from './educations.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Education', schema: EducationSchema },
    ])
  ],
  controllers: [EducationsController],
  providers: [EducationsService]
})
export class EducationsModule {}
