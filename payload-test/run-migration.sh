#!/bin/bash
# Load environment variables from .env.local
export $(cat .env.local | grep -v '^#' | xargs)

# Run Prisma migration with the DATABASE_URL
yarn prisma migrate dev --name add_admin_user
