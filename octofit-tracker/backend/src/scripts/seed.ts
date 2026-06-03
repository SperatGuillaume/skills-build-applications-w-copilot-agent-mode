import { connectDatabase, disconnectDatabase } from '../config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const users = [
  {
    username: 'maria_runner',
    email: 'maria.runner@example.com',
    displayName: 'Maria Lopez',
    team: 'Cardio Crew',
    fitnessGoal: 'Improve 10K pace',
    joinedAt: new Date('2026-01-12'),
  },
  {
    username: 'dev_lifter',
    email: 'dev.lifter@example.com',
    displayName: 'Dev Patel',
    team: 'Strength Squad',
    fitnessGoal: 'Build functional strength',
    joinedAt: new Date('2026-02-03'),
  },
  {
    username: 'sam_cycle',
    email: 'sam.cycle@example.com',
    displayName: 'Sam Chen',
    team: 'Endurance Engine',
    fitnessGoal: 'Complete a century ride',
    joinedAt: new Date('2026-03-18'),
  },
];

const teams = [
  {
    name: 'Cardio Crew',
    city: 'Lyon',
    memberCount: 12,
    weeklyGoalMinutes: 1800,
    motto: 'Every step counts.',
  },
  {
    name: 'Strength Squad',
    city: 'Paris',
    memberCount: 9,
    weeklyGoalMinutes: 1350,
    motto: 'Lift with purpose.',
  },
  {
    name: 'Endurance Engine',
    city: 'Nantes',
    memberCount: 15,
    weeklyGoalMinutes: 2400,
    motto: 'Long effort, steady progress.',
  },
];

const activities = [
  {
    username: 'maria_runner',
    type: 'Run',
    durationMinutes: 42,
    caloriesBurned: 410,
    activityDate: new Date('2026-06-01T07:15:00Z'),
    notes: 'Tempo intervals around the park.',
  },
  {
    username: 'dev_lifter',
    type: 'Strength Training',
    durationMinutes: 55,
    caloriesBurned: 360,
    activityDate: new Date('2026-06-01T18:30:00Z'),
    notes: 'Squat, bench, and accessory work.',
  },
  {
    username: 'sam_cycle',
    type: 'Cycling',
    durationMinutes: 95,
    caloriesBurned: 820,
    activityDate: new Date('2026-06-02T06:45:00Z'),
    notes: 'Rolling route with two hill repeats.',
  },
];

const leaderboard = [
  {
    username: 'sam_cycle',
    team: 'Endurance Engine',
    points: 1480,
    rank: 1,
    weeklyMinutes: 310,
  },
  {
    username: 'maria_runner',
    team: 'Cardio Crew',
    points: 1210,
    rank: 2,
    weeklyMinutes: 245,
  },
  {
    username: 'dev_lifter',
    team: 'Strength Squad',
    points: 980,
    rank: 3,
    weeklyMinutes: 205,
  },
];

const workouts = [
  {
    title: 'Progressive 5K Builder',
    focusArea: 'Cardio',
    difficulty: 'Intermediate',
    durationMinutes: 35,
    equipment: ['Running shoes'],
    recommendedForGoal: 'Improve 10K pace',
  },
  {
    title: 'Full Body Strength Circuit',
    focusArea: 'Strength',
    difficulty: 'Beginner',
    durationMinutes: 45,
    equipment: ['Dumbbells', 'Mat'],
    recommendedForGoal: 'Build functional strength',
  },
  {
    title: 'Cycling Endurance Blocks',
    focusArea: 'Endurance',
    difficulty: 'Advanced',
    durationMinutes: 75,
    equipment: ['Bike', 'Heart rate monitor'],
    recommendedForGoal: 'Complete a century ride',
  },
];

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  await Promise.all([
    User.insertMany(users),
    Team.insertMany(teams),
    Activity.insertMany(activities),
    LeaderboardEntry.insertMany(leaderboard),
    Workout.insertMany(workouts),
  ]);

  console.log('OctoFit sample data inserted successfully.');
}

seedDatabase()
  .catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
