// Performance Monitoring Configuration
// This file documents the performance monitoring features implemented

/*
PERFORMANCE MONITORING FEATURES IMPLEMENTED:

1. API Response Time Tracking
   - Location: server/server.js (middleware)
   - Tracks: Request method, path, status code, response time
   - Alerts: Slow requests (>1000ms) logged as warnings
   - Sampling: All requests in production

2. Server Resource Monitoring
   - Location: server/server.js (middleware)
   - Tracks: Memory usage (RSS, Heap), CPU metrics
   - Sampling: 1% of requests to avoid log spam
   - Alerts: High memory usage (>80%) logged as warnings

3. Database Query Monitoring
   - Location: server/src/config/db.js
   - Tracks: All MongoDB queries with execution details
   - Format: [DB QUERY] timestamp - collection.method query document
   - Environment: Production only

4. Health Check Endpoint Enhancement
   - Location: server/server.js (/api/health)
   - Metrics: Uptime, memory usage, database status
   - Status: OK/WARNING/ERROR based on thresholds
   - Format: JSON with detailed system information

PERFORMANCE THRESHOLDS:
- API Response Time: <1000ms (warning if exceeded)
- Memory Usage: <80% heap usage (warning if exceeded)
- Database Connection: Must be connected (error if not)
- Uptime: Monitored but no specific threshold

LOGGING FORMAT:
- [PERF] METHOD PATH - STATUS - TIMEms
- [SLOW REQUEST] METHOD PATH - TIMEms
- [RESOURCES] RSS: X.XMB, Heap: X.XMB
- [HIGH MEMORY] Heap usage: XX.XX%
- [DB QUERY] TIMESTAMP - collection.method query document

MONITORING DASHBOARD:
- Use the /api/health endpoint for programmatic monitoring
- Check server logs for performance metrics
- Set up alerts based on log patterns
- Monitor trends over time for optimization opportunities
*/

module.exports = {
  thresholds: {
    slowRequestMs: 1000,
    highMemoryPercent: 80,
    criticalMemoryPercent: 90
  },

  monitoring: {
    apiResponseTime: true,
    serverResources: true,
    databaseQueries: true,
    healthChecks: true
  },

  logging: {
    performance: '[PERF]',
    slowRequest: '[SLOW REQUEST]',
    resources: '[RESOURCES]',
    highMemory: '[HIGH MEMORY]',
    dbQuery: '[DB QUERY]'
  }
};