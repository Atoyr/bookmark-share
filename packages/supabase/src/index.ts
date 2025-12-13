import { Database } from "./types.gen";
export type { Database } from "./types.gen";
export * from "./schemas";

// spaces
export type SpaceRow = Database["public"]["Tables"]["spaces"]["Row"];
export type SpaceInsert = Database["public"]["Tables"]["spaces"]["Insert"];
export type SpaceUpdate = Database["public"]["Tables"]["spaces"]["Update"];

// users
export type UserRow = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

// spase_users
export type SpaceUserRow = Database["public"]["Tables"]["space_users"]["Row"];
export type SpaceUserInsert =
  Database["public"]["Tables"]["space_users"]["Insert"];
export type SpaceUserUpdate =
  Database["public"]["Tables"]["space_users"]["Update"];

// bookmarks
export type BookmarkRow = Database["public"]["Tables"]["bookmarks"]["Row"];
export type BookmarkInsert =
  Database["public"]["Tables"]["bookmarks"]["Insert"];
export type BookmarkUpdate =
  Database["public"]["Tables"]["bookmarks"]["Update"];

// bookmark_tags
export type BookmarkTagRow =
  Database["public"]["Tables"]["bookmark_tags"]["Row"];
export type BookmarkTagInsert =
  Database["public"]["Tables"]["bookmark_tags"]["Insert"];
export type BookmarkTagUpdate =
  Database["public"]["Tables"]["bookmark_tags"]["Update"];

// tag_definitions
export type TagDefinitionRow =
  Database["public"]["Tables"]["tag_definitions"]["Row"];
export type TagDefinitionInsert =
  Database["public"]["Tables"]["tag_definitions"]["Insert"];
export type TagDefinitionUpdate =
  Database["public"]["Tables"]["tag_definitions"]["Update"];
