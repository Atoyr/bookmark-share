export interface UserDto {
  id: string;
  name: string;
  avatar: string | null;
  updatedAt: Date;
}

export interface CreateUserDto {
  name: string;
  avatar: string;
}
