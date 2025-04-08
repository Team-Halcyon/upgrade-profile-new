// Simple script to check if the server is running correctly
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Allow all origins for this test
app.use(cors({ origin: '*' }));

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Test server is running' });
});

// Start server on a test port
const port = 4000;
app.listen(port, () => {
  console.log(`🧪 Test server is running on port ${port}`);
  console.log(`🔗 Test API URL: http://localhost:${port}/api/test`);
  console.log(`💡 Try accessing this URL in your browser to verify the server is working`);
});