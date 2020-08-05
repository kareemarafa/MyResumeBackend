import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const UserSchema = new mongoose.Schema({
  role: { type: String, required: true },
  username: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String},
});

export interface User extends mongoose.Document {
  role: string;
  username: string;
  firstname?: string;
  lastname?: string;
  password: string;
  email: string;
  phone?: string;
}

export class UserModel {
  @ApiProperty({ type: String })
  id?: string;

  @ApiProperty({ type: String })
  role: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  firstname?: string;

  @ApiProperty({ type: String })
  lastname?: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  phone?: string;
}
