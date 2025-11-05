#!/bin/bash

# .envファイルのパス
ENV_FILE="supabase/.env"

# .envファイルの存在確認
if [ ! -f $ENV_FILE ]; then
  echo "Error: .env file not found"
  exit 1
fi

# 環境変数を自動的にexportしながら読み込む
set -a
source $ENV_FILE
set +a

# コマンド選択
case $1 in
  gen-types)
    echo "Generating Supabase TypeScript types..."
    supabase gen types typescript --local > apps/web/types/supabase/schema.ts
    ;;
  db-diff)
    if [ -z "$2" ]; then
      echo "Please provide a file name for the diff."
      exit 1
    fi
    echo "Generating database diff..."
    supabase db diff --use-migra -f $2
    ;;
  db-reset)
    echo "Reset database..."
    supabase db reset
    ;;
  db-dump)
    echp "Dumping database..."
    supabase db dump --local --data-only -f ./supabase/seed.sql
    ;;
  start)
    echo "Starting Supabase..."
    supabase start
    ;;
  stop)
    echo "Starting Supabase..."
    supabase stop
    ;;
  status)
    supabase status
    ;;
  *)
    echo "Usage: $0 {gen-types|db-diff|db-reset|db-dump|start|stop|status}"
    ;;
esac
