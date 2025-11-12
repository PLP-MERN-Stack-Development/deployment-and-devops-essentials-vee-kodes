// Sentry Configuration for Bug Tracker Application


module.exports = {
  backendConfig: {
    dsn: process.env.SENTRY_DSN_BACKEND,
    integrations: [
      'HttpTracing',
      'MongoIntegration'
    ],
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV || 'development'
  },

  frontendConfig: {
    dsn: import.meta.env.VITE_SENTRY_DSN_FRONTEND,
    integrations: [
      'BrowserTracing',
      'Replay'
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE || 'development'
  }
};