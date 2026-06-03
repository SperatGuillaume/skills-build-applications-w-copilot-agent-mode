import mongoose from 'mongoose';

export const mongoUri = 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  await mongoose.connect(mongoUri);
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}
