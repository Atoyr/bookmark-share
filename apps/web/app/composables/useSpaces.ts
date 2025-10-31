import type { Space } from '@/types/Space';

export const useSpaces = () => {
  const spaces = useState('spaces', () => [] as Space[]);

  async function fetchSpaces() {
    const data = await $fetch('/api/spaces');

    spaces.value = data as Space[];
    return spaces;
  }

  console.log('useSpaces called');
  return {
    spaces: readonly(spaces),
    fetchSpaces,
  };
};
