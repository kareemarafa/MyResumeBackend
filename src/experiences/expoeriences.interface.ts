import * as mongoose from 'mongoose';

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

export interface ExperienceModel {
  id?: string;
  role: string;
  roleDescription?: string[];
  companyName: string;
  companyWebsite?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  companyLocation: string;
}
