import type { ServerSupabaseClient } from '@repo/supabase/server-client';
import type { User } from '../types/user';
import { z } from 'zod';

/**
 * Repository が満たすべきインターフェース
 * ここに “契約” を書く
 */
export interface UserRepository {
  findByUid(uid: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByUids(uids: string[]): Promise<User[]>;
  newUser(name: string, avatar: string | null): Promise<User>;
}

/**
 * UserRowをUserに変換するzodスキーマ
 */
export const userSchema = z
  .object({
    id: z.uuid(),
    uid: z.uuid(),
    name: z.string(),
    avatar: z.string().nullable().optional(),
    created_at: z.string().transform((str) => new Date(str)),
    updated_at: z.string().transform((str) => new Date(str)),
  })
  .transform(
    (row): User => ({
      id: row.id,
      uid: row.uid,
      name: row.name,
      avatar: row.avatar ?? null,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })
  );

/**
 * Supabase を使った実装
 * 実運用ではこれを使う
 */
export class UserRepository implements UserRepository {
  constructor(private readonly client: ServerSupabaseClient) {}

  async findByUid(uid: string): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('uid', uid)
      .is('deleted_at', null)
      .maybeSingle();

    if (error) {
      throw error;
    }

    console.log('findByUid data:', data);

    if (!data) {
      return null;
    }

    return userSchema.parse(data);
  }

  async findById(id: string): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('id', id)
      .not('deleted_at', 'is', null)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }

    if (!data) {
      return null;
    }

    return userSchema.parse(data);
  }

  async findByUids(uids: string[]): Promise<User[]> {
    const { data, error } = await this.client.from('users').select('*').in('uid', uids).not('deleted_at', 'is', null);

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }

    return z.array(userSchema).parse(data);
  }

  async newUser(name: string, avatar: string | null = null): Promise<User> {
    const { data, error } = await this.client.from('users').insert({
      name: name,
      avater: avatar,
    });

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return userSchema.parse(data);
  }
}
