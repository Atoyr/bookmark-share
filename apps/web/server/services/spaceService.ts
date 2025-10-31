// ヘルパー関数（テスト時にモック可能）
export async function fetchSpaces() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [
    {
      id: '1',
      name: 'John Doe',
      createdAt: '2023-01-01T12:00:00Z',
      modifiedAt: '2023-01-02T12:00:00Z',
    },
    {
      id: '2',
      name: 'private2',
      createdAt: '2023-01-01T12:00:00Z',
      modifiedAt: '2023-01-02T12:00:00Z',
    },
    {
      id: '3',
      name: 'private3',
      createdAt: '2023-01-01T12:00:00Z',
      modifiedAt: '2023-01-02T12:00:00Z',
    },
  ];
}
