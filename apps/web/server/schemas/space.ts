import { z } from 'zod';
import type { Space } from '../types/space';
import type { User } from '../types/user';
import { userRowSchema } from './user';
import { createdAndUpdatedSchema } from './datetime';

/**
 * spaces テーブルの行のzodスキーマ定義
 */
export const spaceRowSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  image: z.string().nullable().optional(),
  owner_id: z.uuid(),
});

/**
 * spaces テーブルの行のzodスキーマ定義
 * createdAt, updatedAtを含む
 */
export const spaceRowWithDatetimeSchema = spaceRowSchema.extend(createdAndUpdatedSchema.shape);

/**
 * space_users テーブルの行のzodスキーマ定義
 */
export const spaceUserRowSchema = z.object({
  id: z.uuid(),
  uid: z.uuid(),
  space_id: z.uuid(),
});

/**
 * spaces テーブルとspace_usersテーブルを結合したときの行のzodスキーマ定義
 */
export const spaceJoinSpaceUsersRowSchema = spaceRowSchema.extend({
  space_users: z.array(spaceUserRowSchema),
});

/**
 * spaces テーブルとspace_usersテーブルとuserを結合したときの行のzodスキーマ定義
 */
export const spaceJoinSpaceUsersJoinUserRowSchema = spaceRowSchema.extend({
  space_users: z.array(
    spaceUserRowSchema.extend({
      users: z.array(userRowSchema),
    })
  ),
});

/**
 * space_users テーブルとusersテーブルを結合したzodスキーマ
 */
export const spaceUserJoinUserRowSchema = z.object({
  id: z.uuid(),
  uid: z.uuid(),
  space_id: z.uuid(),
  user: userRowSchema,
});

/**
 * space_users テーブルとspacesテーブルを結合したzodスキーマ
 */
export const spaceUserJoinSpaceRowSchema = z.object({
  id: z.uuid(),
  uid: z.uuid(),
  space_id: z.uuid(),
  spaces: z.array(spaceRowSchema),
});

/**
 * spaceRowをspaceに変換するzodスキーマ
 */
export const spaceRowTransformSpace = spaceRowSchema.transform(
  (row): Space => ({
    id: row.id,
    name: row.name,
    ownerId: row.owner_id,
    image: row.image ?? null,
    members: [],
  })
);

/**
 * spaceRowをspaceに変換するzodスキーマ
 * createdAt, updatedAtを含む
 */
export const spaceRowWithDatetimeTransformSpace = spaceRowWithDatetimeSchema.transform(
  (row): Space => ({
    id: row.id,
    name: row.name,
    ownerId: row.owner_id,
    image: row.image ?? null,
    members: [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  })
);

/**
 * spacesとusersを結合したテーブルをspaceに変換するzodスキーマ
 */
export const spaceRowWithUserTransformSpace = spaceJoinSpaceUsersJoinUserRowSchema.transform(
  (row): Space => ({
    id: row.id, 
    name: row.name,
    ownerId: row.owner_id,
    image: row.image ?? null,
    members: row.space_users.map(
      (spaceUser): User => ({
          id: spaceUser.users[0].id,
          name: spaceUser.users[0].name,
          avatar: spaceUser.users[0].avatar ?? null,
      })
    ),
  })
);
