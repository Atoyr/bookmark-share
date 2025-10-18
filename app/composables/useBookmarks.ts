import type { bookmark } from '~/types/bookmark';

export const useBookmarks = () => {
  const bookmarks = useState(
    'bookmarks',
    () =>
      [
        { id: '1', title: 'googole', url: 'https://www.google.com' },
        { id: '2', title: 'yahoo', url: 'https://www.yahoo.com' },
        { id: '3', title: 'msn', url: 'https://www.msn.com' },
      ] as bookmark[]
  );

  console.log('useBookmarks called');
  return {
    bookmarks: readonly(bookmarks),
  };
};
