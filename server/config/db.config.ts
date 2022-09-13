import dotenv from 'dotenv';
dotenv.config();

export default {
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USERNAME || 'root',
  PASSWORD: process.env.DB_PASSWORD || 'root',
  DB: process.env.DB_NAME || 'simpleDashboard'
};