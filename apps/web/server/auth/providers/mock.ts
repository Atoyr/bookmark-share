import type { H3Event } from 'h3';
import type { AuthProvider, User } from '../core/types';

let currentUser: User | null = { id: 'mock', email: 'example@example.com' };
export function __setMockUser(u: User | null) {
  currentUser = u;
}

const mockProvider = {
  async getUser(_event: H3Event): Promise<User | null> {
    return currentUser;
  },
  async clearSession() {
    currentUser = null;
  },
} satisfies AuthProvider;

export default mockProvider;
