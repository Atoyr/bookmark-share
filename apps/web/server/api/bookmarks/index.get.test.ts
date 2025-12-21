import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as bookmarksHandler from './index.get';
import { BookmarkRepository } from '../../repositories/bookmarkRepository';
import * as helpers from '../../auth/core/helpers';

// モジュールのモック
vi.mock('../../auth/core/helpers');
vi.mock('../../repositories/bookmarkRepository');

describe('/api/bookmarks/index.get', () => {
  const handler = bookmarksHandler.default;
  let mockEvent: any;
  let mockBookmarkRepository: any;

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
    vi.mocked(helpers.requireUser).mockResolvedValue({
      userId: 'test-user-123',
    } as any);

    // BookmarkRepository のモック
    mockBookmarkRepository = {
      findBySpaceId: vi.fn(),
      findAll: vi.fn(),
    };
    vi.mocked(BookmarkRepository).mockImplementation(() => mockBookmarkRepository);

    // globalThis に直接モック関数を設定
    (globalThis as any).getQuery = vi.fn();
    (globalThis as any).getSupabaseServerClient = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete (globalThis as any).getQuery;
    delete (globalThis as any).getSupabaseServerClient;
  });

  it('正常系: 全ブックマークを取得する (space_id なし)', async () => {
    // モックデータ
    const mockBookmarks = [
      {
        id: 'bookmark-1',
        title: 'Test Bookmark 1',
        url: 'https://example.com/1',
        tags: ['tag1', 'tag2'],
      },
      {
        id: 'bookmark-2',
        title: 'Test Bookmark 2',
        url: 'https://example.com/2',
        tags: [],
      },
    ];

    // モック関数の設定
    mockBookmarkRepository.findAll.mockResolvedValue({
      bookmarks: mockBookmarks,
      total: 2,
    });

    // getQuery, getSupabaseServerClient の戻り値を設定
    (globalThis as any).getQuery.mockReturnValue({});
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    const response = await handler(mockEvent);

    expect(response).toEqual({
      bookmarks: mockBookmarks,
      total: 2,
      page: 0,
      pageSize: 0,
    });
    expect(mockBookmarkRepository.findAll).toHaveBeenCalledWith(undefined);
  });

  it('正常系: スペース内のブックマークを取得する (space_id あり)', async () => {
    const mockBookmarks = [
      {
        id: 'bookmark-1',
        title: 'Test Bookmark 1',
        url: 'https://example.com/1',
        tags: ['tag1'],
      },
    ];

    mockBookmarkRepository.findBySpaceId.mockResolvedValue({
      bookmarks: mockBookmarks,
      total: 1,
    });

    (globalThis as any).getQuery.mockReturnValue({
      space_id: 'space-123',
    });
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    const response = await handler(mockEvent);

    expect(response).toEqual({
      bookmarks: mockBookmarks,
      total: 1,
      page: 0,
      pageSize: 0,
    });
    expect(mockBookmarkRepository.findBySpaceId).toHaveBeenCalledWith('space-123', undefined);
  });

  it('正常系: ページネーション付きで取得する', async () => {
    const mockBookmarks = [
      {
        id: 'bookmark-1',
        title: 'Test Bookmark 1',
        url: 'https://example.com/1',
        tags: [],
      },
    ];

    mockBookmarkRepository.findAll.mockResolvedValue({
      bookmarks: mockBookmarks,
      total: 10,
    });

    (globalThis as any).getQuery.mockReturnValue({
      page: '2',
      pageSize: '5',
    });
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    const response = await handler(mockEvent);

    expect(response).toEqual({
      bookmarks: mockBookmarks,
      total: 10,
      page: 2,
      pageSize: 5,
    });
  });

  it('異常系: BookmarkRepository.findAll が失敗した場合 500 エラー', async () => {
    mockBookmarkRepository.findAll.mockRejectedValue(new Error('Database error'));

    (globalThis as any).getQuery.mockReturnValue({});
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 500,
      statusMessage: 'ブックマークの取得に失敗しました',
    });
  });

  it('異常系: BookmarkRepository.findBySpaceId が失敗した場合 500 エラー', async () => {
    mockBookmarkRepository.findBySpaceId.mockRejectedValue(new Error('Database error'));

    (globalThis as any).getQuery.mockReturnValue({
      space_id: 'space-123',
    });
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 500,
      statusMessage: 'ブックマークの取得に失敗しました',
    });
  });
});
