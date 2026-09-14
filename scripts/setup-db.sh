#!/bin/bash

# Database setup script for Conductor
# Run this to initialize Supabase database with migrations

set -e

echo "Setting up Conductor database..."

# Check for Supabase CLI
if ! command -v supabase &> /dev/null; then
    echo "Supabase CLI not found. Please install it first:"
    echo "  npm install -g supabase"
    echo "Or visit: https://supabase.com/docs/guides/cli/install"
    exit 1
fi

# Check Supabase project is linked
if [ ! -f ".supabase/config.toml" ]; then
    echo "No Supabase project linked. Run 'supabase init' first."
    echo "See: https://supabase.com/docs/guides/cli/getting-started"
    exit 1
fi

# Run migrations
echo "Running database migrations..."
supabase db reset --force

echo "Database setup complete!"