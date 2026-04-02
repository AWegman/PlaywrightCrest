#!/bin/bash
# Append trust rule to pg_hba.conf to allow local network connections
echo "host all all all trust" >> /var/lib/postgresql/data/pg_hba.conf
