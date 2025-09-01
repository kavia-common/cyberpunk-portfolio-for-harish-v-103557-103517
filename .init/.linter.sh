#!/bin/bash
cd /home/kavia/workspace/code-generation/cyberpunk-portfolio-for-harish-v-103557-103517/portfolio_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

