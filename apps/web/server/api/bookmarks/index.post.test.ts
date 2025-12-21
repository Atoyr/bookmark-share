import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BookmarkRepository } from '../../repositories/bookmarkRepository';
import * as helpers from '../../auth/core/helpers';

// モジュールのモック
vi.mock('../../auth/core/helpers');
vi.mock('../../repositories/bookmarkRepository');

// ハンドラーをインポート
import * as bookmarksHandler from './index.post';

describe('/api/bookmarks/index.post', () => {
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
    vi.mocked(helpers.requireUser).mockResolvedValue(undefined);

    // BookmarkRepository のモック
    mockBookmarkRepository = {
      newBookmark: vi.fn(),
    };
    vi.mocked(BookmarkRepository).mockImplementation(() => mockBookmarkRepository);

    // globalThis に直接モック関数を設定
    (globalThis as any).readBody = vi.fn();
    (globalThis as any).getSupabaseServerClient = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete (globalThis as any).readBody;
    delete (globalThis as any).getSupabaseServerClient;
  });

  it('正常系: ブックマークが正常に作成される', async () => {
    // モックデータ
    const mockBookmark = {
      id: 'bookmark-123',
      title: 'Test Bookmark',
      url: 'https://example.com',
      tags: [],
      createdAt: new Date('2024-01-01T00:00:00Z'),
      updatedAt: new Date('2024-01-01T00:00:00Z'),
    };

    const requestBody = {
      space_id: 'space-123',
      title: 'Test Bookmark',
      url: 'https://example.com',
    };

    // モック関数の設定
    mockBookmarkRepository.newBookmark.mockResolvedValue(mockBookmark);

    // readBody, getSupabaseServerClient の戻り値を設定
    (globalThis as any).readBody.mockResolvedValue(requestBody);
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    const response = await handler(mockEvent);

    expect(response).toEqual({
      id: 'bookmark-123',
      title: 'Test Bookmark',
      url: 'https://example.com',
      tags: [],
      created_at: new Date('2024-01-01T00:00:00Z'),
      updated_at: new Date('2024-01-01T00:00:00Z'),
    });
    expect(mockBookmarkRepository.newBookmark).toHaveBeenCalledWith({
      spaceId: 'space-123',
      title: 'Test Bookmark',
      url: 'https://example.com',
      tags: [],
    });
  });

  it('異常系: リクエストボディが不正な場合 400 エラー (title が欠けている)', async () => {
    const invalidBody = {
      space_id: 'space-123',
      // title が欠けている
      url: 'https://example.com',
    };

    (globalThis as any).readBody.mockResolvedValue(invalidBody);

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 400,
      statusMessage: 'リクエストボディが不正です',
    });
  });

  it('異常系: リクエストボディが不正な場合 400 エラー (url が欠けている)', async () => {
    const invalidBody = {
      space_id: 'space-123',
      title: 'Test Bookmark',
      // url が欠けている
    };

    (globalThis as any).readBody.mockResolvedValue(invalidBody);

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 400,
      statusMessage: 'リクエストボディが不正です',
    });
  });

  it('異常系: BookmarkRepository.newBookmark が失敗した場合エラーをスロー', async () => {
    const requestBody = {
      space_id: 'space-123',
      title: 'Test Bookmark',
      url: 'https://example.com',
    };

    mockBookmarkRepository.newBookmark.mockRejectedValue(new Error('Database error'));

    (globalThis as any).readBody.mockResolvedValue(requestBody);
    (globalThis as any).getSupabaseServerClient.mockResolvedValue({} as any);

    await expect(handler(mockEvent)).rejects.toThrowError('Database error');
  });
});
