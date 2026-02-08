# Database Schema Documentation

## Overview

StartupOps uses **PostgreSQL** (via Supabase) as the primary database. The schema is designed for a multi-tenant SaaS platform where users can create and manage multiple startups with role-based access control.

---

## 🗂️ **Database Tables**

### 1. **profiles**
Extends Supabase's built-in auth.users table with additional user information.

```sql
profiles (
  id UUID PRIMARY KEY,              -- References auth.users(id)
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'team',   -- 'leader' or 'team'
  avatar_url TEXT,
  phone TEXT,
  bio TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

**Role-based access:**
- `leader` - Can create startups, access analytics, generate AI insights
- `team` - Can be added to startups, work on tasks

---

### 2. **startups**
Main table for startup organizations.

```sql
startups (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  description TEXT,
  stage startup_stage,              -- idea, mvp, launched, growing, scaling
  owner_id UUID REFERENCES profiles(id),
  logo_url TEXT,
  website TEXT,
  founded_date DATE,
  location TEXT,
  pitch_deck_url TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

---

### 3. **startup_members**
Junction table for startup team members with role-based permissions.

```sql
startup_members (
  id UUID PRIMARY KEY,
  startup_id UUID REFERENCES startups(id),
  user_id UUID REFERENCES profiles(id),
  role member_role,                 -- owner, admin, member
  permissions JSONB,                -- {can_edit, can_delete, can_invite}
  invited_by UUID REFERENCES profiles(id),
  joined_at TIMESTAMPTZ,
  UNIQUE(startup_id, user_id)
)
```

**Permission levels:**
- `owner` - Full control, can delete startup
- `admin` - Can manage members and settings
- `member` - Can work on tasks and view data

---

### 4. **subscriptions**
Manages user/startup subscription plans.

```sql
subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  startup_id UUID REFERENCES startups(id),
  plan subscription_plan,           -- free, pro, enterprise
  status subscription_status,       -- active, cancelled, expired, trialing
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

**Plans:**
- `free` - Limited features, max 1 startup
- `pro` - Unlimited startups, AI features
- `enterprise` - Custom features, white-label

---

### 5. **milestones**
Major goals/phases for a startup.

```sql
milestones (
  id UUID PRIMARY KEY,
  startup_id UUID REFERENCES startups(id),
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  progress INTEGER (0-100),
  status milestone_status,          -- not_started, in_progress, completed, delayed
  is_delayed BOOLEAN,
  color TEXT,
  order_index INTEGER,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

**Auto-calculated progress:**
- Progress = (completed tasks / total tasks) × 100
- Status updates automatically based on progress

---

### 6. **tasks**
Individual work items assigned to team members.

```sql
tasks (
  id UUID PRIMARY KEY,
  startup_id UUID REFERENCES startups(id),
  milestone_id UUID REFERENCES milestones(id),
  title TEXT NOT NULL,
  description TEXT,
  status task_status,               -- todo, in-progress, review, done, cancelled
  priority task_priority,           -- low, medium, high, urgent
  assignee_id UUID REFERENCES profiles(id),
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  estimated_hours DECIMAL,
  actual_hours DECIMAL,
  tags TEXT[],
  attachments JSONB,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

**Automatic triggers:**
- Sets `completed_at` when status → 'done'
- Updates milestone progress on task completion
- Logs activity to activity_log

---

### 7. **metrics**
Financial and growth metrics for startups.

```sql
metrics (
  id UUID PRIMARY KEY,
  startup_id UUID REFERENCES startups(id),
  mrr DECIMAL(12,2),                -- Monthly Recurring Revenue
  arr DECIMAL(12,2),                -- Annual Recurring Revenue (auto-calculated)
  users_count INTEGER,
  active_users INTEGER,
  growth_rate DECIMAL,              -- Percentage
  churn_rate DECIMAL,               -- Percentage
  burn_rate DECIMAL,                -- Monthly burn
  runway_months INTEGER,
  cash_balance DECIMAL,
  customer_acquisition_cost DECIMAL,
  lifetime_value DECIMAL,
  recorded_at TIMESTAMPTZ,          -- Snapshot timestamp
  created_at TIMESTAMPTZ
)
```

**Used for:**
- Analytics dashboard
- AI insights generation
- Investor reports

---

### 8. **investor_hub**
Fundraising readiness and investor materials.

```sql
investor_hub (
  id UUID PRIMARY KEY,
  startup_id UUID REFERENCES startups(id) UNIQUE,
  pitch_score INTEGER (0-100),
  pitch_deck_url TEXT,
  problem_defined BOOLEAN,
  solution_articulated BOOLEAN,
  team_complete BOOLEAN,
  traction_metrics JSONB,
  competitive_analysis BOOLEAN,
  financials_ready BOOLEAN,
  customer_testimonials INTEGER,
  due_diligence_docs JSONB,
  fundraising_stage fundraising_stage,
  target_amount DECIMAL,
  raised_amount DECIMAL,
  last_updated TIMESTAMPTZ,
  created_at TIMESTAMPTZ
)
```

---

### 9. **feedback**
User feedback and feature requests.

```sql
feedback (
  id UUID PRIMARY KEY,
  startup_id UUID REFERENCES startups(id),
  user_id UUID REFERENCES profiles(id),
  type feedback_type,               -- bug, feature, improvement, question, other
  category TEXT,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  status feedback_status,           -- open, in-progress, resolved, closed
  priority task_priority,
  attachments JSONB,
  admin_response TEXT,
  responded_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

---

### 10. **ai_insights**
AI-generated insights and recommendations.

```sql
ai_insights (
  id UUID PRIMARY KEY,
  startup_id UUID REFERENCES startups(id),
  insight_type insight_type,        -- performance, warning, suggestion, milestone, trend
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority task_priority,
  category TEXT,
  action_items TEXT[],
  is_read BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,
  dismissed_by UUID REFERENCES profiles(id),
  dismissed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
)
```

**Generated by:**
- AI Insights Edge Function
- Pitch Analyzer
- Task completion patterns
- Metric trends

---

### 11. **user_settings**
Per-user application preferences.

```sql
user_settings (
  id UUID PRIMARY KEY REFERENCES profiles(id),
  theme TEXT DEFAULT 'system',      -- light, dark, system
  notifications_enabled BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  task_reminders BOOLEAN DEFAULT true,
  weekly_digest BOOLEAN DEFAULT true,
  language TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'UTC',
  preferences JSONB,                -- Custom settings
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

---

### 12. **activity_log**
Audit trail of all important actions.

```sql
activity_log (
  id UUID PRIMARY KEY,
  startup_id UUID REFERENCES startups(id),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,             -- 'created tasks', 'updated startup', etc.
  entity_type TEXT,                 -- 'tasks', 'milestones', etc.
  entity_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ
)
```

---

## 🔐 **Security (Row Level Security)**

Every table has RLS policies that ensure:
- Users can only see data from their startups
- Proper role-based permissions (owner/admin/member)
- No unauthorized access

**Key policies:**
- Users can only view profiles of team members
- Startup data requires membership
- Owners/admins have elevated permissions
- AI insights are private to each startup

---

## ⚡ **Automatic Triggers**

### 1. **Auto-create profile on signup**
When a user signs up via Supabase Auth, automatically creates their profile and settings.

### 2. **Auto-update timestamps**
All tables with `updated_at` automatically update on modifications.

### 3. **Auto-update milestone progress**
When tasks are completed, milestone progress recalculates automatically.

### 4. **Auto-mark milestones as delayed**
If milestone is past due date and not completed, marks as delayed.

### 5. **Auto-calculate ARR**
When MRR is set, ARR is automatically calculated (MRR × 12).

### 6. **Activity logging**
Key actions are automatically logged to activity_log.

### 7. **Auto-create free subscription**
New users get a free subscription automatically.

---

## 📊 **Relationships**

```
profiles (users)
  ↓
  ├─→ startups (owner_id)
  ├─→ startup_members (user_id)
  ├─→ subscriptions (user_id)
  └─→ feedback (user_id)

startups
  ↓
  ├─→ startup_members (startup_id)
  ├─→ milestones (startup_id)
  ├─→ tasks (startup_id)
  ├─→ metrics (startup_id)
  ├─→ investor_hub (startup_id)
  ├─→ ai_insights (startup_id)
  └─→ activity_log (startup_id)

milestones
  ↓
  └─→ tasks (milestone_id)
```

---

## 🔍 **Indexes**

Key indexes for fast queries:
- Primary keys (automatic)
- Foreign keys (automatic)
- Email lookups: `profiles(email)`
- Startup owners: `startups(owner_id)`
- Task assignments: `tasks(assignee_id, status)`
- Metrics history: `metrics(startup_id, recorded_at)`

---

## 📝 **Best Practices**

### When creating tasks:
```typescript
- Always set startup_id and created_by
- Include estimated_hours for planning
- Set appropriate priority
```

### When recording metrics:
```typescript
- Use recorded_at for time-series data
- ARR is auto-calculated from MRR
- Store snapshots regularly (daily/weekly)
```

### When managing permissions:
```typescript
- Check user role before operations
- Use helper function: get_user_startup_role()
- Respect RLS policies
```

---

## 🚀 **Performance Tips**

1. **Use select with specific columns** - Don't select *
2. **Filter early** - Add WHERE clauses
3. **Limit results** - Use .limit() for lists
4. **Use indexes** - Query by indexed columns
5. **Batch operations** - Use bulkCreateTasks() for multiple inserts

---

## 🔄 **Migrations**

To modify schema in the future:

1. Create migration file: `database/migrations/YYYY-MM-DD_description.sql`
2. Test in development
3. Run via Supabase CLI: `supabase db push`
4. Backup before production changes

---

## 📚 **Query Examples**

### Get user's startups with member count:
```sql
SELECT s.*, COUNT(sm.id) as member_count
FROM startups s
LEFT JOIN startup_members sm ON sm.startup_id = s.id
WHERE sm.user_id = 'user-id'
GROUP BY s.id;
```

### Get overdue tasks:
```sql
SELECT * FROM tasks
WHERE due_date < NOW()
AND status NOT IN ('done', 'cancelled')
ORDER BY priority DESC, due_date ASC;
```

### Get metrics trend:
```sql
SELECT recorded_at, mrr, users_count
FROM metrics
WHERE startup_id = 'startup-id'
ORDER BY recorded_at DESC
LIMIT 30;
```

---

**Need more info? Check the SQL files in `/database` folder!**
