export interface UserDto {
  id: string;
  uid: string;
  name: string;
  avatar: string;
  updatedAt: Date;
}

export interface CreateUserDto {
  name: string;
  avatar: string;
}
