import type { ServerSupabaseClient } from '@repo/supabase/server-client';
import { tagDefinitionsRowSchema } from '@repo/supabase';
import type { Tag, CreateOrUpdateTag } from '../types/tag';

/**
 * Repository が満たすべきインターフェース
 * ここに “契約” を書く
 */
export interface TagRepository {
  findBySpaceId(spaceId: string): Promise<Tag[]>;
  findById(id: string): Promise<Tag | null>;
  newTagDefinition(tag: CreateOrUpdateTag, spaceId: string): Promise<Tag>;
  newTagDefinitions(tags: CreateOrUpdateTag[], spaceId: string): Promise<Tag[]>;
  updateTag(id: string, tag: CreateOrUpdateTag): Promise<Tag>;
}

export const tagDefinitionsRowTransformTag = tagDefinitionsRowSchema.transform(
  (row): Tag => ({
    id: row.id,
    name: row.name,
    color: '',
    updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
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
        updated_at
        `
      )
      .eq('space_id', spaceId);

    if (error) {
      throw error;
    }

    if (!data) {
      return [];
    }

    return tagDefinitionsRowTransformTag.array().parse(data);
  }

  async findById(id: string): Promise<Tag | null> {
    const { data, error } = await this.client
      .from('tag_definitions')
      .select(
        `
        id, 
        space_id,
        name,
        updated_at
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

  async newTagDefinition(tag: CreateOrUpdateTag, spaceId: string): Promise<Tag> {
    const { data, error } = await this.client
      .from('tag_definitions')
      .insert({
        name: tag.name,
        space_id: spaceId,
        color: tag.color,
      })
      .select(
        `
        id, 
        space_id,
        name,
        updated_at
        `
      )
      .single();

    if (error) {
      throw error;
    }

    return tagDefinitionsRowTransformTag.parse(data);
  }

  async newTagDefinitions(tags: CreateOrUpdateTag[], spaceId: string): Promise<Tag[]> {
    const insertData = tags.map(tag => ({
      name: tag.name,
      space_id: spaceId,
      color: tag.color,
    }));

    const { data, error } = await this.client
      .from('tag_definitions')
      .insert(insertData)
      .select(
        `
        id,
        space_id,
        name,
        color,
        created_at, 
        updated_at
        `
      );

    if (error) {
      throw error;
    }

    if (!data) {
      return [];
    }

    return tagDefinitionsRowTransformTag.array().parse(data);
  }

  async updateTag(id: string, tag: CreateOrUpdateTag): Promise<Tag> {
    const updateData: { name: string; color?: string } = {
      name: tag.name,
    };

    // colorが指定されている場合のみ更新対象に含める
    if (tag.color !== undefined && tag.color !== '') {
      updateData.color = tag.color;
    }

    const { data, error } = await this.client
      .from('tag_definitions')
      .update(updateData)
      .eq('id', id)
      .select(
        `
        id,
        space_id,
        name,
        updated_at
        `
      )
      .single();

    if (error) {
      throw error;
    }

    return tagDefinitionsRowTransformTag.parse(data);
  }
}
