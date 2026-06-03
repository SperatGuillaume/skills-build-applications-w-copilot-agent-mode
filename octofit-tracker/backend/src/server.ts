import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

connectDatabase()
  .then(() => console.log('Connected to MongoDB (octofit_db)'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/api/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API', baseUrl });
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find().sort({ displayName: 1 });
  res.json(users);
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find().sort({ name: 1 });
  res.json(teams);
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find().sort({ activityDate: -1 });
  res.json(activities);
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 });
  res.json(leaderboard);
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find().sort({ title: 1 });
  res.json(workouts);
});

app.listen(PORT, () => {
  console.log(`Backend running at ${baseUrl}`);
});

export { app, baseUrl };
