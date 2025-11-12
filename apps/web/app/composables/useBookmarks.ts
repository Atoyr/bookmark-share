import type { BookmarkDto } from '#shared/types/dto/bookmark.dto'

export const useBookmarks = () => {
  const bookmarks = useState(
    'bookmarks',
    () =>
      [
        { id: '1', title: 'googole', url: 'https://www.google.com', tags: [{ id: 'a', name: 'tag1', color: 'red' }] },
        { id: '2', title: 'yahoo', url: 'https://www.yahoo.com', tags: [{ id: 'b', name: 'tag2', color: 'blue' }] },
        {
          id: '3',
          title: 'msn',
          url: 'https://www.msn.com',
          tags: [
            { id: 'a', name: 'tag1', color: 'red' },
            { id: 'b', name: 'tag2', color: 'blue' },
          ],
        },
      ] as BookmarkDto[]
  );

  async function fetchBookmarks() {
    const data = await $fetch('/api/bookmarks');

    return bookmarks;
  }

  console.log('useBookmarks called');
  return {
    fetchBookmarks,
    bookmarks: readonly(bookmarks),
  };
};
