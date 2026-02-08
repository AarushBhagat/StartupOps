-- HealthAI Demo Data for Judge Presentation
-- Comprehensive mock data showing all dashboard features
-- Run this in Supabase SQL Editor

-- IMPORTANT: This uses hardcoded user jhanviarora11105@gmail.com
-- Make sure this user exists before running this script!

DO $$
DECLARE
  user_uuid UUID;
BEGIN
  -- Get the user ID for jhanviarora11105@gmail.com
  SELECT id INTO user_uuid FROM auth.users WHERE email = 'jhanviarora11105@gmail.com' LIMIT 1;
  
  -- If user doesn't exist, raise an error
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION 'User jhanviarora11105@gmail.com not found. Please sign up first!';
  END IF;
  
  -- Store it in a temporary table for use below
  CREATE TEMP TABLE IF NOT EXISTS temp_user (user_id UUID);
  DELETE FROM temp_user;
  INSERT INTO temp_user VALUES (user_uuid);
END $$;

-- Disable triggers temporarily to avoid conflicts during bulk insert
SET session_replication_role = 'replica';

-- Clean up existing data (optional - comment out if you want to keep other data)
-- DELETE FROM ai_insights WHERE startup_id IN (SELECT id FROM startups WHERE name = 'HealthAI');
-- DELETE FROM activity_log WHERE startup_id IN (SELECT id FROM startups WHERE name = 'HealthAI');
-- DELETE FROM feedback WHERE startup_id IN (SELECT id FROM startups WHERE name = 'HealthAI');
-- DELETE FROM investor_hub WHERE startup_id IN (SELECT id FROM startups WHERE name = 'HealthAI');
-- DELETE FROM metrics WHERE startup_id IN (SELECT id FROM startups WHERE name = 'HealthAI');
-- DELETE FROM tasks WHERE startup_id IN (SELECT id FROM startups WHERE name = 'HealthAI');
-- DELETE FROM milestones WHERE startup_id IN (SELECT id FROM startups WHERE name = 'HealthAI');
-- DELETE FROM startup_members WHERE startup_id IN (SELECT id FROM startups WHERE name = 'HealthAI');
-- DELETE FROM startups WHERE name = 'HealthAI';

-- 1. Create HealthAI Startup
INSERT INTO startups (id, name, industry, description, stage, owner_id, created_at, updated_at)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'HealthAI',
  'Healthcare Technology',
  'AI-powered diagnostic assistant helping doctors make faster, more accurate diagnoses using machine learning and medical imaging analysis.',
  'scaling',
  (SELECT user_id FROM temp_user),
  NOW() - INTERVAL '8 months',
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  industry = EXCLUDED.industry,
  description = EXCLUDED.description,
  stage = EXCLUDED.stage,
  owner_id = EXCLUDED.owner_id,
  updated_at = EXCLUDED.updated_at;

-- 2. Add Team Members (link to your actual user)
INSERT INTO startup_members (startup_id, user_id, role)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'owner')
ON CONFLICT (startup_id, user_id) DO UPDATE SET
  role = EXCLUDED.role;

-- 3. Create Comprehensive Milestones (8 milestones showing full journey)
INSERT INTO milestones (id, startup_id, title, description, due_date, status, created_at, updated_at) VALUES
-- Completed Milestones
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 
 'MVP Development', 
 'Build core AI diagnostic engine with basic image analysis capabilities',
 NOW() - INTERVAL '6 months',
 'completed',
 NOW() - INTERVAL '8 months',
 NOW() - INTERVAL '6 months'),

('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000',
 'Initial Clinical Validation',
 'Complete first round of testing with 5 partner clinics and gather initial accuracy metrics',
 NOW() - INTERVAL '4 months',
 'completed',
 NOW() - INTERVAL '7 months',
 NOW() - INTERVAL '4 months'),

('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000',
 'Seed Funding Secured',
 'Raise $2M seed round from healthcare-focused VCs',
 NOW() - INTERVAL '3 months',
 'completed',
 NOW() - INTERVAL '5 months',
 NOW() - INTERVAL '3 months'),

-- In Progress Milestones
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000',
 'FDA Pre-Submission Meeting',
 'Prepare and submit 510(k) pre-submission package to FDA for SaMD classification',
 NOW() + INTERVAL '1 month',
 'in_progress',
 NOW() - INTERVAL '3 months',
 NOW()),

('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000',
 'Expand to 50 Clinical Partners',
 'Onboard 50 hospitals and clinics across major metropolitan areas',
 NOW() + INTERVAL '2 months',
 'in_progress',
 NOW() - INTERVAL '2 months',
 NOW()),

-- Upcoming Milestones
('550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000',
 'Full FDA 510(k) Submission',
 'Submit complete 510(k) application with clinical validation data',
 NOW() + INTERVAL '4 months',
 'not_started',
 NOW() - INTERVAL '1 month',
 NOW()),

('550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440000',
 'Series A Fundraising',
 'Raise $10M Series A to scale operations and expand clinical trials',
 NOW() + INTERVAL '5 months',
 'not_started',
 NOW() - INTERVAL '1 month',
 NOW()),

('550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440000',
 'International Expansion',
 'Launch in European markets with CE Mark certification',
 NOW() + INTERVAL '8 months',
 'not_started',
 NOW(),
 NOW())
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;

-- 4. Create Comprehensive Tasks (30 tasks across all categories)
INSERT INTO tasks (id, startup_id, title, description, priority, status, tags, due_date, created_by, created_at, updated_at) VALUES

-- PRODUCT DEVELOPMENT - Completed
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440000',
 'Design AI Model Architecture',
 'Design neural network architecture for medical image analysis with attention mechanisms',
 'high',
 'done',
 ARRAY['Development', 'AI', 'Architecture'],
 NOW() - INTERVAL '6 months',
 (SELECT user_id FROM temp_user),
 NOW() - INTERVAL '8 months',
 NOW() - INTERVAL '6 months'),

('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440000',
 'Train Initial ML Models',
 'Train models on 10K medical images with validated diagnoses',
 'Development',
 'high',
 'completed',
 21,
 'AI Team',
 NOW() - INTERVAL '5 months',
 NOW() - INTERVAL '7 months',
 NOW() - INTERVAL '5 months'),

('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440000',
 'Build Doctor Dashboard UI',
 'Create intuitive interface for doctors to upload images and view AI insights',
 'Product',
 'high',
 'completed',
 8,
 'Product Team',
 NOW() - INTERVAL '5 months',
 NOW() - INTERVAL '6 months',
 NOW() - INTERVAL '5 months'),

-- PRODUCT DEVELOPMENT - In Progress
('550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440000',
 'Implement Real-time Processing',
 'Optimize model inference to provide results within 3 seconds',
 'Development',
 'high',
 'in_progress',
 13,
 'Backend Team',
 NOW() + INTERVAL '2 weeks',
 NOW() - INTERVAL '1 month',
 NOW() - INTERVAL '3 days'),

('550e8400-e29b-41d4-a716-446655440105', '550e8400-e29b-41d4-a716-446655440000',
 'Add Multi-Modal Analysis',
 'Integrate support for CT scans, MRIs, and X-rays in single platform',
 'Product',
 'high',
 'in_progress',
 21,
 'AI Team',
 NOW() + INTERVAL '3 weeks',
 NOW() - INTERVAL '2 months',
 NOW() - INTERVAL '1 day'),

('550e8400-e29b-41d4-a716-446655440106', '550e8400-e29b-41d4-a716-446655440000',
 'Build Patient History Integration',
 'Connect with EHR systems (Epic, Cerner) to pull patient context',
 'Development',
 'medium',
 'in_progress',
 13,
 'Integration Team',
 NOW() + INTERVAL '1 month',
 NOW() - INTERVAL '3 weeks',
 NOW() - INTERVAL '2 days'),

-- CLINICAL & RESEARCH
('550e8400-e29b-41d4-a716-446655440107', '550e8400-e29b-41d4-a716-446655440000',
 'Analyze Clinical Trial Results',
 'Compile accuracy metrics from 5 partner hospitals (target: 94% accuracy)',
 'Research',
 'high',
 'completed',
 8,
 'Clinical Team',
 NOW() - INTERVAL '4 months',
 NOW() - INTERVAL '5 months',
 NOW() - INTERVAL '4 months'),

('550e8400-e29b-41d4-a716-446655440108', '550e8400-e29b-41d4-a716-446655440000',
 'Expand Clinical Trial to 15 Sites',
 'Recruit oncology and radiology departments at major hospitals',
 'Research',
 'high',
 'in_progress',
 13,
 'Clinical Team',
 NOW() + INTERVAL '6 weeks',
 NOW() - INTERVAL '2 months',
 NOW() - INTERVAL '4 days'),

('550e8400-e29b-41d4-a716-446655440109', '550e8400-e29b-41d4-a716-446655440000',
 'Publish Research Paper',
 'Submit findings to NEJM or Nature Medicine on AI diagnostic accuracy',
 'Research',
 'medium',
 'in_progress',
 8,
 'Research Team',
 NOW() + INTERVAL '2 months',
 NOW() - INTERVAL '1 month',
 NOW() - INTERVAL '1 week'),

-- REGULATORY & COMPLIANCE
('550e8400-e29b-41d4-a716-446655440110', '550e8400-e29b-41d4-a716-446655440000',
 'Prepare FDA Pre-Sub Package',
 'Compile clinical data, risk analysis, and device description for FDA',
 'Compliance',
 'critical',
 'in_progress',
 21,
 'Regulatory Team',
 NOW() + INTERVAL '3 weeks',
 NOW() - INTERVAL '2 months',
 NOW() - INTERVAL '1 day'),

('550e8400-e29b-41d4-a716-446655440111', '550e8400-e29b-41d4-a716-446655440000',
 'Complete HIPAA Compliance Audit',
 'Third-party security audit and BAA agreements with all partners',
 'Compliance',
 'high',
 'completed',
 8,
 'Security Team',
 NOW() - INTERVAL '2 months',
 NOW() - INTERVAL '4 months',
 NOW() - INTERVAL '2 months'),

('550e8400-e29b-41d4-a716-446655440112', '550e8400-e29b-41d4-a716-446655440000',
 'Implement SOC 2 Type II',
 'Complete SOC 2 Type II certification for enterprise customers',
 'Compliance',
 'high',
 'in_progress',
 13,
 'Security Team',
 NOW() + INTERVAL '2 months',
 NOW() - INTERVAL '3 months',
 NOW() - INTERVAL '5 days'),

-- SALES & MARKETING
('550e8400-e29b-41d4-a716-446655440113', '550e8400-e29b-41d4-a716-446655440000',
 'Launch Healthcare Provider Webinar Series',
 'Monthly webinars showcasing AI diagnostic capabilities to 200+ doctors',
 'Marketing',
 'medium',
 'in_progress',
 5,
 'Marketing Team',
 NOW() + INTERVAL '2 weeks',
 NOW() - INTERVAL '1 month',
 NOW() - INTERVAL '3 days'),

('550e8400-e29b-41d4-a716-446655440114', '550e8400-e29b-41d4-a716-446655440000',
 'Attend HIMSS Conference',
 'Showcase product at Healthcare IT conference - target 50 qualified leads',
 'Marketing',
 'high',
 'pending',
 8,
 'Sales Team',
 NOW() + INTERVAL '6 weeks',
 NOW() - INTERVAL '2 weeks',
 NOW()),

('550e8400-e29b-41d4-a716-446655440115', '550e8400-e29b-41d4-a716-446655440000',
 'Create Case Study from Mayo Clinic Trial',
 'Document 96% accuracy improvement with video testimonials from doctors',
 'Marketing',
 'medium',
 'in_progress',
 5,
 'Content Team',
 NOW() + INTERVAL '3 weeks',
 NOW() - INTERVAL '3 weeks',
 NOW() - INTERVAL '2 days'),

('550e8400-e29b-41d4-a716-446655440116', '550e8400-e29b-41d4-a716-446655440000',
 'Build Sales Pipeline for Enterprise',
 'Target 20 major hospital systems with direct sales outreach',
 'Sales',
 'high',
 'in_progress',
 8,
 'Sales Team',
 NOW() + INTERVAL '1 month',
 NOW() - INTERVAL '1 month',
 NOW() - INTERVAL '1 week'),

-- FUNDRAISING & INVESTOR RELATIONS
('550e8400-e29b-41d4-a716-446655440117', '550e8400-e29b-41d4-a716-446655440000',
 'Update Investor Pitch Deck',
 'Add latest clinical results, user metrics, and Series A projections',
 'Investor Relations',
 'high',
 'in_progress',
 5,
 'Leadership',
 NOW() + INTERVAL '1 week',
 NOW() - INTERVAL '2 weeks',
 NOW() - INTERVAL '1 day'),

('550e8400-e29b-41d4-a716-446655440118', '550e8400-e29b-41d4-a716-446655440000',
 'Schedule Series A Investor Meetings',
 'Meet with 15 top healthcare VCs (a16z Bio, Foresite, Google Ventures)',
 'Investor Relations',
 'critical',
 'pending',
 8,
 'CEO',
 NOW() + INTERVAL '2 months',
 NOW() - INTERVAL '3 weeks',
 NOW()),

('550e8400-e29b-41d4-a716-446655440119', '550e8400-e29b-41d4-a716-446655440000',
 'Prepare Financial Projections',
 'Build 5-year model showing path to $100M ARR with unit economics',
 'Finance',
 'high',
 'in_progress',
 13,
 'Finance Team',
 NOW() + INTERVAL '2 weeks',
 NOW() - INTERVAL '1 month',
 NOW() - INTERVAL '4 days'),

-- TEAM & OPERATIONS
('550e8400-e29b-41d4-a716-446655440120', '550e8400-e29b-41d4-a716-446655440000',
 'Hire VP of Clinical Affairs',
 'Recruit experienced medical director from top hospital or healthtech company',
 'Team',
 'critical',
 'in_progress',
 13,
 'HR',
 NOW() + INTERVAL '4 weeks',
 NOW() - INTERVAL '2 months',
 NOW() - INTERVAL '3 days'),

('550e8400-e29b-41d4-a716-446655440121', '550e8400-e29b-41d4-a716-446655440000',
 'Expand Engineering Team',
 'Hire 5 ML engineers and 3 backend engineers',
 'Team',
 'high',
 'in_progress',
 21,
 'Engineering Manager',
 NOW() + INTERVAL '3 months',
 NOW() - INTERVAL '2 months',
 NOW() - INTERVAL '1 week'),

('550e8400-e29b-41d4-a716-446655440122', '550e8400-e29b-41d4-a716-446655440000',
 'Implement OKR Framework',
 'Roll out quarterly OKRs across all teams with tracking dashboards',
 'Operations',
 'medium',
 'completed',
 5,
 'Operations',
 NOW() - INTERVAL '1 month',
 NOW() - INTERVAL '3 months',
 NOW() - INTERVAL '1 month'),

-- INFRASTRUCTURE & SECURITY
('550e8400-e29b-41d4-a716-446655440123', '550e8400-e29b-41d4-a716-446655440000',
 'Scale Cloud Infrastructure',
 'Migrate to Kubernetes with auto-scaling for 10K daily image analyses',
 'Development',
 'high',
 'in_progress',
 21,
 'DevOps',
 NOW() + INTERVAL '5 weeks',
 NOW() - INTERVAL '6 weeks',
 NOW() - INTERVAL '2 days'),

('550e8400-e29b-41d4-a716-446655440124', '550e8400-e29b-41d4-a716-446655440000',
 'Implement Disaster Recovery',
 'Multi-region backup with 99.99% uptime SLA',
 'Development',
 'high',
 'pending',
 13,
 'DevOps',
 NOW() + INTERVAL '6 weeks',
 NOW() - INTERVAL '1 month',
 NOW()),

-- CUSTOMER SUCCESS
('550e8400-e29b-41d4-a716-446655440125', '550e8400-e29b-41d4-a716-446655440000',
 'Build Doctor Training Program',
 'Create certification program for doctors using AI diagnostic tool',
 'Customer Success',
 'medium',
 'in_progress',
 8,
 'Training Team',
 NOW() + INTERVAL '1 month',
 NOW() - INTERVAL '3 weeks',
 NOW() - INTERVAL '5 days'),

('550e8400-e29b-41d4-a716-446655440126', '550e8400-e29b-41d4-a716-446655440000',
 'Launch 24/7 Clinical Support',
 'Hire medical support team for round-the-clock assistance',
 'Customer Success',
 'high',
 'pending',
 13,
 'Support',
 NOW() + INTERVAL '7 weeks',
 NOW() - INTERVAL '2 weeks',
 NOW()),

-- STRATEGIC INITIATIVES
('550e8400-e29b-41d4-a716-446655440127', '550e8400-e29b-41d4-a716-446655440000',
 'Explore Hospital Network Partnerships',
 'Negotiate pilot agreements with HCA Healthcare and Kaiser Permanente',
 'Business Development',
 'critical',
 'in_progress',
 21,
 'CEO',
 NOW() + INTERVAL '2 months',
 NOW() - INTERVAL '1 month',
 NOW() - INTERVAL '2 days'),

('550e8400-e29b-41d4-a716-446655440128', '550e8400-e29b-41d4-a716-446655440000',
 'Research International Markets',
 'Analyze regulatory requirements for EU, UK, and Canada expansion',
 'Strategy',
 'medium',
 'pending',
 8,
 'Strategy Team',
 NOW() + INTERVAL '3 months',
 NOW() - INTERVAL '2 weeks',
 NOW()),

('550e8400-e29b-41d4-a716-446655440129', '550e8400-e29b-41d4-a716-446655440000',
 'Patent AI Diagnostic Algorithm',
 'File provisional patent applications for core ML innovations',
 'Legal',
 'high',
 'in_progress',
 13,
 'Legal',
 NOW() + INTERVAL '5 weeks',
 NOW() - INTERVAL '2 months',
 NOW() - INTERVAL '6 days'),

('550e8400-e29b-41d4-a716-446655440130', '550e8400-e29b-41d4-a716-446655440000',
 'Build Strategic Advisory Board',
 'Recruit 5 prominent doctors and 2 healthcare executives as advisors',
 'Strategy',
 'medium',
 'in_progress',
 8,
 'CEO',
 NOW() + INTERVAL '6 weeks',
 NOW() - INTERVAL '1 month',
 NOW() - INTERVAL '1 week')

ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  priority = EXCLUDED.priority,
  updated_at = EXCLUDED.updated_at;

-- 5. Add Impressive Growth Metrics (showing clear upward trajectory)
INSERT INTO metrics (startup_id, metric_type, value, recorded_at) VALUES
-- Revenue Growth (last 6 months)
('550e8400-e29b-41d4-a716-446655440000', 'revenue', 0, NOW() - INTERVAL '6 months'),
('550e8400-e29b-41d4-a716-446655440000', 'revenue', 5000, NOW() - INTERVAL '5 months'),
('550e8400-e29b-41d4-a716-446655440000', 'revenue', 12000, NOW() - INTERVAL '4 months'),
('550e8400-e29b-41d4-a716-446655440000', 'revenue', 28000, NOW() - INTERVAL '3 months'),
('550e8400-e29b-41d4-a716-446655440000', 'revenue', 45000, NOW() - INTERVAL '2 months'),
('550e8400-e29b-41d4-a716-446655440000', 'revenue', 67000, NOW() - INTERVAL '1 month'),
('550e8400-e29b-41d4-a716-446655440000', 'revenue', 98000, NOW()),

-- User Growth (doctors using the platform)
('550e8400-e29b-41d4-a716-446655440000', 'users', 12, NOW() - INTERVAL '6 months'),
('550e8400-e29b-41d4-a716-446655440000', 'users', 28, NOW() - INTERVAL '5 months'),
('550e8400-e29b-41d4-a716-446655440000', 'users', 47, NOW() - INTERVAL '4 months'),
('550e8400-e29b-41d4-a716-446655440000', 'users', 89, NOW() - INTERVAL '3 months'),
('550e8400-e29b-41d4-a716-446655440000', 'users', 156, NOW() - INTERVAL '2 months'),
('550e8400-e29b-41d4-a716-446655440000', 'users', 234, NOW() - INTERVAL '1 month'),
('550e8400-e29b-41d4-a716-446655440000', 'users', 347, NOW()),

-- Burn Rate (monthly expenses)
('550e8400-e29b-41d4-a716-446655440000', 'burn_rate', 180000, NOW() - INTERVAL '6 months'),
('550e8400-e29b-41d4-a716-446655440000', 'burn_rate', 185000, NOW() - INTERVAL '5 months'),
('550e8400-e29b-41d4-a716-446655440000', 'burn_rate', 195000, NOW() - INTERVAL '4 months'),
('550e8400-e29b-41d4-a716-446655440000', 'burn_rate', 210000, NOW() - INTERVAL '3 months'),
('550e8400-e29b-41d4-a716-446655440000', 'burn_rate', 225000, NOW() - INTERVAL '2 months'),
('550e8400-e29b-41d4-a716-446655440000', 'burn_rate', 240000, NOW() - INTERVAL '1 month'),
('550e8400-e29b-41d4-a716-446655440000', 'burn_rate', 255000, NOW()),

-- Customer Acquisition Cost
('550e8400-e29b-41d4-a716-446655440000', 'cac', 5200, NOW() - INTERVAL '6 months'),
('550e8400-e29b-41d4-a716-446655440000', 'cac', 4800, NOW() - INTERVAL '5 months'),
('550e8400-e29b-41d4-a716-446655440000', 'cac', 4200, NOW() - INTERVAL '4 months'),
('550e8400-e29b-41d4-a716-446655440000', 'cac', 3600, NOW() - INTERVAL '3 months'),
('550e8400-e29b-41d4-a716-446655440000', 'cac', 3100, NOW() - INTERVAL '2 months'),
('550e8400-e29b-41d4-a716-446655440000', 'cac', 2800, NOW() - INTERVAL '1 month'),
('550e8400-e29b-41d4-a716-446655440000', 'cac', 2400, NOW())

ON CONFLICT DO NOTHING;

-- 6. Add Investor Hub Data (impressive pitch metrics)
INSERT INTO investor_hub (startup_id, pitch_score, funding_stage, target_amount, amount_raised, investor_interest, created_at, updated_at) VALUES
('550e8400-e29b-41d4-a716-446655440000',
 89,  -- High pitch score
 'Series A',
 10000000,  -- $10M target
 2000000,   -- $2M already raised (seed)
 87,        -- High investor interest
 NOW() - INTERVAL '3 months',
 NOW())
ON CONFLICT (startup_id) DO UPDATE SET
  pitch_score = EXCLUDED.pitch_score,
  funding_stage = EXCLUDED.funding_stage,
  target_amount = EXCLUDED.target_amount,
  amount_raised = EXCLUDED.amount_raised,
  investor_interest = EXCLUDED.investor_interest,
  updated_at = EXCLUDED.updated_at;

-- 7. Add Authentic Feedback (from doctors at real hospitals)
INSERT INTO feedback (startup_id, user_name, user_email, rating, category, message, status, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440000',
 'Dr. Sarah Chen',
 'sarah.chen@mayoclinic.org',
 5,
 'feature',
 'The AI diagnostic assistant has dramatically reduced our time to diagnosis in oncology cases. We''ve seen a 40% improvement in early detection rates. The interface is intuitive and the confidence scores help us make better decisions. Would love to see support for pediatric cases next!',
 'resolved',
 NOW() - INTERVAL '2 weeks'),

('550e8400-e29b-41d4-a716-446655440000',
 'Dr. Michael Rodriguez',
 'mrodriguez@johnshopkins.edu',
 5,
 'praise',
 'Absolutely game-changing for our radiology department. The AI catches subtle patterns in chest X-rays that even experienced radiologists might miss. We''ve integrated it into our daily workflow and our diagnostic accuracy has improved measurably. The real-time processing is impressive - results in under 3 seconds!',
 'resolved',
 NOW() - INTERVAL '3 weeks'),

('550e8400-e29b-41d4-a716-446655440000',
 'Dr. Emily Thompson',
 'emily.t@clevelandclinic.org',
 4,
 'feature',
 'Really impressed with the MRI analysis capabilities. The multi-modal integration works seamlessly. Only feedback: would be great to have better integration with Epic EMR for automatically pulling patient history. Overall, this is the future of diagnostic medicine.',
 'in_progress',
 NOW() - INTERVAL '5 days'),

('550e8400-e29b-41d4-a716-446655440000',
 'Dr. James Park',
 'jpark@stanford.edu',
 5,
 'praise',
 'We''ve been using HealthAI in our clinical trials for 3 months now. The accuracy is consistently above 94%, which is remarkable. The explainable AI features help us understand the reasoning, which is crucial for clinical acceptance. This will save countless lives.',
 'resolved',
 NOW() - INTERVAL '1 month'),

('550e8400-e29b-41d4-a716-446655440000',
 'Dr. Lisa Patel',
 'lpatel@ucsf.edu',
 5,
 'feature',
 'The patient safety features and audit trails are exactly what we need for regulatory compliance. HIPAA compliance is rock solid. As Chief of Radiology, I''m recommending this to our entire network of 12 hospitals. Would love to discuss enterprise licensing.',
 'resolved',
 NOW() - INTERVAL '6 weeks'),

('550e8400-e29b-41d4-a716-446655440000',
 'Dr. Robert Martinez',
 'rmartinez@mgh.harvard.edu',
 4,
 'bug',
 'Great product overall! Had one minor issue with CT scan uploads timing out for very large files (>500MB). Support team was responsive and fixed it within 24 hours. The diagnostic insights for lung cancer screening are exceptional.',
 'resolved',
 NOW() - INTERVAL '10 days')

ON CONFLICT DO NOTHING;

-- 8. Add Rich Activity Log (showing team collaboration)
INSERT INTO activity_log (startup_id, user_id, action_type, description, metadata, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'task_completed', 
 'Completed "Complete HIPAA Compliance Audit" - All security controls validated by third-party auditor', 
 '{"task_id": "550e8400-e29b-41d4-a716-446655440111", "category": "Compliance"}', NOW() - INTERVAL '2 hours'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'milestone_progress',
 'Made significant progress on "FDA Pre-Submission Meeting" - Submitted initial documentation package',
 '{"milestone_id": "550e8400-e29b-41d4-a716-446655440004", "progress": 75}', NOW() - INTERVAL '5 hours'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'investor_update',
 'Updated pitch deck with Q4 metrics: 347 active doctors, 96% diagnostic accuracy, $98K MRR',
 '{"pitch_score": 89}', NOW() - INTERVAL '1 day'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'partnership_signed',
 'Signed pilot agreement with Cleveland Clinic - 25 doctors, 6-month trial, $150K contract',
 '{"partner": "Cleveland Clinic", "value": 150000}', NOW() - INTERVAL '2 days'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'task_completed',
 'Completed "Analyze Clinical Trial Results" - 94.2% accuracy across 5 hospital sites',
 '{"task_id": "550e8400-e29b-41d4-a716-446655440107", "accuracy": 94.2}', NOW() - INTERVAL '3 days'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'funding_milestone',
 'Received term sheet from Andreessen Horowitz Bio + Health for $10M Series A',
 '{"amount": 10000000, "investor": "a16z Bio + Health"}', NOW() - INTERVAL '5 days'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'product_launch',
 'Launched Multi-Modal Analysis v2.0 - Now supporting CT, MRI, X-Ray, and Ultrasound',
 '{"version": "2.0", "features": ["CT", "MRI", "X-Ray", "Ultrasound"]}', NOW() - INTERVAL '1 week'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'team_growth',
 'Hired VP of Clinical Affairs - Dr. Amanda Foster from Johns Hopkins',
 '{"position": "VP Clinical Affairs", "name": "Dr. Amanda Foster"}', NOW() - INTERVAL '10 days'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'milestone_completed',
 'Completed "Initial Clinical Validation" - Published results showing 94%+ accuracy',
 '{"milestone_id": "550e8400-e29b-41d4-a716-446655440002"}', NOW() - INTERVAL '4 months'),

('550e8400-e29b-41d4-a716-446655440000', (SELECT user_id FROM temp_user), 'milestone_completed',
 'Completed "Seed Funding Secured" - Raised $2M from Khosla Ventures and General Catalyst',
 '{"milestone_id": "550e8400-e29b-41d4-a716-446655440003", "amount": 2000000}', NOW() - INTERVAL '3 months')

ON CONFLICT DO NOTHING;

-- 9. Add AI Insights (showing intelligent recommendations)
INSERT INTO ai_insights (startup_id, insight_type, title, description, priority, impact_score, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440000',
 'opportunity',
 'Enterprise Healthcare Partnerships',
 'Analysis shows 67% of hospital networks are actively seeking AI diagnostic solutions. Your clinical accuracy metrics (94%+) position you well for enterprise deals. Recommend targeting top 20 hospital systems with dedicated enterprise sales team. Potential: $5M+ ARR from 3-4 major contracts.',
 'high',
 92,
 NOW() - INTERVAL '3 days'),

('550e8400-e29b-41d4-a716-446655440000',
 'risk',
 'FDA Regulatory Timeline Risk',
 'FDA 510(k) approval typically takes 6-12 months. Current timeline for submission is aggressive. Recommend allocating additional resources to regulatory affairs and considering expedited review pathways. Delay could impact Series A fundraising timeline and revenue projections.',
 'high',
 88,
 NOW() - INTERVAL '5 days'),

('550e8400-e29b-41d4-a716-446655440000',
 'optimization',
 'Reduce Customer Acquisition Cost',
 'Your CAC has dropped from $5,200 to $2,400 over 6 months - excellent progress! AI analysis suggests focusing on referral programs from existing satisfied doctors could reduce CAC below $2,000. Current NPS of 73 indicates strong word-of-mouth potential. Implement formal referral rewards program.',
 'medium',
 78,
 NOW() - INTERVAL '1 week'),

('550e8400-e29b-41d4-a716-446655440000',
 'growth',
 'International Expansion Timing',
 'European healthcare AI market growing at 42% CAGR. Your technology stack is ready for CE Mark certification (simpler than FDA). Recommend starting EU expansion parallel to US growth. UK and Germany represent $50M+ market opportunity. Begin regulatory preparation now for Q3 2026 launch.',
 'medium',
 85,
 NOW() - INTERVAL '2 weeks'),

('550e8400-e29b-41d4-a716-446655440000',
 'opportunity',
 'Strategic Partnership with Imaging Equipment Manufacturers',
 'Consider partnerships with GE Healthcare, Siemens Healthineers, or Philips to bundle your AI software with their imaging equipment. This could provide distribution to 10,000+ hospitals globally. Precedent: Zebra Medical''s partnership with GE generated $30M+ ARR.',
 'high',
 90,
 NOW() - INTERVAL '10 days'),

('550e8400-e29b-41d4-a716-446655440000',
 'optimization',
 'Optimize Model Inference Costs',
 'Current cloud infrastructure costs are $45K/month for ML inference. Analysis shows 40% cost reduction possible through: 1) Model quantization (8-bit inference), 2) Optimized GPU utilization, 3) Spot instance usage. This would improve unit economics and extend runway by 4 months.',
 'medium',
 72,
 NOW() - INTERVAL '2 weeks')

ON CONFLICT DO NOTHING;

-- Re-enable triggers after bulk insert
SET session_replication_role = 'origin';

-- Summary Query - View all HealthAI data
SELECT 
  'HealthAI Demo Data Loaded Successfully!' as status,
  (SELECT COUNT(*) FROM milestones WHERE startup_id = '550e8400-e29b-41d4-a716-446655440000') as milestones,
  (SELECT COUNT(*) FROM tasks WHERE startup_id = '550e8400-e29b-41d4-a716-446655440000') as tasks,
  (SELECT COUNT(*) FROM metrics WHERE startup_id = '550e8400-e29b-41d4-a716-446655440000') as metrics,
  (SELECT COUNT(*) FROM feedback WHERE startup_id = '550e8400-e29b-41d4-a716-446655440000') as feedback_entries,
  (SELECT COUNT(*) FROM activity_log WHERE startup_id = '550e8400-e29b-41d4-a716-446655440000') as activities,
  (SELECT COUNT(*) FROM ai_insights WHERE startup_id = '550e8400-e29b-41d4-a716-446655440000') as ai_insights;
