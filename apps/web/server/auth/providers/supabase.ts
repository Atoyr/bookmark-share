import type { H3Event } from 'h3';
import type { AuthProvider, User } from '../core/types';

// 依存は極力「薄く」保つ：Nuxtモジュールを直参照せず、安全に dynamic import
async function getServerSupabase(event: H3Event) {
  // @nuxtjs/supabase のサーバ用helpers（存在すれば使う）
  const mod = await import('#supabase/server').catch(() => null as any);
  if (!mod) throw new Error('Supabase server helpers not available');
  const user = await mod.serverSupabaseUser(event);
  return { user };
}

const supabaseProvider = {
  async getUser(event: H3Event): Promise<User | null> {
    const { user } = await getServerSupabase(event);
    if (!user) return null;
    return { id: user.sub, email: user.email ?? undefined };
  },
  async clearSession(event: H3Event) {
    // 必要なら serverSupabaseClient で signOut するなど（省略可・Cookie削除はSupabase管理）
  },
} satisfies AuthProvider;

export default supabaseProvider;
