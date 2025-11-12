# Bug Tracker MERN Application

A full-stack bug tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to report, track, and manage software bugs efficiently.

## 🚀 **Deployed Application URLs**

### **Frontend Application**
- **URL**: https://plp-mern-bug-tracker.netlify.app
- **Platform**: Netlify
- **Status**: ✅ Live and operational

### **Backend API**
- **URL**: https://mern-bug-tracker-backend.onrender.com
- **Platform**: Render
- **Health Check**: https://mern-bug-tracker-backend.onrender.com/health

## Features

- 🐛 Report new bugs with detailed information
- 📋 View all reported bugs in a clean, organized list
- ✏️ Edit existing bug reports
- 📱 Fully responsive design for all device sizes
- 🔒 Production-ready with security best practices
- ☁️ MongoDB Atlas integration for cloud database
- 🔄 Automated CI/CD pipelines with GitHub Actions
- 📊 Real-time performance monitoring and health checks
- 🚨 Error tracking with Sentry.io integration
- ⏱️ API response time monitoring and alerts
- 💾 Database query performance tracking
- 📈 Server resource monitoring (memory, CPU)
- 🔍 Uptime monitoring with external services

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Vite (build tool)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT for authentication
- bcrypt for password hashing


## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts (Auth)
│   │   └── tests/         # Test files
│   └── public/            # Static assets
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   └── tests/             # Server tests
├── .github/workflows/     # CI/CD pipelines
│   ├── client-ci.yml      # Frontend CI pipeline
│   ├── server-ci.yml      # Backend CI pipeline
│   ├── client-cd.yml      # Frontend deployment
│   └── server-cd.yml      # Backend deployment
├── monitoring/            # Monitoring configuration
│   ├── sentry-config.js           # Error tracking setup
│   ├── monitoring-dashboard.md    # Monitoring guides
│   ├── maintenance-guide.md       # Maintenance procedures
│   └── performance-monitoring.js  # Performance config
└── README-Submission.md   # Project documentation
```


## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Docker (optional, for containerized deployment)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PLP-MERN-Stack-Development/deployment-and-devops-essentials-vee-kodes.git
   cd deployment-and-devops-essentials-vee-kodes
   ```

2. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit the .env file with your MongoDB Atlas connection string and other configurations
   nano .env
   ```

3. **Install Dependencies**

   For the server:
   ```bash
   cd server
   npm install
   ```

   For the client:
   ```bash
   cd ../client
   npm install
   ```

## Configuration

Update the `.env` file in the server directory with your MongoDB Atlas connection string:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/mern-bug-tracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
CLIENT_URL=https://your-frontend-domain.com
```

## Running the Application

### Development Mode

1. **Start the server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the client (in a new terminal):**
   ```bash
   cd client
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Mode

1. **Build the client:**
   ```bash
   cd client
   npm run build
   ```

2. **Start the server:**
   ```bash
   cd server
   npm start
   ```

The application will be available at [http://localhost:5000](http://localhost:5000).


### DevOps & Monitoring
- GitHub Actions (CI/CD)
- Netlify (Frontend hosting)
- Render (Backend hosting)
- Sentry.io (Error tracking)
- UptimeRobot (Uptime monitoring)
- Performance monitoring middleware
- Health check endpoints
- Database query logging

## CI/CD Pipeline

This project includes comprehensive GitHub Actions workflows for continuous integration and deployment:

### Workflows

#### `client-ci.yml` - React Application CI
- **Triggers**: Changes to `client/` directory
- **Actions**: Install dependencies, run linting, execute tests, build application
- **Artifacts**: Uploads build artifacts for deployment

#### `server-ci.yml` - Express.js Backend CI
- **Triggers**: Changes to `server/` directory
- **Actions**: Install dependencies, run linting, execute tests
- **Database**: Uses MongoDB service for testing

#### `client-cd.yml` - Frontend Deployment
- **Triggers**: Successful client CI or push to main
- **Actions**: Build application, deploy to Netlify
- **Environment**: Production environment variables

#### `server-cd.yml` - Backend Deployment
- **Triggers**: Successful server CI or push to main
- **Actions**: Trigger Render deployment, health checks
- **Monitoring**: Automated health check verification

### Setup Instructions

1. **GitHub Secrets Required**:
   ```
   VITE_API_BASE_URL=https://mern-bug-tracker-backend.onrender.com
   NETLIFY_AUTH_TOKEN=your-netlify-auth-token
   NETLIFY_SITE_ID=your-netlify-site-id
   RENDER_WEBHOOK_URL=https://api.render.com/deploy/srv-xxx
   RENDER_APP_URL=https://mern-bug-tracker-backend.onrender.com
   ```

2. **Workflow Triggers**:
   - **CI**: Automatic on push/PR to `main`/`develop`
   - **CD**: Automatic after successful CI completion

## 📸 **CI/CD Pipeline Screenshots**

### **GitHub Actions - All Workflows Passing**
![CI/CD Pipeline Success](./screenshots/github-actions-overview.png)

*Screenshot showing all 4 CI/CD workflows (Client CI, Client CD, Server CI, Server CD) with successful green checkmarks.*

### **Client CI - React Application Testing**
!![Client CI Pipeline](./screenshots/client-ci-workflow.png)

*Screenshot of Client CI workflow showing linting, testing, and build steps all passing.*

### **Client CD - Netlify Deployment**
![Client CD Pipeline](./screenshots/client-cd-deployment.png)

*Screenshot of Client CD workflow showing successful deployment to Netlify.*

### **Server CI - Express.js Backend Testing**
!![Server CI Pipeline](./screenshots/server-ci-testing.png)

*Screenshot of Server CI workflow showing backend testing and validation.*

### **Server CD - Render Deployment**
![Server CD Pipeline](./screenshots/server-cd-deployment.png)

*Screenshot of Server CD workflow showing successful deployment to Render.*

## Deployment

The application is ready for deployment to any cloud platform that supports Node.js and MongoDB Atlas. Make sure to:

1. Set up your MongoDB Atlas database
2. Configure environment variables in production
3. Build the client application: `cd client && npm run build`
4. Start the server: `cd server && npm start`

## API Endpoints

- `GET /api/bugs` - Get all bugs
- `POST /api/bugs` - Create a new bug
- `GET /api/bugs/:id` - Get a specific bug
- `PUT /api/bugs/:id` - Update a bug
- `DELETE /api/bugs/:id` - Delete a bug
- `GET /health` - Health check endpoint

## Testing

### Unit Tests
```bash
# Server unit tests
cd server
npm test

# Client unit tests
cd client
npm run test:unit
```

### Integration Tests
```bash
# Client integration tests
cd client
npm run test:integration
```

### E2E Tests
```bash
# End-to-end tests
cd client
npm run test:e2e
```

## Monitoring & Health Checks

### Health Check Endpoints
- **Basic Health**: `GET /health` - Server status and uptime
- **Detailed Health**: `GET /api/health` - Database connectivity, memory usage, and system metrics

### Performance Monitoring
- **API Response Times**: All requests logged with execution time
- **Slow Request Alerts**: Automatic warnings for requests >1000ms
- **Memory Usage Tracking**: RSS, heap, and external memory monitoring
- **Database Query Logging**: All MongoDB operations tracked in production

### Error Tracking & Monitoring
- **Sentry.io Integration**: Frontend and backend error tracking
- **Real-time Alerts**: Error notifications and performance insights
- **Session Replay**: User interaction recording for debugging
- **UptimeRobot**: External uptime monitoring (5-minute intervals)

### System Resource Monitoring
- **Memory Usage Alerts**: Warnings when heap usage >80%
- **Server Metrics**: CPU, platform, architecture tracking
- **Database Connectivity**: Real-time connection status monitoring
- **Uptime Tracking**: Formatted uptime display and statistics

## Security Features

- CORS configuration for cross-origin requests
- Input validation and sanitization
- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- Helmet.js for security headers
- Environment variable protection
- Production-ready error handling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
