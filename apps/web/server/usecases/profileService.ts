// ヘルパー関数（テスト時にモック可能）
import { ProfileDto } from "#shared/types/dto/profileDto";

export async function fetchProfile(userId: string): Promise<ProfileDto> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
      id: userId, 
      name: "foo foo", 
      email: "example@example.com", 
      avatar: "https://example.com/avatar.png"
    } as ProfileDto;
}

