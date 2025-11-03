import type { H3Event } from 'h3'

export type User = {
  id: string
  email?: string
  roles?: string[]
  [k: string]: unknown
}

export interface AuthProvider {
  /** 現在のリクエストからユーザーを復元（未認証なら null） */
  getUser(event: H3Event): Promise<User | null>

  /** （必要なら）ログイン開始URLを返す */
  getLoginUrl?(event: H3Event, opts?: Record<string, any>): Promise<string>

  /** OAuth コールバック等 → セッション確立 */
  createSession?(event: H3Event): Promise<void>

  /** ログアウト（Cookie削除など） */
  clearSession?(event: H3Event): Promise<void>
}

