import type { H3Event } from 'h3';
import type { AuthProvider } from './types';

let _provider: AuthProvider | null = null;

/**
 * auth providerを取得するファクトリ関数
 * @returns AuthProvider インスタンス
 */
export async function getAuthProvider(): Promise<AuthProvider> {
  if (_provider) return _provider;

  const providerName = process.env.AUTH_PROVIDER ?? 'mock'; // 例: 'supabase' / 'jwt' / 'mock'
  switch (providerName) {
    case 'supabase':
      _provider = (await import('../providers/supabase')).default;
      break;
    case 'mock':
      _provider = (await import('../providers/mock')).default;
      break;
    default:
      throw new Error(`Unknown AUTH_PROVIDER: ${providerName}`);
  }
  return _provider;
}

/**
 * テスト時にgetAuthProviderで返すAuthProviderを差し替えるための関数
 * @param p AuthProvider インスタンス
 */
export function __setAuthProviderForTests(p: AuthProvider | null) {
  _provider = p;
}
