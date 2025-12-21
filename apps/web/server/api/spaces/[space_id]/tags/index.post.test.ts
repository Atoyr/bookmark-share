import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as tagsHandler from './index.post';
import { TagRepository } from '~~/server/repositories/tagRepository';
import * as helpers from '../../../../auth/core/helpers';

// モジュールのモック
vi.mock('../../../../auth/core/helpers');
vi.mock('~~/server/repositories/tagRepository');

describe('/api/spaces/[space_id]/tags/index.post', () => {
  const handler = tagsHandler.default;
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
      newTagDefinitions: vi.fn(),
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

  it('正常系: タグが正常に作成される', async () => {
    // モックデータ
    const mockTags = [
      {
        id: 'tag-1',
        name: 'Tag 1',
        color: '',
        updatedAt: new Date('2024-01-01T00:00:00Z'),
      },
      {
        id: 'tag-2',
        name: 'Tag 2',
        color: '',
        updatedAt: new Date('2024-01-02T00:00:00Z'),
      },
    ];

    const requestBody = {
      tags: [
        { name: 'Tag 1' },
        { name: 'Tag 2' },
      ],
    };

    // モック関数の設定
    mockTagRepository.newTagDefinitions.mockResolvedValue(mockTags);

    // readBody, getRouterParam, getSupabaseServerClient の戻り値を設定
    (globalThis as any).readBody.mockResolvedValue(requestBody);
    (globalThis as any).getRouterParam.mockReturnValue('space-123');
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    const response = await handler(mockEvent);

    expect(response).toEqual({
      space_id: 'space-123',
      tags: mockTags,
    });
    expect(mockTagRepository.newTagDefinitions).toHaveBeenCalledWith(
      [
        { name: 'Tag 1', color: '' },
        { name: 'Tag 2', color: '' },
      ],
      'space-123'
    );
  });

  it('正常系: タグが空の場合、空配列を返す', async () => {
    const requestBody = {
      tags: [],
    };

    mockTagRepository.newTagDefinitions.mockResolvedValue([]);

    (globalThis as any).readBody.mockResolvedValue(requestBody);
    (globalThis as any).getRouterParam.mockReturnValue('space-123');
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    const response = await handler(mockEvent);

    expect(response).toEqual({
      space_id: 'space-123',
      tags: [],
    });
  });

  it('異常系: リクエストボディが不正な場合 400 エラー', async () => {
    const invalidBody = {
      // tags が欠けている
    };

    (globalThis as any).readBody.mockResolvedValue(invalidBody);
    (globalThis as any).getRouterParam.mockReturnValue('space-123');

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 400,
      statusMessage: 'リクエストボディが不正です',
    });
  });

  it('異常系: TagRepository.newTagDefinitions が失敗した場合 500 エラー', async () => {
    const requestBody = {
      tags: [{ name: 'Tag 1' }],
    };

    mockTagRepository.newTagDefinitions.mockRejectedValue(new Error('Database error'));

    (globalThis as any).readBody.mockResolvedValue(requestBody);
    (globalThis as any).getRouterParam.mockReturnValue('space-123');
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 500,
      statusMessage: 'タグの取得に失敗しました',
    });
  });
});
