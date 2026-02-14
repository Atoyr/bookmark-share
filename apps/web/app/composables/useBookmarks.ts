import type { GetBookmarksResponseDto } from '#shared/types/dto/bookmarks.dto';
import type { Bookmark } from '~/types/bookmark';

export interface UseBookmarksOptions {
  spaceId?: Ref<string>;
  page?: Ref<number>;
  pageSize?: Ref<number>;
}

export const useBookmarks = (options: UseBookmarksOptions = {}) => {
  const { page, pageSize, spaceId } = options;
  if ((page !== undefined) !== (pageSize !== undefined)) {
    throw new Error('Both page and pageSize must be provided together.');
  }
  const { data, status, error, refresh } = useFetch<GetBookmarksResponseDto>('/api/bookmarks', {
    watch: false,
    query: {
      space_id: spaceId?.value ?? undefined,
      page: page?.value ?? undefined,
      pageSize: pageSize?.value ?? undefined,
    },
  });

  const bookmarks = computed(() => {
    if (data?.value == null) {
      return [];
    }

    return data.value.bookmarks.map((bookmark) => ({
      id: bookmark.id,
      title: bookmark.title,
      url: bookmark.url,
      tags: [],
    })) as Bookmark[];
  });

  const pending = computed<Boolean>(() => fetchIsPending(status.value));
  const total = computed<number>(() => {
    if (data?.value == null) {
      return 0;
    }
    return data.value.total;
  });

  return {
    bookmarks: readonly(bookmarks),
    total: readonly(total),
    pending: readonly(pending),
    error: readonly(error),

    refresh,
  };
};
