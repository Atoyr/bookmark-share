<script setup lang="ts">
  import { ref } from 'vue';
  import TagItem from './TagItem.vue';
  import type { Tag } from '@/types/tag';
  import { ChevronsUpDownIcon, CheckIcon } from 'lucide-vue-next';

  // props
  const props = defineProps<{
    modelValue: Tag[];
    defineTags: Tag[];
    placeholder?: string;
  }>();

  // emits
  const emit = defineEmits<{
    (e: 'update:modelValue', value: Tag[]): void;
  }>();

  const open = ref(false);

  const update = (tags: Tag[]) => {
    emit('update:modelValue', tags);
  };

  const isSelected = (id: string) => props.modelValue.some((t) => t.id === id);

  const selectableTags = computed(() => props.defineTags.filter((tag) => !isSelected(tag.id)));

  const toggleTag = (tag: Tag) => {
    if (isSelected(tag.id)) {
      update(props.modelValue.filter((t) => t.id !== tag.id));
    } else {
      update([...props.modelValue, tag]);
    }
  };

  const removeTag = (id: string) => {
    update(props.modelValue.filter((t) => t.id !== id));
  };
</script>

<template>
  <ShadPopover v-model:open="open">
    <!-- ここ全体がトリガー（Notion のセルっぽい部分） -->
    <ShadPopoverTrigger as-child>
      <div
        class="focus-visible:ring-ring flex min-h-9 w-full cursor-text flex-wrap items-center gap-1 rounded-md border px-2 py-1 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        tabindex="0"
      >
        <span
          v-for="tag in modelValue"
          :key="tag.id"
          @pointerdown.stop
          @mousedown.stop
          @click.stop
        >
          <TagItem
            :id="tag.id"
            :name="tag.name"
            :color="tag.color"
            removable
            @remove="removeTag"
          />
        </span>

        <span
          v-if="modelValue.length === 0"
          class="text-muted-foreground text-xs"
        >
          {{ placeholder ?? 'タグを選択または検索…' }}
        </span>

        <ChevronsUpDownIcon class="ml-auto h-4 w-4 shrink-0 opacity-50" />
      </div>
    </ShadPopoverTrigger>

    <ShadPopoverContent class="w-[260px] p-0">
      <ShadCommand>
        <ShadCommandInput
          class="h-9"
          placeholder="タグを検索…"
        />

        <ShadCommandList>
          <ShadCommandEmpty>該当するタグがありません</ShadCommandEmpty>

          <ShadCommandGroup>
            <ShadCommandItem
              v-for="tag in selectableTags"
              :key="tag.id"
              :value="tag.name"
              @select="() => toggleTag(tag)"
            >
              <CheckIcon :class="['mr-2 h-4 w-4', isSelected(tag.id) ? 'opacity-100' : 'opacity-0']" />
              <TagItem
                :key="tag.id"
                :id="tag.id"
                :name="tag.name"
                :color="tag.color"
              />
            </ShadCommandItem>
          </ShadCommandGroup>
        </ShadCommandList>
      </ShadCommand>
    </ShadPopoverContent>
  </ShadPopover>
</template>
