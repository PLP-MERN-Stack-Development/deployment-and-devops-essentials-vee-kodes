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
    




