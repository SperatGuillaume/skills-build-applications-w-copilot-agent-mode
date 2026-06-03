import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    memberCount: { type: Number, required: true },
    weeklyGoalMinutes: { type: Number, required: true },
    motto: { type: String, required: true },
  },
  { timestamps: true }
);

export const Team = mongoose.model('Team', teamSchema, 'teams');
