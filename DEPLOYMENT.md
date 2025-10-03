# Deployment Guide for CreatorAI

## Prerequisites
Before deploying to Vercel, ensure you have the following:

1. **Neon Database** - PostgreSQL database URL
2. **Clerk Account** - For authentication
3. **Groq API Key** - For AI content generation
4. **Liveblocks Account** - For real-time collaboration
5. **Jina AI API Key** (Optional) - For deep research features
6. **Gemini API Key** (Optional) - Alternative AI provider

## Environment Variables Setup

### Required Environment Variables

Copy the `.env.example` file and create your own `.env.local` file with the following variables:

```env
# Database Configuration
NEXT_PUBLIC_DRIZZLE_DB_URL=your_neon_database_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# AI API Keys
GROQ_API_KEY=gsk_...
NEXT_PUBLIC_GROQ_API_KEY=gsk_...
GEMINI_API_KEY=AIza... (optional)

# Liveblocks for Collaboration
LIVEBLOCKS_SECRET_KEY=sk_...
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=pk_...

# Jina AI (for deep research) - Optional
JINA_API_KEY=jina_...

# Application URL
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## Vercel Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the repository: `Ai_automation_suite_NewPanel`

### 3. Configure Environment Variables
In Vercel project settings, add all environment variables from your `.env.local` file:

**Settings → Environment Variables → Add**

Important: Add these variables for all environments (Production, Preview, Development)

### 4. Configure Build Settings
Vercel should auto-detect Next.js. Verify:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 5. Deploy
Click "Deploy" and wait for the build to complete.

## Post-Deployment Setup

### 1. Database Migration
After first deployment, run database push:
```bash
npm run db:push
```

### 2. Update Clerk Settings
In your Clerk dashboard:
- Add your Vercel domain to allowed origins
- Update redirect URLs to match your production domain

### 3. Update Liveblocks Settings
In Liveblocks dashboard:
- Add your Vercel domain to allowed origins

### 4. Test Features
Test the following features after deployment:
- ✅ User authentication (sign in/sign up)
- ✅ Template selection and content generation
- ✅ History page
- ✅ Collaborative editor
- ✅ Mind map functionality
- ✅ Splash cursor on non-dashboard pages

## Common Deployment Issues

### Build Errors
- **Issue**: TypeScript errors during build
- **Solution**: Run `npm run build` locally first to catch errors

### Database Connection
- **Issue**: Can't connect to database
- **Solution**: Verify `NEXT_PUBLIC_DRIZZLE_DB_URL` is correctly set

### Authentication Issues
- **Issue**: Clerk authentication not working
- **Solution**: 
  1. Check Clerk environment variables
  2. Verify domain is added in Clerk dashboard
  3. Ensure redirect URLs are updated

### API Rate Limits
- **Issue**: Groq API rate limit exceeded
- **Solution**: The app has fallback mechanisms, but consider upgrading Groq plan

## Optimization Tips

1. **Enable Vercel Analytics** for monitoring
2. **Set up error tracking** with Sentry (optional)
3. **Configure caching** for static assets
4. **Enable Edge Functions** for faster API responses (optional)

## Support

For issues during deployment:
1. Check Vercel build logs
2. Verify all environment variables are set
3. Ensure all API keys are valid and active
4. Check browser console for client-side errors

## Production Checklist

- [ ] All environment variables configured in Vercel
- [ ] Database schema pushed to Neon
- [ ] Clerk authentication domains updated
- [ ] Liveblocks domains whitelisted
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Test all major features
- [ ] Monitor first deployment for errors

---

**Note**: Keep your `.env.local` file secure and never commit it to version control. The `.env.example` file is provided as a template only.
