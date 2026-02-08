-- ============================================
-- StartupOps Database Triggers & Functions
-- ============================================
-- Run this script after 01_schema.sql
-- This sets up automatic timestamps, profile creation, and other automations

BEGIN;

-- ============================================
-- FUNCTION: Auto update timestamp
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_startups_updated_at BEFORE UPDATE ON startups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_milestones_updated_at BEFORE UPDATE ON milestones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON feedback
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTION: Auto create profile on signup
-- ============================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'team')
    );
    
    -- Create user settings
    INSERT INTO user_settings (id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- FUNCTION: Auto update milestone progress
-- ============================================

CREATE OR REPLACE FUNCTION update_milestone_progress()
RETURNS TRIGGER AS $$
DECLARE
    total_tasks INTEGER;
    completed_tasks INTEGER;
    new_progress INTEGER;
    milestone_uuid UUID;
BEGIN
    -- Get milestone_id based on operation
    IF TG_OP = 'DELETE' THEN
        milestone_uuid := OLD.milestone_id;
    ELSE
        milestone_uuid := NEW.milestone_id;
    END IF;
    
    -- Skip if no milestone
    IF milestone_uuid IS NULL THEN
        RETURN COALESCE(NEW, OLD);
    END IF;
    
    -- Count tasks
    SELECT 
        COUNT(*),
        COUNT(*) FILTER (WHERE status = 'done')
    INTO total_tasks, completed_tasks
    FROM tasks
    WHERE milestone_id = milestone_uuid;
    
    -- Calculate progress
    IF total_tasks = 0 THEN
        new_progress := 0;
    ELSE
        new_progress := ROUND((completed_tasks::DECIMAL / total_tasks) * 100);
    END IF;
    
    -- Update milestone
    UPDATE milestones
    SET 
        progress = new_progress,
        status = CASE
            WHEN new_progress = 0 THEN 'not_started'
            WHEN new_progress = 100 THEN 'completed'
            ELSE 'in_progress'
        END,
        updated_at = NOW()
    WHERE id = milestone_uuid;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger on task changes
CREATE TRIGGER update_milestone_progress_on_task_change
    AFTER INSERT OR UPDATE OF status OR DELETE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_milestone_progress();

-- ============================================
-- FUNCTION: Mark milestone as delayed
-- ============================================

CREATE OR REPLACE FUNCTION check_milestone_delay()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.due_date IS NOT NULL AND NEW.due_date < CURRENT_DATE AND NEW.status != 'completed' THEN
        NEW.is_delayed := true;
        NEW.status := 'delayed';
    ELSE
        NEW.is_delayed := false;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_milestone_delay_trigger
    BEFORE INSERT OR UPDATE ON milestones
    FOR EACH ROW EXECUTE FUNCTION check_milestone_delay();

-- ============================================
-- FUNCTION: Auto update task completed_at
-- ============================================

CREATE OR REPLACE FUNCTION update_task_completed_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'done' AND OLD.status != 'done' THEN
        NEW.completed_at := NOW();
    ELSIF NEW.status != 'done' THEN
        NEW.completed_at := NULL;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_task_completed_at_trigger
    BEFORE UPDATE OF status ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_task_completed_at();

-- ============================================
-- FUNCTION: Log activity
-- ============================================

CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
DECLARE
    action_text TEXT;
    user_uuid UUID;
    startup_uuid UUID;
BEGIN
    -- Determine action
    IF TG_OP = 'INSERT' THEN
        action_text := 'created';
    ELSIF TG_OP = 'UPDATE' THEN
        action_text := 'updated';
    ELSIF TG_OP = 'DELETE' THEN
        action_text := 'deleted';
    END IF;
    
    -- Get user_id from the record (adjust based on table)
    user_uuid := COALESCE(
        NEW.created_by,
        NEW.user_id,
        OLD.created_by,
        OLD.user_id,
        auth.uid()
    );
    
    -- Get startup_id from the record
    startup_uuid := COALESCE(NEW.startup_id, OLD.startup_id);
    
    -- Only log if we have a startup
    IF startup_uuid IS NOT NULL THEN
        INSERT INTO activity_log (
            startup_id,
            user_id,
            action,
            entity_type,
            entity_id,
            metadata
        ) VALUES (
            startup_uuid,
            user_uuid,
            action_text || ' ' || TG_TABLE_NAME,
            TG_TABLE_NAME,
            COALESCE(NEW.id, OLD.id),
            jsonb_build_object(
                'operation', TG_OP,
                'timestamp', NOW()
            )
        );
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply activity logging to key tables
CREATE TRIGGER log_task_activity
    AFTER INSERT OR UPDATE OR DELETE ON tasks
    FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER log_milestone_activity
    AFTER INSERT OR UPDATE OR DELETE ON milestones
    FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER log_startup_activity
    AFTER INSERT OR UPDATE ON startups
    FOR EACH ROW EXECUTE FUNCTION log_activity();

-- ============================================
-- FUNCTION: Calculate ARR from MRR
-- ============================================

CREATE OR REPLACE FUNCTION calculate_arr()
RETURNS TRIGGER AS $$
BEGIN
    NEW.arr := NEW.mrr * 12;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_arr_trigger
    BEFORE INSERT OR UPDATE OF mrr ON metrics
    FOR EACH ROW EXECUTE FUNCTION calculate_arr();

-- ============================================
-- FUNCTION: Auto create free subscription
-- ============================================

CREATE OR REPLACE FUNCTION create_default_subscription()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO subscriptions (user_id, plan, status)
    VALUES (NEW.id, 'free', 'active')
    ON CONFLICT DO NOTHING;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_default_subscription_trigger
    AFTER INSERT ON profiles
    FOR EACH ROW EXECUTE FUNCTION create_default_subscription();

-- ============================================
-- FUNCTION: Update investor hub last_updated
-- ============================================

CREATE OR REPLACE FUNCTION update_investor_hub_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_investor_hub_timestamp_trigger
    BEFORE UPDATE ON investor_hub
    FOR EACH ROW EXECUTE FUNCTION update_investor_hub_timestamp();

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to get user's role in a startup
CREATE OR REPLACE FUNCTION get_user_startup_role(user_uuid UUID, startup_uuid UUID)
RETURNS member_role AS $$
DECLARE
    user_role member_role;
BEGIN
    SELECT role INTO user_role
    FROM startup_members
    WHERE user_id = user_uuid AND startup_id = startup_uuid;
    
    RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has permission
CREATE OR REPLACE FUNCTION user_has_permission(
    user_uuid UUID,
    startup_uuid UUID,
    permission_name TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    has_permission BOOLEAN;
BEGIN
    SELECT 
        COALESCE((permissions->>permission_name)::BOOLEAN, false)
    INTO has_permission
    FROM startup_members
    WHERE user_id = user_uuid AND startup_id = startup_uuid;
    
    RETURN COALESCE(has_permission, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get startup metrics summary
CREATE OR REPLACE FUNCTION get_startup_metrics_summary(startup_uuid UUID)
RETURNS TABLE (
    total_tasks INTEGER,
    completed_tasks INTEGER,
    overdue_tasks INTEGER,
    total_milestones INTEGER,
    completed_milestones INTEGER,
    team_members INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(*)::INTEGER FROM tasks WHERE startup_id = startup_uuid),
        (SELECT COUNT(*)::INTEGER FROM tasks WHERE startup_id = startup_uuid AND status = 'done'),
        (SELECT COUNT(*)::INTEGER FROM tasks WHERE startup_id = startup_uuid AND due_date < NOW() AND status != 'done'),
        (SELECT COUNT(*)::INTEGER FROM milestones WHERE startup_id = startup_uuid),
        (SELECT COUNT(*)::INTEGER FROM milestones WHERE startup_id = startup_uuid AND status = 'completed'),
        (SELECT COUNT(*)::INTEGER FROM startup_members WHERE startup_id = startup_uuid);
END;
$$ LANGUAGE plpgsql;

COMMIT;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Database triggers and functions created successfully!';
    RAISE NOTICE '📝 Next step: Run 03_rls_policies.sql';
END $$;
