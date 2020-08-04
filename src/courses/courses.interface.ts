import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  certificateLink: { type: String, required: true },
});

export interface Course extends mongoose.Document {
  title: string;
  author: string;
  certificateLink: string;
}

export class CourseModel {
  @ApiProperty({ type: String })
  id?: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  author: string;

  @ApiProperty({ type: String })
  certificateLink: string;
}
