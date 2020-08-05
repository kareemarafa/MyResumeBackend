import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const MetaSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

export interface Meta extends mongoose.Document {
  key: string;
  value: string;
}

export class MetaModel {
  @ApiProperty({ type: String })
  id?: string;

  @ApiProperty({ type: String })
  key: string;

  @ApiProperty({ type: String })
  value: string;

  @ApiProperty({ type: String })
  description: string;
}
