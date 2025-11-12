import type { SpaceDto } from '#shared/types/dto/space.dto';

export const useSpaces = () => {
  const spaces = useState('spaces', () => [] as SpaceDto[]);

  async function fetchSpaces() {
    const data = await $fetch('/api/spaces');

    spaces.value = data as SpaceDto[];
    return spaces;
  }

  return {
    spaces: readonly(spaces),
    fetchSpaces,
  };
};
