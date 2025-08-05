#!/bin/bash
cd /home/kavia/workspace/code-generation/role-based-team-dashboard-50989-51005/team_dashboard_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

