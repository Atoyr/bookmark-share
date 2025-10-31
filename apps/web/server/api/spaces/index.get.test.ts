import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as spacesHandler from './index.get';
import * as spaceService from '../../services/spaceService';

describe('/api/spaces/index.get', () => {
  const handler = spacesHandler.default;
  let mockEvent: any;

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
  });

  it('正常系: スペース一覧を返す', async () => {
    // fetchSpaces をモック
    const mockSpaces = [
      { id: '1', name: 'test-space', createdAt: '2024-01-01T00:00:00Z', modifiedAt: '2024-01-02T00:00:00Z' },
    ];

    const spy = vi.spyOn(spaceService, 'fetchSpaces').mockResolvedValue(mockSpaces);

    const response = await handler(mockEvent);

    expect(response).toEqual(mockSpaces);
    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });

  it('異常系: fetchSpaces が null を返した場合 404 エラー', async () => {
    const spy = vi.spyOn(spaceService, 'fetchSpaces').mockResolvedValue([]);

    await expect(handler(mockEvent)).rejects.toMatchObject({
      statusCode: 404,
      statusMessage: 'Spaces not found',
    });

    spy.mockRestore();
  });

  it('異常系: fetchSpaces が例外を投げた場合 エラーをスロー', async () => {
    const spy = vi.spyOn(spaceService, 'fetchSpaces').mockRejectedValue(new Error('Network error'));

    await expect(handler(mockEvent)).rejects.toThrowError('Network error');

    spy.mockRestore();
  });
});
