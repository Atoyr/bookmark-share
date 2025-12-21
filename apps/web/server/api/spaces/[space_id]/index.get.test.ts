import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as spaceHandler from './index.get';
import { SpaceRepository } from '../../../repositories/spaceRepository';
import * as helpers from '../../../auth/core/helpers';

// モジュールのモック
vi.mock('../../../auth/core/helpers');
vi.mock('../../../repositories/spaceRepository');

describe('/api/spaces/[space_id]/index.get', () => {
  const handler = spaceHandler.default;
  let mockEvent: any;
  let mockSpaceRepository: any;

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

    // SpaceRepository のモック
    mockSpaceRepository = {
      findById: vi.fn(),
    };
    vi.mocked(SpaceRepository).mockImplementation(() => mockSpaceRepository);

    // globalThis に直接モック関数を設定
    (globalThis as any).getRouterParam = vi.fn();
    (globalThis as any).getSupabaseServerClient = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete (globalThis as any).getRouterParam;
    delete (globalThis as any).getSupabaseServerClient;
  });

  it('正常系: スペース情報が正常に取得される', async () => {
    // モックデータ
    const mockSpace = {
      id: 'space-123',
      name: 'Test Space',
      ownerId: 'owner-123',
      image: 'https://example.com/image.png',
      members: [
        {
          id: 'user-1',
          name: 'User 1',
          avatar: 'https://example.com/avatar1.png',
        },
        {
          id: 'user-2',
          name: 'User 2',
          avatar: 'https://example.com/avatar2.png',
        },
      ],
      updatedAt: new Date('2024-01-01T00:00:00Z'),
    };

    // モック関数の設定
    mockSpaceRepository.findById.mockResolvedValue(mockSpace);

    // getRouterParam, getSupabaseServerClient の戻り値を設定
    (globalThis as any).getRouterParam.mockReturnValue('space-123');
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    const response = await handler(mockEvent);

    expect(response).toEqual({
      space: {
        id: 'space-123',
        name: 'Test Space',
        owner: 'owner-123',
        image: 'https://example.com/image.png',
        users: [
          {
            id: 'user-1',
            name: 'User 1',
            avatar: 'https://example.com/avatar1.png',
          },
          {
            id: 'user-2',
            name: 'User 2',
            avatar: 'https://example.com/avatar2.png',
          },
        ],
        updated_at: '2024-01-01T00:00:00.000Z',
      },
    });
    expect(mockSpaceRepository.findById).toHaveBeenCalledWith('space-123');
  });

  it('異常系: スペースが存在しない場合 404 エラー', async () => {
    mockSpaceRepository.findById.mockResolvedValue(null);

    (globalThis as any).getRouterParam.mockReturnValue('space-123');
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 404,
      statusMessage: 'スペースが存在しません',
    });
  });

  it('異常系: SpaceRepository.findById が失敗した場合 500 エラー', async () => {
    mockSpaceRepository.findById.mockRejectedValue(new Error('Database error'));

    (globalThis as any).getRouterParam.mockReturnValue('space-123');
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 500,
      statusMessage: 'スペースの取得に失敗しました',
    });
  });
});
