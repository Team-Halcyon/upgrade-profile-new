import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import pool from './config/db.js';
import initializeDatabase from './db/init.js';
import { createServer } from 'http';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

dotenv.config();

const app = express();

// Configure CORS with more permissive settings for development
const corsOptions = {
  origin: '*', // Allow all origins temporarily for debugging
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Increase payload limits for file uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API routes
app.use('/api/user', userRoutes);

// Health check endpoint for testing API availability
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Function to kill process on a specific port (Windows specific)
const killProcessOnPort = async (port) => {
  try {
    // Find the process ID using the port
    const { stdout } = await execPromise(`netstat -ano | findstr :${port}`);
    
    if (stdout) {
      // Extract the PID - usually the last number in each row
      const lines = stdout.split('\n').filter(Boolean);
      
      if (lines.length > 0) {
        // Look for the line with LISTENING state (if possible)
        const listeningLine = lines.find(line => line.includes('LISTENING')) || lines[0];
        
        // Get the last column which should be the PID
        const pid = listeningLine.trim().split(/\s+/).pop();
        
        if (pid && !isNaN(parseInt(pid))) {
          console.log(`Found process with PID ${pid} using port ${port}`);
          await execPromise(`taskkill /F /PID ${pid}`);
          console.log(`Killed process with PID ${pid}`);
          // Wait a moment to ensure the port is released
          await new Promise(resolve => setTimeout(resolve, 1000));
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    // If there's no process on that port, or taskkill fails, we can proceed
    console.log(`No existing process found on port ${port} or couldn't kill it`);
    return false;
  }
};

// Start the server using a fixed port
const startServer = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Connected to DB');
    
    // Initialize database tables
    await initializeDatabase();
    console.log('✅ Database tables initialized');

    // Always use port 4000
    const PORT = 4000;
    
    // Try to kill any existing process using port 4000
    try {
      await killProcessOnPort(PORT);
    } catch (err) {
      console.log(`Error checking/killing process on port ${PORT}: ${err.message}`);
    }

    const server = app.listen(PORT, () => {
      console.log(`🚀 Backend server is running on port ${PORT}`);
      console.log(`🔗 API URL: http://localhost:${PORT}/api`);
      console.log(`🔗 CORS: Allowing all origins for development`);
    });

    // Handle graceful shutdown
    const cleanup = () => {
      console.log('Shutting down server...');
      server.close(() => {
        console.log('Server has been shut down');
        process.exit(0);
      });
    };
    
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err);
    process.exit(1);
  }
};

startServer();
