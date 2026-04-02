#!/bin/bash
set -e

PGDATA="${PGDATA:-/var/lib/postgresql/data}"

# Wait for PostgreSQL to start
until pg_isready -U postgres > /dev/null 2>&1; do
  echo "Waiting for PostgreSQL..."
  sleep 1
done

# Check if pg_hba.conf already has trust rule
if ! grep -q "0.0.0.0/0" "$PGDATA/pg_hba.conf" 2>/dev/null; then
  echo "Updating pg_hba.conf for remote access..."
  
  # Create new pg_hba.conf with permissive settings
  cat > "$PGDATA/pg_hba.conf" << 'EOF'
# PostgreSQL Client Authentication Configuration
# Allow all connections
local   all             all                                     trust
host    all             all             0.0.0.0/0              trust
host    all             all             ::/0                   trust
EOF
  
  # Reload PostgreSQL configuration
  psql -U postgres -c "SELECT pg_reload_conf();" || true
fi

echo "PostgreSQL configured successfully"

