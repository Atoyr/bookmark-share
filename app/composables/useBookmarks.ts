import type { Bookmark } from '@/types/Bookmark';

export const useBookmarks = () => {
  const bookmarks = useState(
    'bookmarks',
    () =>
      [
        { id: '1', title: 'googole', url: 'https://www.google.com', tags: [{ id: 'a', name: 'tag1' }] },
        { id: '2', title: 'yahoo', url: 'https://www.yahoo.com', tags: [{ id: 'b', name: 'tag2' }] },
        {
          id: '3',
          title: 'msn',
          url: 'https://www.msn.com',
          tags: [
            { id: 'a', name: 'tag1' },
            { id: 'b', name: 'tag2' },
          ],
        },
      ] as Bookmark[]
  );

  console.log('useBookmarks called');
  return {
    bookmarks: readonly(bookmarks),
  };
};
