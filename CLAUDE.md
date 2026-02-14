# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリのコードを扱う際のガイダンスを提供します。

## プロジェクト概要

Bookmark-share は、スペース内のユーザーとブックマークを保存・共有するための Web アプリケーションです。Turbo モノレポで Nuxt 4 + Supabase を使用して構築されています。

## コマンド

### 開発
```bash
# Supabase を起動（アプリ実行前に必要）
pnpm run supabase:start

# 開発サーバーを起動
pnpm run dev

# Supabase を停止
pnpm run supabase:stop
```

### テスト
```bash
# 全テストを実行
pnpm run test

# apps/web でテストを実行
cd apps/web
pnpm test              # 1回実行
pnpm test:watch        # ウォッチモード
pnpm test:ui           # UI付き
```

テストプロジェクトは `apps/web/vitest.config.ts` で設定されています：
- `unit`: `test/{e2e,unit}/*.{test,spec}.ts`（node 環境）
- `api`: `server/**/*.{test,spec}.ts`（nuxt 環境）
- `nuxt`: `test/nuxt/*.{test,spec}.ts`, `app/components/**/*.{test,spec}.ts`（nuxt 環境）

カバレッジ除外対象: `nuxt.config.ts`, `app/components/ui/**`, `**/*.mjs`, `.nuxt/**`

### データベース
```bash
# ローカル DB から TypeScript 型を生成
pnpm run db:gen:local

# データベースコマンド（packages/supabase から実行）
cd packages/supabase
pnpm run db:mig:new:local <name>     # マイグレーション作成
pnpm run db:mig:up:local             # マイグレーション適用
pnpm run db:diff:local <name>        # マイグレーション差分を生成
pnpm run db:reset                    # データベースリセット
pnpm run db:studio                   # Supabase Studio を開く
```

### リント & フォーマット
```bash
pnpm run lint          # ESLint
pnpm run format        # Prettier
pnpm run check-types   # TypeScript 型チェック
```

### ビルド
```bash
pnpm run build         # プロダクションビルド（Turbo 経由）
```

## アーキテクチャ

```
bookmark-share/
├── apps/web/                  # Nuxt 4 アプリケーション
│   ├── app/
│   │   ├── assets/            # 静的アセット（CSS）
│   │   ├── components/        # Vue コンポーネント
│   │   │   ├── ui/            # shadcn-vue コンポーネント（プレフィックス: Shad）
│   │   │   ├── app-sidebar/   # メインサイドバーナビゲーション
│   │   │   ├── bookmark-form/ # ブックマーク作成/編集フォーム
│   │   │   ├── bookmarks/     # ブックマーク一覧
│   │   │   ├── login-form/    # ログインフォーム
│   │   │   └── ...            # avatar, page, tag など
│   │   ├── composables/       # Vue コンポーザブル
│   │   ├── layouts/           # ページレイアウト（default, guest）
│   │   ├── lib/               # ユーティリティ関数（utils.ts）
│   │   ├── pages/             # ルートページ
│   │   ├── plugins/           # Nuxt プラグイン（例: ssr-width）
│   │   ├── schemas/forms/     # Zod + Vee-Validate フォームスキーマ
│   │   ├── types/             # アプリレベルの TypeScript 型
│   │   └── utils/             # ユーティリティヘルパー
│   ├── server/
│   │   ├── api/               # API ルート（*.get.ts, *.post.ts）
│   │   ├── auth/              # 認証プロバイダーシステム
│   │   │   ├── core/factory.ts  # プロバイダーファクトリ（環境変数駆動）
│   │   │   ├── providers/     # supabase.ts, mock.ts
│   │   │   └── helpers.ts     # getUser(), requireUser()
│   │   ├── repositories/      # データベースアクセス層
│   │   ├── schemas/           # サーバーサイド Zod スキーマ + 変換
│   │   ├── types/             # サーバーレベルの TypeScript 型
│   │   └── usecases/          # ビジネスロジックサービス
│   ├── shared/                # クライアントとサーバー間の共有
│   │   ├── schemas/           # Zod バリデーションスキーマ（API 構造をミラー）
│   │   └── types/dto/         # データ転送オブジェクト（API リクエスト/レスポンス型）
│   └── test/                  # E2E および Nuxt 統合テスト
└── packages/
    ├── supabase/              # Supabase 設定、マイグレーション、生成された型
    │   ├── src/types.gen.ts   # 自動生成された DB 型
    │   └── supabase/          # Supabase CLI 設定（config.toml, migrations/）
    └── eslint-config/         # 共有 ESLint 設定
```

## ルート

- `/` - ホームページ
- `/login` - ログインページ
- `/confirm` - 認証確認コールバック
- `/dashboard` - ダッシュボード
- `/bookmarks` - ブックマーク一覧
- `/bookmarks/[bookmark_id]` - ブックマーク詳細
- `/spaces` - スペース一覧
- `/spaces/[space_id]` - スペース詳細
- `/spaces/[space_id]/setting` - スペース設定
- `/profile` - ユーザープロフィール一覧
- `/profile/[user_id]` - ユーザープロフィール
- `/profile/me` - 自分のプロフィール

## 技術スタック

- **フロントエンド**: Nuxt 4, Vue 3, TypeScript
- **UI**: shadcn-vue（New York スタイル、プレフィックス `Shad`）, TailwindCSS 4, Lucide icons, reka-ui
- **テーブル**: @tanstack/vue-table
- **フォーム**: Vee-Validate + Zod（`@vee-validate/zod` の `toTypedSchema`）
- **ユーティリティ**: @vueuse/core, clsx, tailwind-merge, class-variance-authority
- **バックエンド**: Supabase（PostgreSQL 15 + RLS）
- **ビルド**: Turbo モノレポ
- **パッケージマネージャー**: pnpm 10.x
- **Node**: >= 18

## 主要パターン

### UI コンポーネント
shadcn-vue コンポーネントは `apps/web/app/components/ui/` に配置され、`Shad` プレフィックスを使用します。CLI で新しいコンポーネントを追加：
```bash
npx shadcn-vue@latest add <component>
```

### API ルート
サーバールートは `server/api/` で Nuxt の規約に従います。テストは同じディレクトリに配置されます（例: `index.get.ts` + `index.get.test.ts`）。

API レスポンスは `shared/types/dto/`（例: `bookmarks.dto.ts`, `spaces.dto.ts`）で定義された一貫した DTO パターンに従います。ページネーションは `getRange()` ユーティリティを使用し、`{ items, total, page, pageSize }` 形式のレスポンスを返します。

### サーバーアーキテクチャ

**リポジトリ** (`server/repositories/`): 依存性注入を使用したデータベースアクセス層。コンストラクタで `ServerSupabaseClient` を受け取り、インターフェースベースの設計。

**ユースケース** (`server/usecases/`): ビジネスロジックサービス（例: `bookmarkService.ts`, `profileService.ts`）。

**スキーマ** (`server/schemas/`): サーバーサイドの Zod スキーマと変換関数（例: `bookmarkRowTransformBookmark` は DB 行をドメイン型に変換）。

### 共有スキーマと DTO
`apps/web/shared/` にはクライアントとサーバー間で共有されるバリデーションスキーマと DTO が含まれます：
- `shared/schemas/` - API バリデーション用 Zod スキーマ（`server/api/` の構造をミラー）
- `shared/types/dto/` - API リクエスト/レスポンス型の TypeScript DTO（bookmarks, spaces, profiles, tags）

### データベース型
Supabase スキーマから自動生成された型は `packages/supabase/src/types.gen.ts` にあります。スキーマ変更後は `pnpm run db:gen:local` で再生成してください。各テーブルの row/insert/update 型をエクスポートします（例: `SpaceRow`, `SpaceInsert`, `SpaceUpdate`）。

`@bookmark-share/supabase/server-client` エクスポートは、サーバーサイドで使用する `ServerSupabaseClient` 型とゲッター関数を提供します。

### 認証
`@nuxtjs/supabase` モジュールを使用し、認証プロバイダーのファクトリパターンを採用：
- プロバイダーは `AUTH_PROVIDER` 環境変数で選択（`'supabase'` または `'mock'`）
- ファクトリは `server/auth/core/factory.ts`
- ヘルパー: `getUser()` は User または null を返す、`requireUser()` は未認証の場合 401 をスロー
- テスト用モックプロバイダーあり（`server/auth/providers/mock.ts`）
- テストでのオーバーライドは `__setAuthProviderForTests()` を使用

### コンポーザブル
`app/composables/` の全コンポーザブルは `useFetch` で API 呼び出しをラップし、読み取り専用の computed 値と refresh メソッドを返します：
- `useAuth` - 認証状態
- `useBookmark` / `useBookmarks` - ブックマーク操作と一覧
- `useSpace` / `useSpaces` - スペース操作と一覧
- `useTag` / `useTags` - タグ操作と一覧
- `useProfile` - ユーザープロフィール
- `useBreadcrumb` - パンくずナビゲーション

### 環境変数
Supabase 環境変数のサンプルは `packages/supabase/supabase/.env.sample` にあります。主要な変数：
- `SUPABASE_URL` / `PUBLIC_SUPABASE_URL` - Supabase API URL
- `SUPABASE_ANON_KEY` / `PUBLIC_SUPABASE_ANON_KEY` - Supabase 匿名キー
- `SUPABASE_SERVICE_ROLE_KEY` - サービスロールキー（サーバー専用）
- `AUTH_PROVIDER` - 認証プロバイダー選択（`'supabase'` または `'mock'`）
- `AUTH_GOOGLE_CLIENT_ID` / `AUTH_GOOGLE_CLIENT_SECRET` - Google OAuth（Supabase 環境変数内）

### Supabase ローカルポート
- API: 54321
- PostgreSQL: 54322
