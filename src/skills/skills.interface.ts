import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const SkillSchema = new mongoose.Schema({
  skillName: { type: String, required: true },
  progress: { type: Number, required: true },
});

export interface Skill extends mongoose.Document {
  skillName: string;
  progress: number;
}

export class SkillModel {
  @ApiProperty({ type: String })
  id?: string;

  @ApiProperty({ type: String })
  skillName: string;

  @ApiProperty({ type: Number })
  progress: number;
}
