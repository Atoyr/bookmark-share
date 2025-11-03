import { __setAuthProviderForTests } from '../../server/auth/core/factory';
import mockProvider, { __setMockUser } from '../../server/auth/providers/mock';

export function withMockAuth(user: any | null) {
  __setMockUser(user);
  __setAuthProviderForTests(mockProvider);
  return () => {
    // 後片付け
    __setMockUser(null);
    __setAuthProviderForTests(null);
  };
}
