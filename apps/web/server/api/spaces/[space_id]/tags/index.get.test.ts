import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as tagsHandler from './index.get';
import { TagRepository } from '~~/server/repositories/tagRepository';
import * as helpers from '../../../../auth/core/helpers';

// モジュールのモック
vi.mock('../../../../auth/core/helpers');
vi.mock('~~/server/repositories/tagRepository');

describe('/api/spaces/[space_id]/tags/index.get', () => {
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
      findBySpaceId: vi.fn(),
    };
    vi.mocked(TagRepository).mockImplementation(() => mockTagRepository);

    // globalThis に直接モック関数を設定
    (globalThis as any).getRouterParam = vi.fn();
    (globalThis as any).getSupabaseServerClient = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete (globalThis as any).getRouterParam;
    delete (globalThis as any).getSupabaseServerClient;
  });

  it('正常系: タグ一覧が取得できる', async () => {
    // モックデータ
    const mockTags = [
      {
        id: 'tag-1',
        name: 'Tag 1',
        color: '#FF0000',
        updatedAt: new Date('2024-01-01T00:00:00Z'),
      },
      {
        id: 'tag-2',
        name: 'Tag 2',
        color: '#00FF00',
        updatedAt: new Date('2024-01-02T00:00:00Z'),
      },
    ];

    // モック関数の設定
    mockTagRepository.findBySpaceId.mockResolvedValue(mockTags);

    // getRouterParam, getSupabaseServerClient の戻り値を設定
    (globalThis as any).getRouterParam.mockReturnValue('space-123');
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    const response = await handler(mockEvent);

    expect(response).toEqual({
      space_id: 'space-123',
      tags: [
        {
          id: 'tag-1',
          name: 'Tag 1',
          color: '#FF0000',
          updated_at: '2024-01-01T00:00:00.000Z',
        },
        {
          id: 'tag-2',
          name: 'Tag 2',
          color: '#00FF00',
          updated_at: '2024-01-02T00:00:00.000Z',
        },
      ],
    });
    expect(mockTagRepository.findBySpaceId).toHaveBeenCalledWith('space-123');
  });

  it('正常系: タグが存在しない場合、空配列を返す', async () => {
    mockTagRepository.findBySpaceId.mockResolvedValue([]);

    (globalThis as any).getRouterParam.mockReturnValue('space-123');
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    const response = await handler(mockEvent);

    expect(response).toEqual({
      space_id: 'space-123',
      tags: [],
    });
  });

  it('正常系: タグが null の場合、空配列を返す', async () => {
    mockTagRepository.findBySpaceId.mockResolvedValue(null as any);

    (globalThis as any).getRouterParam.mockReturnValue('space-123');
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    const response = await handler(mockEvent);

    expect(response).toEqual({
      space_id: 'space-123',
      tags: [],
    });
  });

  it('異常系: TagRepository.findBySpaceId が失敗した場合 500 エラー', async () => {
    mockTagRepository.findBySpaceId.mockRejectedValue(new Error('Database error'));

    (globalThis as any).getRouterParam.mockReturnValue('space-123');
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 500,
      statusMessage: 'タグの取得に失敗しました',
    });
  });
});
