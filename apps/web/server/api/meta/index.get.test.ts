import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as metaHandler from './index.get';
import * as helpers from '../../auth/core/helpers';

vi.mock('../../auth/core/helpers');

describe('/api/meta/index.get', () => {
  const handler = metaHandler.default;
  let mockEvent: any;

  beforeEach(() => {
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

    vi.mocked(helpers.requireUser).mockResolvedValue({
      userId: 'test-user-123',
    } as any);

    (globalThis as any).getQuery = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete (globalThis as any).getQuery;
  });

  it('正常系: URL から title タグを取得する', async () => {
    (globalThis as any).getQuery.mockReturnValue({
      url: 'https://example.com',
    });

    (globalThis as any).$fetch = vi.fn().mockResolvedValue(
      '<html><head><title>Example Domain</title></head><body></body></html>'
    );

    const response = await handler(mockEvent);

    expect(response).toEqual({
      title: 'Example Domain',
      url: 'https://example.com',
    });

    delete (globalThis as any).$fetch;
  });

  it('正常系: og:title を優先的に取得する', async () => {
    (globalThis as any).getQuery.mockReturnValue({
      url: 'https://example.com',
    });

    (globalThis as any).$fetch = vi.fn().mockResolvedValue(
      '<html><head><title>Page Title</title><meta property="og:title" content="OG Title" /></head></html>'
    );

    const response = await handler(mockEvent);

    expect(response).toEqual({
      title: 'OG Title',
      url: 'https://example.com',
    });

    delete (globalThis as any).$fetch;
  });

  it('正常系: フェッチ失敗時は空のタイトルを返す', async () => {
    (globalThis as any).getQuery.mockReturnValue({
      url: 'https://example.com',
    });

    (globalThis as any).$fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const response = await handler(mockEvent);

    expect(response).toEqual({
      title: '',
      url: 'https://example.com',
    });

    delete (globalThis as any).$fetch;
  });

  it('異常系: url パラメータが不正な場合 400 エラー', async () => {
    (globalThis as any).getQuery.mockReturnValue({});

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 400,
    });
  });

  it('異常系: url が無効な形式の場合 400 エラー', async () => {
    (globalThis as any).getQuery.mockReturnValue({
      url: 'not-a-valid-url',
    });

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 400,
    });
  });
});
