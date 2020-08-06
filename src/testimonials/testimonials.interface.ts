import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  photo: { type: String, required: true },
  role: { type: String, required: true },
  companyName: { type: String },
});

export interface Testimonial extends mongoose.Document {
  name: string;
  comment: string;
  photo: string;
  role: string;
  companyName?: string;
}

export class TestimonialModel {
  @ApiProperty({ type: String })
  id?: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  comment: string;

  @ApiProperty({ type: String })
  photo: string;

  @ApiProperty({ type: String })
  role: string;

  @ApiProperty({ type: String })
  companyName?: string;
}
