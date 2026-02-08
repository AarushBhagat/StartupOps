# Production Deployment Guide

## 🚀 **Deploy to Production**

This guide covers deploying StartupOps backend to production for real users.

---

## ✅ **Pre-Deployment Checklist**

- [ ] All database scripts tested in development
- [ ] Edge Functions working locally
- [ ] Frontend connected and tested
- [ ] OpenAI API key with credits
- [ ] Domain name ready (optional)
- [ ] Backup/restore strategy planned
- [ ] Monitoring tools selected

---

## 🎯 **Deployment Steps**

### **1. Production Supabase Project** (10 min)

#### Create separate production project:
```
1. Go to Supabase Dashboard
2. Create NEW project (don't use dev!)
3. Name: "StartupOps-Production"
4. Select closest region to users
5. Choose plan:
   - Free: Testing/MVP (500MB DB, 1GB storage)
   - Pro: Production ($25/mo, unlimited requests)
6. Save database password securely
```

### **2. Environment Variables** (5 min)

#### Update Frontend production `.env`:
```env
# Production Supabase
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-prod-anon-key

# Optional Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
```

#### Set secrets in Supabase:
```bash
# Link to production
supabase link --project-ref your-prod-ref

# Set OpenAI key
supabase secrets set OPENAI_API_KEY=sk-prod-xxx

# Optional: Set other secrets
supabase secrets set STRIPE_SECRET_KEY=sk_live_xxx
supabase secrets set SENDGRID_API_KEY=SG.xxx
```

---

### **3. Deploy Database** (15 min)

#### Run all SQL scripts in production SQL Editor:

```
1. Go to Production Dashboard → SQL Editor

2. Run in exact order:
   ✅ 01_schema.sql
   ✅ 02_triggers.sql
   ✅ 03_rls_policies.sql
   ✅ 04_storage.sql
   ⚠️  Skip 05_seed_data.sql (test data only!)

3. Verify:
   - Table Editor shows all 12 tables
   - Storage shows 3 buckets
   - No error messages
```

---

### **4. Deploy Edge Functions** (10 min)

```bash
# Link to production (if not already)
supabase link --project-ref your-prod-ref

# Deploy all functions
supabase functions deploy ai-task-generator
supabase functions deploy ai-pitch-analyzer
supabase functions deploy ai-insights-generator

# Verify deployment
supabase functions list
```

**Test functions:**
```bash
# Test task generator
curl -i --location --request POST \
  'https://your-prod-ref.supabase.co/functions/v1/ai-task-generator' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"prompt":"Launch marketing campaign","startupId":"test"}'
```

---

### **5. Configure Auth** (15 min)

#### Email Templates:
```
1. Go to Authentication → Email Templates
2. Customize:
   - Confirmation email
   - Password reset
   - Magic link
3. Add your branding/logo
4. Set sender name: "StartupOps"
```

#### Auth Settings:
```
1. Go to Authentication → Settings
2. Configure:
   - Site URL: https://yourdomain.com
   - Redirect URLs: 
     - https://yourdomain.com/auth/callback
     - http://localhost:5173/auth/callback (for dev)
   - Enable email confirmations: ✅
   - Minimum password length: 8
```

#### Email Provider (Optional but recommended):
```
1. Go to Authentication → Settings → SMTP Settings
2. Configure SendGrid/AWS SES/Postmark:
   - Host: smtp.sendgrid.net
   - Port: 587
   - Username: apikey
   - Password: your-sendgrid-api-key
   - Sender email: noreply@yourdomain.com
```

---

### **6. Configure Storage** (5 min)

#### Set file size limits:
```
1. Go to Storage → Settings
2. Set max file size: 50MB (adjust as needed)
3. Configure CORS:
   - Allowed origins: https://yourdomain.com
```

#### Optimize for production:
```sql
-- Run in SQL Editor
-- Set up automatic cleanup of old files
CREATE OR REPLACE FUNCTION cleanup_old_storage()
RETURNS void AS $$
BEGIN
  -- Delete files older than 90 days from temp folders
  DELETE FROM storage.objects
  WHERE bucket_id = 'documents'
  AND name LIKE '%/temp/%'
  AND created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-storage', '0 3 * * *', 'SELECT cleanup_old_storage()');
```

---

### **7. Frontend Deployment** (20 min)

#### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Go to frontend folder
cd Frontend

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

#### Option B: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod

# Set env vars in Netlify dashboard
```

#### Option C: AWS Amplify / Azure Static Web Apps / CloudFlare Pages
Follow their respective documentation for React/Vite deployment.

---

### **8. Custom Domain** (30 min)

#### For Supabase (optional):
```
1. Go to Project Settings → Custom Domains
2. Add domain: api.yourdomain.com
3. Add DNS records (Supabase provides)
4. Wait for SSL (5-10 min)
5. Update VITE_SUPABASE_URL in frontend
```

#### For Frontend:
```
1. In deployment platform (Vercel/Netlify):
   - Go to Domains
   - Add custom domain
   - Update DNS records
   - Wait for SSL
```

---

### **9. Set Up Monitoring** (15 min)

#### Supabase Logging:
```
1. Go to Logs → Query Performance
2. Set up alerts for:
   - Slow queries (>1000ms)
   - High error rate (>5%)
   - Database size (>80% quota)
```

#### Application Monitoring (Optional):
```javascript
// Install Sentry for error tracking
npm install @sentry/react

// Add to Frontend/src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: "production",
  tracesSampleRate: 1.0,
});
```

#### Uptime Monitoring:
- [UptimeRobot](https://uptimerobot.com/) (Free)
- [Pingdom](https://www.pingdom.com/)
- [Better Uptime](https://betteruptime.com/)

---

### **10. Database Backups** (10 min)

#### Automatic Backups (Supabase Pro):
```
Supabase Pro includes:
- Daily backups (retained 7 days)
- Point-in-time recovery
- Download backups
```

#### Manual Backup:
```bash
# Backup using pg_dump (requires Supabase CLI)
supabase db dump -f backup.sql

# Or download from dashboard:
# Settings → Database → Backups → Download
```

#### Restore:
```bash
# Restore from backup
supabase db reset --db-url "postgresql://..."

# Or via SQL Editor:
# Copy contents of backup.sql and run
```

---

### **11. Performance Optimization** (30 min)

#### Database Indexes:
```sql
-- Add indexes for common queries
CREATE INDEX idx_tasks_startup_status ON tasks(startup_id, status);
CREATE INDEX idx_activity_log_created ON activity_log(startup_id, created_at DESC);

-- Analyze query performance
EXPLAIN ANALYZE
SELECT * FROM tasks WHERE startup_id = 'xxx' AND status = 'todo';
```

#### Edge Function Performance:
```typescript
// Use connection pooling in Edge Functions
import { createClient } from '@supabase/supabase-js'

// Create client once, reuse
const supabase = createClient(url, key, {
  db: {
    schema: 'public',
  },
  auth: {
    persistSession: false, // Don't persist in Edge Functions
  },
})
```

#### Frontend Optimization:
```bash
# Analyze bundle size
npm run build
npx vite-bundle-visualizer

# Optimize images
npm install vite-plugin-imagemin
```

---

### **12. Security Hardening** (20 min)

#### RLS Double-Check:
```sql
-- Verify RLS is enabled on all tables
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND rowsecurity = false;

-- Should return empty!
```

#### API Key Security:
```
1. Never commit .env files
2. Rotate keys if exposed
3. Use service_role key only server-side
4. Monitor API usage in Supabase
```

#### Rate Limiting:
```typescript
// Add to Edge Functions
const rateLimiter = new Map();

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const userRequests = rateLimiter.get(userId) || [];
  
  // Remove old requests (>1 minute)
  const recentRequests = userRequests.filter(
    (time: number) => now - time < 60000
  );
  
  if (recentRequests.length >= 10) {
    return false; // Rate limited
  }
  
  recentRequests.push(now);
  rateLimiter.set(userId, recentRequests);
  return true;
}
```

---

### **13. Payment Integration (Optional)** (60 min)

If using Stripe for subscriptions:

```bash
# Install Stripe CLI
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook

# Deploy webhook handler
supabase functions deploy stripe-webhook

# Configure in Stripe Dashboard
# Webhooks → Add endpoint
# URL: https://your-ref.supabase.co/functions/v1/stripe-webhook
# Events: customer.subscription.created, updated, deleted
```

---

## ✅ **Post-Deployment Checklist**

- [ ] Can sign up with real email
- [ ] Email confirmation works
- [ ] Can create startup
- [ ] Can create tasks
- [ ] AI functions respond (check logs)
- [ ] File uploads work
- [ ] Role permissions enforced
- [ ] Domain SSL valid
- [ ] Monitoring active
- [ ] Backups configured

---

## 📊 **Monitoring Checklist**

Monitor these metrics:

### Database:
- [ ] Query performance (<500ms avg)
- [ ] Connection pool usage (<80%)
- [ ] Database size
- [ ] Slow query count

### Edge Functions:
- [ ] Invocation count
- [ ] Error rate (<1%)
- [ ] Average duration
- [ ] Timeout rate (<0.1%)

### Auth:
- [ ] Signup success rate
- [ ] Login success rate
- [ ] Email delivery rate

### Storage:
- [ ] Upload success rate
- [ ] Storage usage
- [ ] Bandwidth usage

---

## 🐛 **Production Troubleshooting**

### High Edge Function Costs:
```
1. Check invocation logs
2. Add caching for repeated requests
3. Reduce token limits in OpenAI calls
4. Add request debouncing in frontend
```

### Database Performance:
```
1. Check slow query log
2. Add missing indexes
3. Optimize n+1 queries
4. Enable query result caching
```

### Auth Issues:
```
1. Check email delivery logs
2. Verify SMTP settings
3. Check rate limits
4. Verify redirect URLs
```

---

## 💰 **Cost Optimization**

### Supabase (Pro = $25/mo):
- Database: 8GB (upgrade as needed)
- Storage: 100GB (cleanup old files)
- Bandwidth: 250GB (optimize images)

### OpenAI (~$20-50/mo):
- Use GPT-4-turbo (cheaper than GPT-4)
- Set max_tokens limits
- Cache common responses
- Batch requests when possible

### Total: ~$45-75/month for production

**Tips to reduce:**
- Start with Free tier for MVP
- Add caching layer (Redis)
- Use smaller AI models for simple tasks
- Compress/optimize assets

---

## 🔄 **Updates & Maintenance**

### Database Migrations:
```bash
# Create migration
supabase migration new add_new_column

# Test locally
supabase db reset

# Deploy to production
supabase db push
```

### Edge Function Updates:
```bash
# Test locally
supabase functions serve ai-task-generator

# Deploy to production
supabase functions deploy ai-task-generator
```

### Zero-Downtime Deployment:
1. Test in staging environment first
2. Deploy database changes (backward compatible)
3. Deploy Edge Functions
4. Deploy frontend
5. Monitor error rates

---

## 📞 **Support Resources**

- Supabase Status: [status.supabase.com](https://status.supabase.com)
- Supabase Discord: [discord.supabase.com](https://discord.supabase.com)
- Production Issues: support@supabase.com
- OpenAI Status: [status.openai.com](https://status.openai.com)

---

**Ready for production? Ship it! 🚀**
