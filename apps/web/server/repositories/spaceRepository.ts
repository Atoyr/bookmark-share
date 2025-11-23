import type { ServerSupabaseClient } from '@repo/supabase/server-client';
import type { Space } from '../types/space';
import { spaceRowTransformSpace, spaceRowWithDatetimeTransformSpace } from '../schemas/space';

/**
 * Repository が満たすべきインターフェース
 * ここに “契約” を書く
 */
export interface SpaceRepository {
  findByUserId(userId: string): Promise<Space[]>;
  findById(id: string): Promise<Space | null>;
  newSpaceWithOwner(name: string): Promise<Space>;
}

/**
 * Supabase を使った実装
 * 実運用ではこれを使う
 */
export class SpaceRepository implements SpaceRepository {
  constructor(private readonly client: ServerSupabaseClient) {}

  async findAll(): Promise<Space[]> {
    const { data, error } = await this.client.from('spaces').select('*');

    if (error) {
      throw error;
    }

    if (!data) {
      return [];
    }

    return spaceRowTransformSpace.array().parse(data);
  }

  async findById(id: string): Promise<Space | null> {
    const { data, error } = await this.client
      .from('spaces')
      .select(
        `
        id, 
        name, 
        description,
        owner_id,
        image, 
        created_at, 
        updated_at, 
        space_users (
          id, 
          space_id,
          uid, 
          users (
            id, 
            name, 
            avatar
          )
        )
        `
      )
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    return spaceRowWithDatetimeTransformSpace.parse(data);
  }

  async newSpaceWithOwner(name: string): Promise<Space> {
    const { data, error } = await this.client.from('spaces').insert({
      name: name,
    }).select('*').single();

    if (error) {
      throw error;
    }

    const space = spaceRowTransformSpace.parse(data);

    const { error: spaceError } = await this.client.from('space_users').insert({
      space_id: space.id,
    }).select().single();

    if (spaceError) {
      throw spaceError;
    }

    return (await this.findById(space.id)) as Space;
  }
}
