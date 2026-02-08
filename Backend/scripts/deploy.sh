#!/bin/bash

# ============================================
# Deploy All Edge Functions
# ============================================
# Quick script to deploy all Edge Functions at once

set -e

echo "🚀 Deploying all Edge Functions..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Functions to deploy
FUNCTIONS=("ai-task-generator" "ai-pitch-analyzer" "ai-insights-generator")

# Check if logged in and linked
if ! supabase functions list &> /dev/null; then
    echo -e "${RED}❌ Not linked to a project${NC}"
    echo "Run: supabase link --project-ref YOUR_PROJECT_REF"
    exit 1
fi

# Deploy each function
SUCCESS_COUNT=0
FAIL_COUNT=0

for func in "${FUNCTIONS[@]}"; do
    echo "Deploying $func..."
    
    if supabase functions deploy "$func" --no-verify-jwt; then
        echo -e "${GREEN}✅ $func deployed successfully${NC}"
        ((SUCCESS_COUNT++))
    else
        echo -e "${RED}❌ Failed to deploy $func${NC}"
        ((FAIL_COUNT++))
    fi
    
    echo ""
done

# Summary
echo "================================================"
echo "Deployment Summary"
echo "================================================"
echo -e "${GREEN}✅ Successful: $SUCCESS_COUNT${NC}"

if [ $FAIL_COUNT -gt 0 ]; then
    echo -e "${RED}❌ Failed: $FAIL_COUNT${NC}"
else
    echo "🎉 All functions deployed successfully!"
fi

echo ""
echo "View functions at:"
supabase functions list

echo ""
