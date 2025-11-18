export interface User {
  id: string;
  name: string;
  avatar: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
