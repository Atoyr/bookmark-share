// ヘルパー関数（テスト時にモック可能）
export async function fetchBookmarks() {
  await new Promise((resolve) => setTimeout(resolve, 100));

  console.log('Fetched bookmarks');
  return [
    {
      id: '1',
      title: 'John Doe',
      url: 'John Doe',
      createdAt: '2023-01-01T12:00:00Z',
      modifiedAt: '2023-01-02T12:00:00Z',
    },
    {
      id: '2',
      title: 'private2',
      url: 'John Doe',
      createdAt: '2023-01-01T12:00:00Z',
      modifiedAt: '2023-01-02T12:00:00Z',
    },
    {
      id: '3',
      title: 'private3',
      url: 'John Doe',
      createdAt: '2023-01-01T12:00:00Z',
      modifiedAt: '2023-01-02T12:00:00Z',
    },
  ];
}
