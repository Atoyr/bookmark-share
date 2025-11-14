import type { Database, SpaceRow } from '@repo/supabase'
import type { Space } from '../types/space';
import { serverSupabaseClient } from '#supabase/server'

/**
 * Repository が満たすべきインターフェース
 * ここに “契約” を書く
 */
export interface SpaceRepository {
  findByUserId(userId: string): Promise<Space[]>
  findById(id: string): Promise<Space | null>
}

/**
 * Supabase を使った実装
 * 実運用ではこれを使う
 */
export class SpaceRepository implements SpaceRepository {
  constructor(
    private readonly client: SupabaseClient<Database>
  ) {}

  static create(): SpaceRepository {
    const client = serverSupabaseClient()
    return new SpaceRepository(client)
  }

  async findAll(): Promise<SpaceRow[]> {
    const { data, error } = await this.client
      .from('spaces')
      .select('*')
      .returns<SpaceRow[]>()

    if (error) {
      throw new Error(`Failed to fetch spaces: ${error.message}`)
    }

    return data ?? []
  }

  async findById(id: string): Promise<SpaceRow | null> {
    const { data, error } = await this.client
      .from('spaces')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch space: ${error.message}`)
    }

    return data ?? null
  }
}

