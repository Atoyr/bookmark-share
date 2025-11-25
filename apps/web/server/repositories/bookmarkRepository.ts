import type { ServerSupabaseClient } from '@repo/supabase/server-client';
import type { Bookmark } from '../types/bookmark';
import type { Range } from '../types/range';
import { bookmarkRowSchema, bookmarkRowTransformBookmark } from '../schemas/bookmark';

export interface BookmarkCollection {
  bookmarks: Bookmark[];
  total: number;
}

/**
 * Repository が満たすべきインターフェース
 * ここに “契約” を書く
 */
export interface BookmarkRepository {
  findAll(range?: Range): Promise<BookmarkCollection>;
  findBySpaceId(spaceId: string, range?: Range): Promise<BookmarkCollection>;
  findById(id: string): Promise<Bookmark | null>;
}

/**
 * Supabase を使った実装
 * 実運用ではこれを使う
 */
export class BookmarkRepository implements BookmarkRepository {
  constructor(private readonly client: ServerSupabaseClient) {}

  async findAll(range?: Range): Promise<BookmarkCollection> {
    let query = this.client.from('bookmarks').select('*', { count: 'exact' });
    if (range) {
      query = query.range(range.from, range.to);
    }
    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    if (!data) {
      return { bookmarks: [], total: 0 };
    }

    return { bookmarks: bookmarkRowTransformBookmark.array().parse(data), total: count ?? 0 };
  }

  async findBySpaceId(spaceId: string, range?: Range): Promise<BookmarkCollection> {
    let query = this.client.from('bookmarks').select('*', { count: 'exact' }).eq('space_id', spaceId);
    if (range) {
      query = query.range(range.from, range.to);
    }
    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    if (!data) {
      return { bookmarks: [], total: 0 };
    }

    return { bookmarks: bookmarkRowTransformBookmark.array().parse(data), total: count ?? 0 };
  }

  async findById(id: string): Promise<Bookmark | null> {
    const { data, error } = await this.client.from('bookmarks').select('*').eq('id', id).maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    return bookmarkRowTransformBookmark.parse(data);
  }
}
