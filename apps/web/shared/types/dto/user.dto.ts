export interface UserDto {
  id: string;
  name: string;
  avatar: string | null;
}

export interface CreateUserDto {
  name: string;
  avatar: string;
}
