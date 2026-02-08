-- ============================================
-- StartupOps Database Schema
-- ============================================
-- Run this script first to create all tables and types
-- Estimated execution time: 10-15 seconds

BEGIN;

-- ============================================
-- EXTENSIONS
-- ============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for encryption
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- CUSTOM TYPES
-- ============================================

-- User roles enum
CREATE TYPE user_role AS ENUM ('leader', 'team');

-- Startup member roles
CREATE TYPE member_role AS ENUM ('owner', 'admin', 'member');

-- Subscription plans
CREATE TYPE subscription_plan AS ENUM ('free', 'pro', 'enterprise');

-- Subscription status
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'trialing');

-- Task status
CREATE TYPE task_status AS ENUM ('todo', 'in-progress', 'review', 'done', 'cancelled');

-- Task priority
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Milestone status
CREATE TYPE milestone_status AS ENUM ('not_started', 'in_progress', 'completed', 'delayed');

-- Startup stage
CREATE TYPE startup_stage AS ENUM ('idea', 'mvp', 'launched', 'growing', 'scaling');

-- Feedback types
CREATE TYPE feedback_type AS ENUM ('bug', 'feature', 'improvement', 'question', 'other');

-- Feedback status
CREATE TYPE feedback_status AS ENUM ('open', 'in-progress', 'resolved', 'closed');

-- AI insight types
CREATE TYPE insight_type AS ENUM ('performance', 'warning', 'suggestion', 'milestone', 'trend');

-- Fundraising stages
CREATE TYPE fundraising_stage AS ENUM ('pre-seed', 'seed', 'series-a', 'series-b', 'not-fundraising');

-- ============================================
-- PROFILES TABLE (extends Supabase auth.users)
-- ============================================

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role user_role DEFAULT 'team',
    avatar_url TEXT,
    phone TEXT,
    bio TEXT,
    onboarding_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- ============================================
-- STARTUPS TABLE
-- ============================================

CREATE TABLE startups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    industry TEXT,
    description TEXT,
    stage startup_stage DEFAULT 'idea',
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    logo_url TEXT,
    website TEXT,
    founded_date DATE,
    location TEXT,
    pitch_deck_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_startups_owner ON startups(owner_id);
CREATE INDEX idx_startups_stage ON startups(stage);

-- ============================================
-- STARTUP MEMBERS TABLE
-- ============================================

CREATE TABLE startup_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role member_role DEFAULT 'member',
    permissions JSONB DEFAULT '{"can_edit": false, "can_delete": false, "can_invite": false}'::jsonb,
    invited_by UUID REFERENCES profiles(id),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(startup_id, user_id)
);

CREATE INDEX idx_startup_members_startup ON startup_members(startup_id);
CREATE INDEX idx_startup_members_user ON startup_members(user_id);
CREATE INDEX idx_startup_members_role ON startup_members(role);

-- ============================================
-- SUBSCRIPTIONS TABLE
-- ============================================

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    plan subscription_plan DEFAULT 'free',
    status subscription_status DEFAULT 'active',
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    trial_ends_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_startup ON subscriptions(startup_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);

-- ============================================
-- MILESTONES TABLE
-- ============================================

CREATE TABLE milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    status milestone_status DEFAULT 'not_started',
    is_delayed BOOLEAN DEFAULT false,
    color TEXT DEFAULT '#3b82f6',
    order_index INTEGER DEFAULT 0,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_milestones_startup ON milestones(startup_id);
CREATE INDEX idx_milestones_status ON milestones(status);
CREATE INDEX idx_milestones_due_date ON milestones(due_date);

-- ============================================
-- TASKS TABLE
-- ============================================

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    status task_status DEFAULT 'todo',
    priority task_priority DEFAULT 'medium',
    assignee_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    due_date TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    estimated_hours DECIMAL(5,2),
    actual_hours DECIMAL(5,2),
    tags TEXT[],
    attachments JSONB DEFAULT '[]'::jsonb,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tasks_startup ON tasks(startup_id);
CREATE INDEX idx_tasks_milestone ON tasks(milestone_id);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);

-- ============================================
-- METRICS TABLE
-- ============================================

CREATE TABLE metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
    mrr DECIMAL(12,2) DEFAULT 0,
    arr DECIMAL(12,2) DEFAULT 0,
    users_count INTEGER DEFAULT 0,
    active_users INTEGER DEFAULT 0,
    growth_rate DECIMAL(5,2) DEFAULT 0,
    churn_rate DECIMAL(5,2) DEFAULT 0,
    burn_rate DECIMAL(12,2) DEFAULT 0,
    runway_months INTEGER DEFAULT 0,
    cash_balance DECIMAL(12,2) DEFAULT 0,
    customer_acquisition_cost DECIMAL(10,2),
    lifetime_value DECIMAL(10,2),
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_metrics_startup ON metrics(startup_id);
CREATE INDEX idx_metrics_recorded_at ON metrics(recorded_at);

-- ============================================
-- INVESTOR HUB TABLE
-- ============================================

CREATE TABLE investor_hub (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE UNIQUE,
    pitch_score INTEGER DEFAULT 0 CHECK (pitch_score >= 0 AND pitch_score <= 100),
    pitch_deck_url TEXT,
    problem_defined BOOLEAN DEFAULT false,
    solution_articulated BOOLEAN DEFAULT false,
    team_complete BOOLEAN DEFAULT false,
    traction_metrics JSONB DEFAULT '{}'::jsonb,
    competitive_analysis BOOLEAN DEFAULT false,
    financials_ready BOOLEAN DEFAULT false,
    customer_testimonials INTEGER DEFAULT 0,
    due_diligence_docs JSONB DEFAULT '[]'::jsonb,
    fundraising_stage fundraising_stage DEFAULT 'not-fundraising',
    target_amount DECIMAL(12,2),
    raised_amount DECIMAL(12,2) DEFAULT 0,
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_investor_hub_startup ON investor_hub(startup_id);
CREATE INDEX idx_investor_hub_fundraising_stage ON investor_hub(fundraising_stage);

-- ============================================
-- FEEDBACK TABLE
-- ============================================

CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type feedback_type DEFAULT 'other',
    category TEXT,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    status feedback_status DEFAULT 'open',
    priority task_priority DEFAULT 'medium',
    attachments JSONB DEFAULT '[]'::jsonb,
    admin_response TEXT,
    responded_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feedback_user ON feedback(user_id);
CREATE INDEX idx_feedback_startup ON feedback(startup_id);
CREATE INDEX idx_feedback_status ON feedback(status);
CREATE INDEX idx_feedback_type ON feedback(type);

-- ============================================
-- AI INSIGHTS TABLE
-- ============================================

CREATE TABLE ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
    insight_type insight_type DEFAULT 'suggestion',
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority task_priority DEFAULT 'medium',
    category TEXT,
    action_items TEXT[],
    is_read BOOLEAN DEFAULT false,
    is_dismissed BOOLEAN DEFAULT false,
    dismissed_by UUID REFERENCES profiles(id),
    dismissed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_insights_startup ON ai_insights(startup_id);
CREATE INDEX idx_ai_insights_type ON ai_insights(insight_type);
CREATE INDEX idx_ai_insights_priority ON ai_insights(priority);
CREATE INDEX idx_ai_insights_read ON ai_insights(is_read);

-- ============================================
-- USER SETTINGS TABLE
-- ============================================

CREATE TABLE user_settings (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    theme TEXT DEFAULT 'system',
    notifications_enabled BOOLEAN DEFAULT true,
    email_notifications BOOLEAN DEFAULT true,
    task_reminders BOOLEAN DEFAULT true,
    weekly_digest BOOLEAN DEFAULT true,
    language TEXT DEFAULT 'en',
    timezone TEXT DEFAULT 'UTC',
    preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ACTIVITY LOG TABLE
-- ============================================

CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_log_startup ON activity_log(startup_id);
CREATE INDEX idx_activity_log_user ON activity_log(user_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at);
CREATE INDEX idx_activity_log_entity ON activity_log(entity_type, entity_id);

COMMIT;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Database schema created successfully!';
    RAISE NOTICE '📝 Next step: Run 02_triggers.sql';
END $$;
