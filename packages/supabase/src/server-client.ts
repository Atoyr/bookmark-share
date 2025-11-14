import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types.gen";

export type ServerSupabaseClient = SupabaseClient<Database>;

let _client: ServerSupabaseClient | null = null;

/**
 * サーバサイド専用 SupabaseClient を返す
 * - service_role を使用する
 * - モジュール内で単一インスタンスを保持（疑似シングルトン）
 */
export function getServerSupabaseClient(): ServerSupabaseClient {
  if (_client) return _client;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY が設定されていません",
    );
  }

  _client = createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false },
  });

  return _client;
}
