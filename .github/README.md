# GitHub Actions CI/CD Workflows

This directory contains GitHub Actions workflows for continuous integration and deployment of the MERN Bug Tracker application.

## 📋 Workflows Overview

### 1. **Client CI** (`client-ci.yml`)
- **Triggers**: Changes to `client/` directory
- **Purpose**: Test and build React application
- **Actions**: Install deps, lint, test, build, upload artifacts

### 2. **Server CI** (`server-ci.yml`)
- **Triggers**: Changes to `server/` directory
- **Purpose**: Test Express.js backend
- **Actions**: Install deps, lint, test with MongoDB service

### 3. **Client CD** (`client-cd.yml`)
- **Triggers**: Successful client CI or push to `main`
- **Purpose**: Deploy React app to Netlify
- **Actions**: Build, deploy to Netlify, post deployment comments

### 4. **Server CD** (`server-cd.yml`)
- **Triggers**: Successful server CI or push to `main`
- **Purpose**: Deploy Express.js to Render
- **Actions**: Trigger Render webhook, health checks, notifications

## 🔧 Setup Instructions

### 1. **Repository Secrets**
Add these secrets in your GitHub repository settings:

#### For Client Deployment (Netlify):
```
VITE_API_BASE_URL=https://your-render-app.onrender.com
NETLIFY_AUTH_TOKEN=your-netlify-auth-token
NETLIFY_SITE_ID=your-netlify-site-id
```

#### For Server Deployment (Render):
```
RENDER_WEBHOOK_URL=https://api.render.com/deploy/srv-your-service-id
RENDER_APP_URL=https://your-app.onrender.com
```


### 2. **Branch Protection**
Configure branch protection rules:
- Require CI to pass before merging
- Require up-to-date branches
- Include administrators in restrictions

### 3. **Environment Setup**
Create environments in GitHub:
- **Production**: For main branch deployments

## 🚀 Workflow Triggers

### Automatic Triggers:
- **Push to main**: Full CI/CD pipeline
- **Pull requests**: CI testing only
- **Directory changes**: CI workflows trigger on relevant code changes

### Manual Triggers:
- **Workflow dispatch**: Manual deployment option
- **Schedule**: Nightly builds (can be configured)

## 📊 Monitoring Workflows

### Check Workflow Status:
1. Go to **Actions** tab in your repository
2. Click on the latest workflow run
3. View logs for each job
4. Check deployment status

### Common Issues:
- **Build failures**: Check Node.js version compatibility
- **Test failures**: Review test configurations
- **Deployment failures**: Verify secrets and API keys

## 🔄 Rollback Strategy

### Automatic Rollback:
- Previous deployment remains active if new deployment fails
- GitHub deployments API tracks deployment status

### Manual Rollback:
1. Go to Render dashboard (backend) or Netlify dashboard (frontend)
2. Roll back to previous deployment
3. Update GitHub deployment status

## 📈 Performance Optimization

### Caching:
- **npm cache**: Speeds up dependency installation
- **Build artifacts**: Cached between workflow runs
- **Docker layers**: Optimized for faster builds

### Parallel Jobs:
- Backend and frontend tests run in parallel
- Independent build processes
- Concurrent deployments

## 🛠️ Customization

### Adding New Tests:
```yaml
- name: Run integration tests
  run: npm run test:integration
  working-directory: server
```

### Adding Code Quality Checks:
```yaml
- name: Run code quality checks
  run: npm run quality
  working-directory: client
```

### Adding Notifications:
```yaml
- name: Send Slack notification
  uses: slackapi/slack-github-action@v1.24.0
  with:
    channel-id: 'deployments'
    slack-message: "Deployment completed successfully! 🎉"
```

## 📚 Best Practices

- **Keep workflows simple**: Complex workflows are harder to debug
- **Use caching**: Reduces build times and costs
- **Test locally first**: Ensure workflows work before pushing
- **Monitor costs**: GitHub Actions has usage limits
- **Document changes**: Update this README when modifying workflows

## 🔍 Troubleshooting

### Workflow Not Triggering:
- Check branch names in triggers
- Verify file paths and syntax
- Check repository permissions

### Build Failures:
- Review build logs for specific errors
- Check Node.js version compatibility
- Verify dependency versions

### Deployment Issues:
- Confirm secrets are set correctly
- Check API endpoints and tokens
- Review deployment platform logs