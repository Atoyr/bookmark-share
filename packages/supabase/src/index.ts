import { Database } from "./types.gen";
export type { Database } from "./types.gen";

// spaces
export type SpaceRow = Database["public"]["Tables"]["spaces"]["Row"];
export type SpaceInsert = Database["public"]["Tables"]["spaces"]["Insert"];
export type SpaceUpdate = Database["public"]["Tables"]["spaces"]["Update"];

// users
export type UserRow = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
