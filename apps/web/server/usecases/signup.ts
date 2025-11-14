import type { User } from '../types/user';
import { UserRepository } from '../repositories/userRepository';

export function signup(userId: string, name: string, avatar: string | null): Promise<User> {
  const userRepository = UserRepository.create();
  return userRepository.newUser(userId, name, avatar);
}
