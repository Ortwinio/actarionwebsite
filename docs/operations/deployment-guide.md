# ActARion Website - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Connect to GitHub**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import the repository: `Ortwinio/ActARionwebsite`

2. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

3. **Environment Variables** (if needed):
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   NEXT_TELEMETRY_DISABLED=1
   ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

### Option 2: Deploy with Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [x] All JSON files are valid (fixed syntax errors)
- [x] TypeScript compilation passes
- [x] ESLint passes without errors
- [x] All pages render correctly in both light/dark themes

### ✅ Features Implemented
- [x] Light/Dark theme system with ThemeProvider
- [x] Blog system with Velite CMS
- [x] Responsive navigation with sticky behavior
- [x] Internationalization (i18n) support
- [x] SEO optimization with metadata
- [x] Contact form with validation
- [x] FAQ page with structured data
- [x] About page with light theme support

### ✅ Performance Optimizations
- [x] Image optimization with Next.js Image component
- [x] Static asset caching configured
- [x] Bundle analysis available (`npm run build:analyze`)
- [x] Code splitting and lazy loading

## 🔧 Configuration Files

### vercel.json
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "src/app/[locale]/page.tsx": {
      "maxDuration": 30
    }
  },
  "redirects": [
    {
      "source": "/",
      "destination": "/en",
      "permanent": false
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ],
  "env": {
    "NEXT_PUBLIC_SITE_URL": "https://www.ActARion.com",
    "NEXT_TELEMETRY_DISABLED": "1"
  }
}
```

### next.config.ts
```typescript
import type { NextConfig } from 'next'
import { VeliteWebpackPlugin } from 'velite'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@heroicons/react']
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/en/blog',
        permanent: true,
        locale: false,
      },
    ]
  },
}

export default nextConfig
```

## 🌐 Domain Configuration

### Custom Domain Setup
1. **Add Domain in Vercel**:
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `ActARion.com`)

2. **DNS Configuration**:
   - Add CNAME record pointing to your Vercel deployment
   - Or use Vercel's automatic DNS configuration

3. **SSL Certificate**:
   - Vercel automatically provides SSL certificates
   - Force HTTPS redirect in project settings

## 📊 Monitoring & Analytics

### Vercel Analytics
- Built-in analytics available in Vercel dashboard
- Performance monitoring and Core Web Vitals tracking

### Google Analytics
- Add Google Analytics tracking code to `src/app/layout.tsx`
- Configure in environment variables

## 🔄 Continuous Deployment

### Automatic Deployments
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests
- Branch deployments for feature development

### Deployment Status
- Monitor deployment status in Vercel dashboard
- Set up notifications for deployment success/failure

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**:
   ```bash
   # Check build locally
   npm run build
   
   # Check for TypeScript errors
   npm run type-check
   ```

2. **JSON Syntax Errors**:
   ```bash
   # Validate JSON files
   node -e "require('./src/lib/dictionaries/en.json')"
   ```

3. **Missing Dependencies**:
   ```bash
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

### Performance Optimization
- Use `npm run build:analyze` to analyze bundle size
- Optimize images and assets
- Implement proper caching strategies

## 📝 Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test light/dark theme switching
- [ ] Check mobile responsiveness
- [ ] Validate contact form functionality
- [ ] Test blog system
- [ ] Verify SEO metadata
- [ ] Check loading performance
- [ ] Test internationalization
- [ ] Validate accessibility features

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Project Repository**: https://github.com/Ortwinio/ActARionwebsite
- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs

## 📞 Support

For deployment issues:
1. Check Vercel deployment logs
2. Review build output for errors
3. Test locally with `npm run build`
4. Contact development team if issues persist

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Maintained by**: ActARion Development Team
