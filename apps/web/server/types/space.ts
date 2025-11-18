import type { User } from './user';
export interface Space {
  id: string;
  name: string;
  ownerId: string;
  image: string | null;
  members: User[];
  createdAt?: Date;
  updatedAt?: Date;
}
