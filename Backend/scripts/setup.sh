#!/bin/bash

# ============================================
# StartupOps Backend - Complete Setup Script
# ============================================
# This script automates the entire backend setup process
# Run this after creating your Supabase project

set -e  # Exit on error

echo "🚀 StartupOps Backend Setup Script"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ============================================
# Check Prerequisites
# ============================================

echo "📋 Checking prerequisites..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI not found${NC}"
    echo "Install it: npm install -g supabase"
    exit 1
fi

echo -e "${GREEN}✅ Supabase CLI installed${NC}"

# Check if logged in
if ! supabase projects list &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Supabase${NC}"
    echo "Running: supabase login"
    supabase login
fi

echo -e "${GREEN}✅ Logged in to Supabase${NC}"
echo ""

# ============================================
# Get Project Information
# ============================================

echo "📝 Project Information"
echo "======================"
echo ""

# Ask for project ref
read -p "Enter your Supabase project reference ID: " PROJECT_REF

if [ -z "$PROJECT_REF" ]; then
    echo -e "${RED}❌ Project reference is required${NC}"
    exit 1
fi

# Ask for OpenAI key
read -p "Enter your OpenAI API key (or leave empty to skip): " OPENAI_KEY

echo ""

# ============================================
# Link Project
# ============================================

echo "🔗 Linking to Supabase project..."

if supabase link --project-ref "$PROJECT_REF"; then
    echo -e "${GREEN}✅ Project linked successfully${NC}"
else
    echo -e "${RED}❌ Failed to link project${NC}"
    exit 1
fi

echo ""

# ============================================
# Deploy Database Schema
# ============================================

echo "📊 Deploying database schema..."
echo ""

# Check if we can run SQL files directly (requires connection string)
echo "ℹ️  You'll need to run SQL scripts manually in Supabase Dashboard"
echo ""
echo "Go to: https://app.supabase.com/project/$PROJECT_REF/sql/new"
echo ""
echo "Run these files in order:"
echo "  1. database/01_schema.sql"
echo "  2. database/02_triggers.sql"
echo "  3. database/03_rls_policies.sql"
echo "  4. database/04_storage.sql"
echo "  5. database/05_seed_data.sql (optional, test data)"
echo ""
read -p "Press Enter when you've run all SQL scripts..."

echo -e "${GREEN}✅ Database setup complete${NC}"
echo ""

# ============================================
# Set Secrets
# ============================================

if [ -n "$OPENAI_KEY" ]; then
    echo "🔐 Setting secrets..."
    
    if supabase secrets set OPENAI_API_KEY="$OPENAI_KEY"; then
        echo -e "${GREEN}✅ OpenAI API key set${NC}"
    else
        echo -e "${YELLOW}⚠️  Failed to set OpenAI key (you can set it manually later)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipping OpenAI key (you can set it later with: supabase secrets set)${NC}"
fi

echo ""

# ============================================
# Deploy Edge Functions
# ============================================

echo "⚡ Deploying Edge Functions..."
echo ""

FUNCTIONS=("ai-task-generator" "ai-pitch-analyzer" "ai-insights-generator")

for func in "${FUNCTIONS[@]}"; do
    echo "Deploying $func..."
    if supabase functions deploy "$func"; then
        echo -e "${GREEN}✅ $func deployed${NC}"
    else
        echo -e "${RED}❌ Failed to deploy $func${NC}"
        exit 1
    fi
done

echo ""
echo -e "${GREEN}✅ All Edge Functions deployed${NC}"
echo ""

# ============================================
# Verify Deployment
# ============================================

echo "🔍 Verifying deployment..."
echo ""

# List functions
echo "Deployed functions:"
supabase functions list

echo ""

# List secrets (masked)
echo "Set secrets:"
supabase secrets list

echo ""

# ============================================
# Generate .env File
# ============================================

echo "📝 Generating .env file for frontend..."

# Get project details
SUPABASE_URL="https://$PROJECT_REF.supabase.co"

echo ""
echo "Go to your Supabase project settings to get the anon/public key:"
echo "https://app.supabase.com/project/$PROJECT_REF/settings/api"
echo ""
read -p "Enter your anon/public key: " ANON_KEY

if [ -n "$ANON_KEY" ]; then
    # Create .env file in Frontend directory
    ENV_FILE="../Frontend/.env"
    
    cat > "$ENV_FILE" << EOF
# Supabase Configuration
VITE_SUPABASE_URL=$SUPABASE_URL
VITE_SUPABASE_ANON_KEY=$ANON_KEY

# Optional: Add analytics keys here
# VITE_GA_TRACKING_ID=
# VITE_SENTRY_DSN=
EOF

    echo -e "${GREEN}✅ .env file created at $ENV_FILE${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping .env file creation${NC}"
fi

echo ""

# ============================================
# Success Summary
# ============================================

echo ""
echo "================================================"
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "================================================"
echo ""
echo "✅ Project linked"
echo "✅ Database schema deployed"
echo "✅ Edge Functions deployed"
echo "✅ Secrets configured"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Start your frontend:"
echo "   cd ../Frontend"
echo "   npm run dev"
echo ""
echo "2. Test the application:"
echo "   - Sign up with a test account"
echo "   - Create a startup"
echo "   - Try AI features"
echo ""
echo "3. View dashboard:"
echo "   https://app.supabase.com/project/$PROJECT_REF"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Overview and quick start"
echo "   - QUICKSTART.md - Step-by-step guide"
echo "   - DATABASE.md - Database schema details"
echo "   - DEPLOYMENT.md - Production deployment"
echo ""
echo "💬 Need help?"
echo "   - Supabase Discord: discord.supabase.com"
echo "   - Documentation: supabase.com/docs"
echo ""
echo "================================================"
echo ""
