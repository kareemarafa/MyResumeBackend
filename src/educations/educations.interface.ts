import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const EducationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: { type: String, required: true },
  description: { type: String, required: true },
  courseList: { type: [String] },
});

export interface Education extends mongoose.Document {
  title: string;
  dueDate: string;
  description: string;
  courseList?: any[];
}

export class EducationModel {
  @ApiProperty({ type: String })
  id?: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  dueDate: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: [String] })
  courseList?: any[];
}
