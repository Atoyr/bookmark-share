import { SpaceRepository } from '../repositories/spaceRepository';
// ヘルパー関数（テスト時にモック可能）
export async function getSpaces() {
  const repository = SpaceRepository.create();
  return repository.findAll();
}
