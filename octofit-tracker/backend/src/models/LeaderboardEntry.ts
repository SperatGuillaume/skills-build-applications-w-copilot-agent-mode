import mongoose, { Schema } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    username: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    weeklyMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

export const LeaderboardEntry = mongoose.model(
  'LeaderboardEntry',
  leaderboardEntrySchema,
  'leaderboard'
);
