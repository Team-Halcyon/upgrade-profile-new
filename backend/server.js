import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import pool from './config/db.js'; // Import your DB connection pool

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);

// Test DB connection before starting the server
const startServer = async () => {
  try {
    await pool.query('SELECT 1'); // Simple test query
    console.log('✅ Connected to DB');

    app.listen(process.env.PORT || 4000, () => {
      console.log(`🚀 Backend server is running on port ${process.env.PORT || 4000}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err);
    process.exit(1); // Exit the app if DB connection fails
  }
};

startServer();
