-- ============================================
-- StartupOps Row Level Security (RLS) Policies
-- ============================================
-- Run this script after 02_triggers.sql
-- This ensures users can only access their own data

BEGIN;

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE startup_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_hub ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Users can view other profiles (for team member display)
CREATE POLICY "Users can view other profiles"
    ON profiles FOR SELECT
    USING (true);

-- ============================================
-- STARTUPS POLICIES
-- ============================================

-- Users can view startups they're members of
CREATE POLICY "Users can view their startups"
    ON startups FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = startups.id
            AND startup_members.user_id = auth.uid()
        )
    );

-- Users can create startups
CREATE POLICY "Users can create startups"
    ON startups FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

-- Owners and admins can update their startups
CREATE POLICY "Owners and admins can update startups"
    ON startups FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = startups.id
            AND startup_members.user_id = auth.uid()
            AND startup_members.role IN ('owner', 'admin')
        )
    );

-- Only owners can delete startups
CREATE POLICY "Owners can delete startups"
    ON startups FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = startups.id
            AND startup_members.user_id = auth.uid()
            AND startup_members.role = 'owner'
        )
    );

-- ============================================
-- STARTUP MEMBERS POLICIES
-- ============================================

-- Users can view members of their startups
CREATE POLICY "Users can view startup members"
    ON startup_members FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM startup_members sm
            WHERE sm.startup_id = startup_members.startup_id
            AND sm.user_id = auth.uid()
        )
    );

-- Owners and admins can add members
CREATE POLICY "Owners and admins can add members"
    ON startup_members FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = startup_members.startup_id
            AND startup_members.user_id = auth.uid()
            AND startup_members.role IN ('owner', 'admin')
        )
    );

-- Owners and admins can update member roles
CREATE POLICY "Owners and admins can update members"
    ON startup_members FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM startup_members sm
            WHERE sm.startup_id = startup_members.startup_id
            AND sm.user_id = auth.uid()
            AND sm.role IN ('owner', 'admin')
        )
    );

-- Owners and admins can remove members, users can remove themselves
CREATE POLICY "Owners and admins can remove members"
    ON startup_members FOR DELETE
    USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM startup_members sm
            WHERE sm.startup_id = startup_members.startup_id
            AND sm.user_id = auth.uid()
            AND sm.role IN ('owner', 'admin')
        )
    );

-- ============================================
-- SUBSCRIPTIONS POLICIES
-- ============================================

-- Users can view their own subscriptions
CREATE POLICY "Users can view own subscriptions"
    ON subscriptions FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create subscriptions (handled by Stripe webhook)
CREATE POLICY "Users can create subscriptions"
    ON subscriptions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own subscriptions
CREATE POLICY "Users can update own subscriptions"
    ON subscriptions FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================
-- TASKS POLICIES
-- ============================================

-- Users can view tasks from their startups
CREATE POLICY "Users can view startup tasks"
    ON tasks FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = tasks.startup_id
            AND startup_members.user_id = auth.uid()
        )
    );

-- Users can create tasks in their startups
CREATE POLICY "Users can create tasks"
    ON tasks FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = tasks.startup_id
            AND startup_members.user_id = auth.uid()
        )
    );

-- Users can update tasks they created or are assigned to, or if they have permissions
CREATE POLICY "Users can update tasks"
    ON tasks FOR UPDATE
    USING (
        auth.uid() = created_by OR
        auth.uid() = assignee_id OR
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = tasks.startup_id
            AND startup_members.user_id = auth.uid()
            AND startup_members.role IN ('owner', 'admin')
        )
    );

-- Users can delete tasks they created or if they have permissions
CREATE POLICY "Users can delete tasks"
    ON tasks FOR DELETE
    USING (
        auth.uid() = created_by OR
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = tasks.startup_id
            AND startup_members.user_id = auth.uid()
            AND startup_members.role IN ('owner', 'admin')
        )
    );

-- ============================================
-- MILESTONES POLICIES
-- ============================================

-- Users can view milestones from their startups
CREATE POLICY "Users can view startup milestones"
    ON milestones FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = milestones.startup_id
            AND startup_members.user_id = auth.uid()
        )
    );

-- Users can create milestones in their startups
CREATE POLICY "Users can create milestones"
    ON milestones FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = milestones.startup_id
            AND startup_members.user_id = auth.uid()
        )
    );

-- Owners and admins can update milestones
CREATE POLICY "Owners and admins can update milestones"
    ON milestones FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = milestones.startup_id
            AND startup_members.user_id = auth.uid()
            AND startup_members.role IN ('owner', 'admin')
        )
    );

-- Owners and admins can delete milestones
CREATE POLICY "Owners and admins can delete milestones"
    ON milestones FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = milestones.startup_id
            AND startup_members.user_id = auth.uid()
            AND startup_members.role IN ('owner', 'admin')
        )
    );

-- ============================================
-- METRICS POLICIES
-- ============================================

-- Users can view metrics from their startups
CREATE POLICY "Users can view startup metrics"
    ON metrics FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = metrics.startup_id
            AND startup_members.user_id = auth.uid()
        )
    );

-- Leaders can create metrics
CREATE POLICY "Leaders can create metrics"
    ON metrics FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM startup_members sm
            JOIN profiles p ON p.id = sm.user_id
            WHERE sm.startup_id = metrics.startup_id
            AND sm.user_id = auth.uid()
            AND (sm.role IN ('owner', 'admin') OR p.role = 'leader')
        )
    );

-- Leaders can update metrics
CREATE POLICY "Leaders can update metrics"
    ON metrics FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM startup_members sm
            JOIN profiles p ON p.id = sm.user_id
            WHERE sm.startup_id = metrics.startup_id
            AND sm.user_id = auth.uid()
            AND (sm.role IN ('owner', 'admin') OR p.role = 'leader')
        )
    );

-- ============================================
-- INVESTOR HUB POLICIES
-- ============================================

-- Users can view investor hub for their startups
CREATE POLICY "Users can view startup investor hub"
    ON investor_hub FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = investor_hub.startup_id
            AND startup_members.user_id = auth.uid()
        )
    );

-- Owners and admins can create/update investor hub
CREATE POLICY "Owners and admins can manage investor hub"
    ON investor_hub FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = investor_hub.startup_id
            AND startup_members.user_id = auth.uid()
            AND startup_members.role IN ('owner', 'admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = investor_hub.startup_id
            AND startup_members.user_id = auth.uid()
            AND startup_members.role IN ('owner', 'admin')
        )
    );

-- ============================================
-- FEEDBACK POLICIES
-- ============================================

-- Users can view their own feedback
CREATE POLICY "Users can view own feedback"
    ON feedback FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create feedback
CREATE POLICY "Users can create feedback"
    ON feedback FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own feedback
CREATE POLICY "Users can update own feedback"
    ON feedback FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================
-- AI INSIGHTS POLICIES
-- ============================================

-- Users can view insights for their startups
CREATE POLICY "Users can view startup insights"
    ON ai_insights FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = ai_insights.startup_id
            AND startup_members.user_id = auth.uid()
        )
    );

-- System can create insights (via Edge Functions)
CREATE POLICY "Service role can create insights"
    ON ai_insights FOR INSERT
    WITH CHECK (true);

-- Users can update insights (mark as read/dismissed)
CREATE POLICY "Users can update insights"
    ON ai_insights FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = ai_insights.startup_id
            AND startup_members.user_id = auth.uid()
        )
    );

-- ============================================
-- USER SETTINGS POLICIES
-- ============================================

-- Users can view their own settings
CREATE POLICY "Users can view own settings"
    ON user_settings FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own settings
CREATE POLICY "Users can update own settings"
    ON user_settings FOR UPDATE
    USING (auth.uid() = id);

-- ============================================
-- ACTIVITY LOG POLICIES
-- ============================================

-- Users can view activity from their startups
CREATE POLICY "Users can view startup activity"
    ON activity_log FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM startup_members
            WHERE startup_members.startup_id = activity_log.startup_id
            AND startup_members.user_id = auth.uid()
        )
    );

-- System can insert activity logs
CREATE POLICY "System can create activity logs"
    ON activity_log FOR INSERT
    WITH CHECK (true);

COMMIT;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Row Level Security policies created successfully!';
    RAISE NOTICE '🔒 Your database is now secure!';
    RAISE NOTICE '📝 Next step: Run 04_seed_data.sql (optional)';
END $$;
