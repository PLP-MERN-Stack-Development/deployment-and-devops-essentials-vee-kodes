const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./src/config/db');
const bugRoutes = require('./src/routes/bugRoutes');
const userRoutes = require('./src/routes/userRoutes');
const errorHandler = require('./src/middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/bugs', bugRoutes);
app.use('/api/users', userRoutes);

// Health check endpoints
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Bug Tracker API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/health', async (req, res) => {
  try {
    // Check database connectivity
    const mongoose = require('mongoose');
    const dbState = mongoose.connection.readyState;

    const dbStatus = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    res.status(200).json({
      status: 'OK',
      message: 'Bug Tracker API health check',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: dbStatus[dbState] || 'unknown',
        connected: dbState === 1
      },
      uptime: process.uptime(),
      memory: process.memoryUsage()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Bug Tracker API is running...');
});

// Error handler
app.use(errorHandler);

// Connect to DB and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    })
});
    




