import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TagRepository } from '~~/server/repositories/tagRepository';
import * as helpers from '../../auth/core/helpers';

// モジュールのモック
vi.mock('../../auth/core/helpers');
vi.mock('~~/server/repositories/tagRepository');

// ハンドラーをインポート
import * as tagHandler from './[tag_id].post';

describe('/api/tags/[tag_id].post', () => {
  const handler = tagHandler.default;
  let mockEvent: any;
  let mockTagRepository: any;

  beforeEach(() => {
    // モックイベントの初期化
    mockEvent = {
      context: {
        auth: {
          userId: 'test-user-123',
        },
      },
      node: {
        req: {},
        res: {},
      },
    };

    // requireUser をモック化（認証を通過）
    vi.mocked(helpers.requireUser).mockResolvedValue(undefined);

    // TagRepository のモック
    mockTagRepository = {
      updateTag: vi.fn(),
    };
    vi.mocked(TagRepository).mockImplementation(() => mockTagRepository);

    // globalThis に直接モック関数を設定
    (globalThis as any).readBody = vi.fn();
    (globalThis as any).getRouterParam = vi.fn();
    (globalThis as any).getSupabaseServerClient = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete (globalThis as any).readBody;
    delete (globalThis as any).getRouterParam;
    delete (globalThis as any).getSupabaseServerClient;
  });

  it('正常系: タグが正常に更新される', async () => {
    // モックデータ
    const mockTag = {
      id: 'tag-123',
      name: 'Updated Tag',
      color: '#FF0000',
      updatedAt: new Date('2024-01-01T00:00:00Z'),
    };

    const requestBody = {
      name: 'Updated Tag',
      color: '#FF0000',
    };

    // モック関数の設定
    mockTagRepository.updateTag.mockResolvedValue(mockTag);

    // readBody, getRouterParam, getSupabaseServerClient の戻り値を設定
    (globalThis as any).readBody.mockResolvedValue(requestBody);
    (globalThis as any).getRouterParam.mockReturnValue('tag-123');
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    const response = await handler(mockEvent);

    expect(response).toEqual(mockTag);
    expect(mockTagRepository.updateTag).toHaveBeenCalledWith('tag-123', {
      name: 'Updated Tag',
      color: '#FF0000',
    });
  });

  it('異常系: リクエストボディが不正な場合 400 エラー', async () => {
    const invalidBody = {
      // name が欠けている
      color: '#FF0000',
    };

    (globalThis as any).readBody.mockResolvedValue(invalidBody);
    (globalThis as any).getRouterParam.mockReturnValue('tag-123');

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 400,
      statusMessage: 'リクエストボディが不正です',
    });
  });

  it('異常系: TagRepository.updateTag が失敗した場合 500 エラー', async () => {
    const requestBody = {
      name: 'Updated Tag',
      color: '#FF0000',
    };

    mockTagRepository.updateTag.mockRejectedValue(new Error('Database error'));

    (globalThis as any).readBody.mockResolvedValue(requestBody);
    (globalThis as any).getRouterParam.mockReturnValue('tag-123');
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 500,
      statusMessage: 'タグの更新に失敗しました',
    });
  });
});
