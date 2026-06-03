import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    equipment: { type: [String], required: true },
    recommendedForGoal: { type: String, required: true },
  },
  { timestamps: true }
);

export const Workout = mongoose.model('Workout', workoutSchema, 'workouts');
