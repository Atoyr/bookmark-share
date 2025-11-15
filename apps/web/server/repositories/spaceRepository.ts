import type { SpaceRow } from '@repo/supabase';
import type { ServerSupabaseClient } from '@repo/supabase/server-client';
import type { Space } from '../types/space';

/**
 * Repository が満たすべきインターフェース
 * ここに “契約” を書く
 */
export interface SpaceRepository {
  findByUserId(userId: string): Promise<Space[]>;
  findById(id: string): Promise<Space | null>;
}

/**
 * Supabase を使った実装
 * 実運用ではこれを使う
 */
export class SpaceRepository implements SpaceRepository {
  constructor(private readonly client: ServerSupabaseClient) {}

  async findAll(): Promise<Space[]> {
    const { data, error } = await this.client.from('spaces').select('*').returns<SpaceRow[]>();

    if (error) {
      throw new Error(`Failed to fetch spaces: ${error.message}`);
    }

    if (!data) {
      return [];
    }

    return data.map((row) => ({
      id: row.id,
      name: row.name,
      ownerId: row.owner_id,
      image: row.image,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  async findById(id: string): Promise<Space | null> {
    const { data, error } = await this.client.from('spaces').select('*').eq('id', id).maybeSingle();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch space: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      ownerId: data.owner_id,
      image: data.image,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
  }
}
