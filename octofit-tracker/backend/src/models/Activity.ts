import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    username: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
    notes: { type: String, required: true },
  },
  { timestamps: true }
);

export const Activity = mongoose.model('Activity', activitySchema, 'activities');
