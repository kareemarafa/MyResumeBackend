import { Module } from '@nestjs/common';
import { TestimonialsController } from './testimonials.controller';
import { TestimonialsService } from './testimonials.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TestimonialSchema } from './testimonials.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Testimonial', schema: TestimonialSchema },
    ]),
  ],
  controllers: [TestimonialsController],
  providers: [TestimonialsService],
})
export class TestimonialsModule {}
