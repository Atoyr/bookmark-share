# @repo/supabase

Supabase の設定とデータベース管理用パッケージ

## コマンド

### Supabase の起動・停止

```bash
# Supabase をローカルで起動
pnpm run start

# Supabase を停止
pnpm run stop
```

### データベース型生成

```bash
# ローカル DB から TypeScript 型を生成
pnpm run db:gen:local
```

### マイグレーション管理

```bash
# 新しいマイグレーションファイルを作成
pnpm run db:mig:new:local <migration_name>

# マイグレーションを適用
pnpm run db:mig:up:local

# マイグレーションの差分を確認（ファイルは生成しない）
pnpm run db:diff:local:dry

# マイグレーションファイルを生成
pnpm run db:diff:local <migration_name>
```

### データベース操作

```bash
# DB をリセット（マイグレーションを再適用）
pnpm run db:reset

# ローカル DB のデータを seed.sql にダンプ
pnpm run db:dump:data:local

# リモート DB からスキーマを取得
pnpm run db:pull

# ローカルのマイグレーションをリモートに適用
pnpm run db:push
```

### Supabase Studio

```bash
# Supabase Studio を起動
pnpm run db:studio
```
