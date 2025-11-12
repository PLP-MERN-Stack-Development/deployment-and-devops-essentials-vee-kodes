const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const Sentry = require("@sentry/node");
const connectDB = require('./src/config/db');
const bugRoutes = require('./src/routes/bugRoutes');
const userRoutes = require('./src/routes/userRoutes');
const errorHandler = require('./src/middleware/errorHandler');

dotenv.config();

// Initialize Sentry for error tracking
Sentry.init({
  dsn: process.env.SENTRY_DSN_BACKEND,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || 'development',
});

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

// API Performance monitoring middleware
app.use((req, res, next) => {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const responseTime = Number(end - start) / 1000000; // Convert to milliseconds

    // Log performance metrics in production
    if (process.env.NODE_ENV === 'production') {
      console.log(`[PERF] ${req.method} ${req.path} - ${res.statusCode} - ${responseTime.toFixed(2)}ms`);

      // Alert on slow requests (>1000ms)
      if (responseTime > 1000) {
        console.warn(`[SLOW REQUEST] ${req.method} ${req.path} - ${responseTime.toFixed(2)}ms`);
      }
    }
  });

  next();
});

// Server resource monitoring middleware
app.use((req, res, next) => {
  // Log resource usage every 100 requests in production
  if (process.env.NODE_ENV === 'production' && Math.random() < 0.01) { // 1% sampling
    const memUsage = process.memoryUsage();
    console.log(`[RESOURCES] RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)}MB, Heap: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`);

    // Alert on high memory usage
    const heapUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
    if (heapUsagePercent > 80) {
      console.warn(`[HIGH MEMORY] Heap usage: ${heapUsagePercent.toFixed(2)}%`);
    }
  }

  next();
});

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

    // Get system resource metrics
    const memUsage = process.memoryUsage();
    const uptime = process.uptime();

    // Performance metrics (last 5 minutes average would be ideal, but we'll use current)
    const healthData = {
      status: 'OK',
      message: 'Bug Tracker API health check',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      uptime: {
        seconds: Math.floor(uptime),
        formatted: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`
      },
      database: {
        status: dbStatus[dbState] || 'unknown',
        connected: dbState === 1,
        name: mongoose.connection.name || 'unknown'
      },
      memory: {
        rss: `${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memUsage.external / 1024 / 1024).toFixed(2)} MB`,
        usagePercent: ((memUsage.heapUsed / memUsage.heapTotal) * 100).toFixed(2) + '%'
      },
      performance: {
        nodeVersion: process.version,
        platform: process.platform,
        architecture: process.arch,
        pid: process.pid
      }
    };

    // Check if memory usage is too high
    const heapUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
    if (heapUsagePercent > 90) {
      healthData.status = 'WARNING';
      healthData.message = 'High memory usage detected';
    }

    // Check database connectivity
    if (dbState !== 1) {
      healthData.status = 'ERROR';
      healthData.message = 'Database connection issue';
    }

    const statusCode = healthData.status === 'ERROR' ? 500 :
                      healthData.status === 'WARNING' ? 200 : 200;

    res.status(statusCode).json(healthData);
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
    




