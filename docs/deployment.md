# Deployment Guide

Comprehensive instructions for deploying Workflow Hub to production environments.

## Deployment Options

Workflow Hub supports multiple deployment platforms and strategies to meet different requirements and infrastructure preferences.

### Supported Platforms
- **Vercel** (Recommended) - Optimized for React applications
- **Netlify** - Static site hosting with edge functions
- **AWS** - Full infrastructure control
- **Docker** - Containerized deployment

## Vercel Deployment (Recommended)

### Automatic Deployment

1. **Connect Repository**
   ```bash
   # Push code to GitHub
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Node.js Version: 18.x

3. **Environment Variables**
   ```bash
   # Production environment variables
   VITE_APP_TITLE="Workflow Hub"
   VITE_API_URL="https://api.workflow-hub.com"
   VITE_ENABLE_ANALYTICS=true
   VITE_DEBUG_MODE=false
   ```

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy project
vercel

# Set environment variables
vercel env add VITE_APP_TITLE
vercel env add VITE_API_URL

# Deploy to production
vercel --prod
```

## Netlify Deployment

### Configuration

1. **Build Settings**
   - Base directory: `/` (root)
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables**
   ```bash
   VITE_APP_TITLE="Workflow Hub"
   VITE_API_URL="https://api.workflow-hub.com"
   VITE_ENABLE_ANALYTICS=true
   ```

3. **Deploy Process**
   ```bash
   # Connect repository to Netlify
   # Configure build settings in Netlify dashboard
   # Add environment variables in site settings
   # Deploy automatically on git push
   ```

## Docker Deployment

### Dockerfile Configuration

```dockerfile
# Multi-stage build for optimal image size
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Commands

```bash
# Build Docker image
docker build -t workflow-hub .

# Run container
docker run -p 3000:80 workflow-hub

# Deploy to Docker registry
docker tag workflow-hub registry.example.com/workflow-hub:latest
docker push registry.example.com/workflow-hub:latest
```

## AWS Deployment

### S3 + CloudFront Setup

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Configure AWS CLI**
   ```bash
   aws configure
   # Enter AWS credentials and default region
   ```

3. **Deploy to S3**
   ```bash
   # Create S3 bucket
   aws s3 mb s3://workflow-hub-bucket

   # Enable static website hosting
   aws s3 website s3://workflow-hub-bucket --index-document index.html

   # Upload files
   aws s3 sync dist/ s3://workflow-hub-bucket --delete

   # Set cache control headers
   aws s3 cp s3://workflow-hub-bucket/index.html s3://workflow-hub-bucket/index.html --metadata-directive REPLACE --cache-control max-age=31536000 --content-type text/html
   ```

4. **Configure CloudFront**
   - Create CloudFront distribution
   - Set S3 bucket as origin
   - Configure SSL certificate
   - Set up custom domain (optional)

### Elastic Beanstalk (Alternative)

```bash
# Initialize Elastic Beanstalk
eb init workflow-hub

# Create deployment package
npm run build
zip -r deployment-package.zip dist/ package.json package-lock.json

# Deploy to Elastic Beanstalk
eb create production-env
eb deploy
```

## Performance Optimization

### Asset Optimization

#### Image Optimization
```bash
# Install image optimization tools
npm install --save-dev sharp

# Configure Vite for image optimization
# vite.config.ts
export default {
  plugins: [
    // Image optimization plugin
  ]
}
```

#### Bundle Analysis
```bash
# Analyze bundle size
npm install --save-dev vite-bundle-analyzer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true
    })
  ]
}
```

### CDN Configuration

#### Static Asset CDN
- Upload assets to CloudFlare R2 or AWS CloudFront
- Update asset URLs in build configuration
- Configure cache headers for optimal performance

#### Font Loading Optimization
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
```

## Environment Configuration

### Development Environment
```bash
# .env.local
VITE_APP_TITLE="Workflow Hub (Dev)"
VITE_API_URL="http://localhost:3001/api"
VITE_ENABLE_ANALYTICS=false
VITE_DEBUG_MODE=true
```

### Staging Environment
```bash
# .env.staging
VITE_APP_TITLE="Workflow Hub (Staging)"
VITE_API_URL="https://staging-api.workflow-hub.com"
VITE_ENABLE_ANALYTICS=true
VITE_DEBUG_MODE=false
```

### Production Environment
```bash
# .env.production
VITE_APP_TITLE="Workflow Hub"
VITE_API_URL="https://api.workflow-hub.com"
VITE_ENABLE_ANALYTICS=true
VITE_DEBUG_MODE=false
```

## Monitoring and Analytics

### Performance Monitoring

#### Core Web Vitals
```javascript
// Web vitals monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

#### Real User Monitoring (RUM)
```bash
# Integrate with analytics service
npm install @vercel/analytics

# Add to main.tsx
import { Analytics } from '@vercel/analytics/react';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
  document.getElementById('root')
);
```

### Error Tracking

#### Sentry Integration
```bash
npm install @sentry/react @sentry/tracing

# Configure in main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

## Security Considerations

### Content Security Policy (CSP)

```html
<!-- Add to index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  font-src 'self' data:;
  img-src 'self' data: https:;
  connect-src 'self' https://api.workflow-hub.com;
">
```

### HTTPS Configuration

#### SSL Certificate Setup
- Use Let's Encrypt for free SSL certificates
- Configure automatic renewal
- Set up HTTP to HTTPS redirects

#### Security Headers
```bash
# Netlify _headers file
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'
```

## Domain Configuration

### Custom Domain Setup

#### Vercel Custom Domain
1. Add domain in Vercel dashboard
2. Configure DNS records
3. Set up SSL certificate
4. Configure redirects

#### Netlify Custom Domain
1. Add domain in Netlify dashboard
2. Update DNS records
3. Configure HTTPS settings
4. Set up domain redirects

### DNS Configuration
```bash
# Required DNS records
Type: A
Name: @
Value: 76.76.21.21  # Vercel IP

Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: TXT
Name: @
Value: "vercel-verification=..."
```

## Performance Testing

### Lighthouse CI

```bash
# Install Lighthouse CI
npm install -g @lhci/cli@0.11.0

# Configure Lighthouse CI
lhci autorun

# Set up GitHub Actions for automated testing
# .github/workflows/lighthouse.yml
```

### Bundle Size Monitoring

```bash
# Bundle size monitoring with BundleWatch
npm install --save-dev bundlewatch

# Configure bundlewatch.config.js
module.exports = {
  files: [
    {
      path: 'dist/**/*.js',
      maxSize: '150 kB'
    }
  ],
  defaultCompression: 'gzip'
};
```

## Rollback Procedures

### Emergency Rollback

#### Vercel Rollback
1. Navigate to Vercel dashboard
2. Select project and deployment
3. Click "Rollback" to previous version
4. Confirm rollback deployment

#### Manual Rollback
```bash
# Deploy specific commit
git checkout <previous-commit>
npm run build
vercel --prod

# Or deploy specific branch
git checkout <stable-branch>
npm run build
vercel --prod
```

### Data Rollback Considerations
- Ensure database backups are current
- Test rollback in staging environment first
- Notify users of potential service interruption
- Monitor application after rollback

## Cost Optimization

### Hosting Costs

#### Vercel Optimization
- Use hobby plan for small projects
- Optimize build minutes usage
- Configure automatic scaling
- Monitor bandwidth usage

#### Netlify Optimization
- Use build minute allocation efficiently
- Configure form handling limits
- Monitor function execution time

### Performance Budget
- **Bundle size**: < 150 kB gzipped
- **Image size**: < 100 kB per image
- **API calls**: < 50 per page load
- **Third-party scripts**: Minimize external dependencies

## Troubleshooting Deployment

### Common Issues

#### Build Failures
```bash
# Check build logs
vercel logs

# Debug build locally
npm run build
npm run preview

# Check for TypeScript errors
npx tsc --noEmit
```

#### Runtime Errors
```bash
# Check browser console
# Verify environment variables
# Test API endpoints
# Check CDN configuration
```

#### Performance Issues
```bash
# Analyze bundle size
npm run build -- --analyze

# Check Core Web Vitals
# Monitor network requests
# Optimize images and assets
```

### Support Channels

#### Development Support
- Check deployment logs in platform dashboard
- Review environment variable configuration
- Test with different browsers and devices
- Consult platform documentation

#### Production Issues
- Monitor error tracking service
- Check performance monitoring dashboards
- Review user feedback and reports
- Coordinate with development team

## Compliance and Legal

### GDPR Compliance
- Implement proper data handling
- Configure cookie consent
- Set up data retention policies
- Provide user data export functionality

### Accessibility Compliance
- Maintain WCAG 2.1 AA standards
- Regular accessibility audits
- Screen reader compatibility testing
- Keyboard navigation support

## Maintenance

### Regular Tasks

#### Weekly
- Review performance metrics
- Check for security vulnerabilities
- Update dependencies
- Monitor user feedback

#### Monthly
- Full accessibility audit
- Performance optimization review
- Content freshness check
- Backup verification

#### Quarterly
- Major dependency updates
- Architecture review
- Security assessment
- User experience evaluation

### Update Procedures

#### Dependency Updates
```bash
# Check for outdated packages
npm outdated

# Update packages safely
npm update

# Test updates thoroughly
npm run test
npm run build
```

#### Security Updates
```bash
# Audit vulnerabilities
npm audit

# Fix security issues
npm audit fix

# Update to latest secure versions
npm update
```

## Support and Contact

For deployment support:
- Check platform documentation first
- Review deployment logs and error messages
- Test in staging environment before production
- Contact platform support for infrastructure issues

---

*This deployment guide ensures reliable, scalable, and secure production deployment of Workflow Hub across multiple platforms and environments.*
