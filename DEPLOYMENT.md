# ActARion Website - Production Deployment Guide

## 🚀 Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel
- Domain configured (actarion.com)

### Environment Variables (Set in Vercel Dashboard)

```bash
# Required
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.actarion.com
NEXT_PUBLIC_VERCEL_ENV=production

# Performance
NEXT_TELEMETRY_DISABLED=1

# Security
NEXT_PUBLIC_STRICT_MODE=true

# Analytics (Optional)
# NEXT_PUBLIC_GA_ID=your-google-analytics-id
# NEXT_PUBLIC_GTM_ID=your-google-tag-manager-id
```

### Deployment Steps

1. **Connect Repository**
   - Go to Vercel Dashboard
   - Import your GitHub repository
   - Select the main branch

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Set Environment Variables**
   - Add all variables listed above in Vercel Dashboard
   - Redeploy after adding variables

4. **Domain Configuration**
   - Add custom domain: `www.actarion.com`
   - Configure DNS records as instructed by Vercel
   - Enable HTTPS (automatic with Vercel)

5. **Performance Optimization**
   - Enable Edge Functions for better performance
   - Configure CDN settings
   - Set up monitoring and analytics

### Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Language switching works
- [ ] Forms submit properly
- [ ] Images and videos load
- [ ] SEO meta tags are present
- [ ] Sitemap is accessible
- [ ] Robots.txt is working
- [ ] HTTPS is enabled
- [ ] Performance scores are good
- [ ] Mobile responsiveness works

### Monitoring

- Set up Vercel Analytics
- Configure error tracking
- Monitor Core Web Vitals
- Set up uptime monitoring

### Security

- Enable security headers (configured in vercel.json)
- Set up CSP policies
- Enable HSTS
- Configure rate limiting

### Performance Tips

- Use Vercel's Edge Network
- Enable image optimization
- Configure caching strategies
- Monitor bundle sizes 