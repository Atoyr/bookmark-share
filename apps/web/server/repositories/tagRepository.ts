import type { ServerSupabaseClient } from '@repo/supabase/server-client';
import { tagDefinitionsRowSchema } from '@repo/supabase';
import type { Tag } from '../types/tag';

/**
 * Repository が満たすべきインターフェース
 * ここに “契約” を書く
 */
export interface TagRepository {
  findBySpaceId(spaceId: string): Promise<Tag[]>;
  findById(id: string): Promise<Tag | null>;
}

export const tagDefinitionsRowTransformTag = tagDefinitionsRowSchema.transform(
  (row): Tag => ({
    id: row.id,
    name: row.name,
    color: "", 
  })
);


/**
 * Supabase を使った実装
 * 実運用ではこれを使う
 */
export class TagRepository implements TagRepository {
  constructor(private readonly client: ServerSupabaseClient) {}



  async findBySpaceId(spaceId: string): Promise<Tag[]> {
    const { data, error } = await this.client
      .from('tag_definitions')
      .select(
        `
        id, 
        space_id,
        name,
        `
      )
      .eq('space_id', spaceId)

    if (error) {
      throw error;
    }

    if (!data) {
      return [];
    }

    return tagDefinitionsRowTransformTag.parse(data);
  }

  async findById(id: string): Promise<Tag | null> {
    const { data, error } = await this.client
      .from('tag_definitions')
      .select(
        `
        id, 
        space_id,
        name,
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

    return tagDefinitionsRowTransformTag.parse(data);
  }
}

