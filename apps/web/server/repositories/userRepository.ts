import type { ServerSupabaseClient } from '@repo/supabase/server-client';
import type { User } from '../types/user';
import { z } from 'zod';
import { userRowWithDatetimeTransformUser } from '../schemas/user';

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
 * Supabase を使った実装
 * 実運用ではこれを使う
 */
export class UserRepository implements UserRepository {
  constructor(private readonly client: ServerSupabaseClient) {}

  async findById(id: string): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    return userRowWithDatetimeTransformUser.parse(data);
  }

  async findByIds(Ids: string[]): Promise<User[]> {
    const { data, error } = await this.client.from('users').select('*').in('id', Ids).is('deleted_at', null);

    if (error) {
      throw error;
    }

    return z.array(userRowWithDatetimeTransformUser).parse(data);
  }

  async newUser(name: string, avatar: string | null = null): Promise<User> {
    const { data, error } = await this.client
      .from('users')
      .insert({
        name: name,
        avatar: avatar,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return userRowWithDatetimeTransformUser.parse(data);
  }
}
