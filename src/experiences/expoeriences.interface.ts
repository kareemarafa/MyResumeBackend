import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoosePagination from 'mongoose-paginate-v2';

export const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  companyName: { type: String, required: true },
  startDate: { type: String, required: true },
  companyLocation: { type: String, required: true },
  roleDescription: { type: [String] },
  companyWebsite: { type: String },
  endDate: { type: String },
  current: { type: Boolean },
});

ExperienceSchema.plugin(mongoosePagination);

export interface Experience extends mongoose.Document {
  role: string;
  roleDescription?: string[];
  companyName: string;
  companyWebsite?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  companyLocation: string;
}

export class ExperienceModel {
  @ApiProperty({ type: String })
  id?: string;

  @ApiProperty({ type: String })
  role: string;

  @ApiProperty({ type: [String] })
  roleDescription?: string[];

  @ApiProperty({ type: String })
  companyName: string;

  @ApiProperty({ type: String })
  companyWebsite?: string;

  @ApiProperty({ type: String })
  startDate: string;

  @ApiProperty({ type: String })
  endDate?: string;

  @ApiProperty({ type: Boolean })
  current?: boolean;

  @ApiProperty({ type: String })
  companyLocation: string;
}
