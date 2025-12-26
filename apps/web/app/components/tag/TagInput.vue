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

  // CommandInput をフォーカスしたい場合
  const commandInputEl = ref<HTMLInputElement | null>(null);

  const update = (tags: Tag[]) => {
    emit('update:modelValue', tags);
  };
  const isSelected = (id: string) => props.modelValue.some((t) => t.id === id);

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

  const selectableTags = computed(() => props.defineTags.filter((tag) => !isSelected(tag.id)));

  // 閲覧→編集へ
  const enterEdit = async () => {
    editing.value = true;
    open.value = true;
    await nextTick();
    commandInputEl.value?.focus();
  };

  // 編集終了（Popover閉じ）
  const exitEdit = () => {
    open.value = false;
    editing.value = false;
  };

  // Popover が閉じたら編集モードも解除
  watch(open, (v) => {
    if (!v) editing.value = false;
  });
</script>

<template>
  <ShadPopover v-model:open="open">
    <!-- ここ全体がトリガー（Notion のセルっぽい部分） -->
    <ShadPopoverTrigger as-child>
      <div
        role="button"
        tabindex="0"
        class="flex w-full items-center gap-1 rounded-md border px-2 py-1.5 text-left text-sm"
        :class="editing ? 'bg-background cursor-text' : 'bg-muted/30 hover:bg-muted/50'"
        @click="!editing && enterEdit()"
        @pointerdown="editing && (open = true)"
      >
        <div class="flex flex-wrap items-center gap-1">
          <!-- 編集モード -->
          <template v-if="editing">
            <span
              v-for="tag in modelValue"
              :key="tag.id"
              @pointerdown.stop
              @mousedown.stop
              @click.stop
            >
              <TagItem
                :tag="tag"
                :name="tag.name"
                :id="tag.id"
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
          </template>

          <!-- 閲覧モード -->
          <template v-else>
            <TagItem
              v-for="tag in modelValue"
              :key="tag.id"
              :tag="tag"
              :name="tag.name"
                :color="tag.color"
              :id="tag.id"
            />
            <span
              v-if="modelValue.length === 0"
              class="text-muted-foreground text-xs"
            >
              {{ placeholder ?? 'タグなし' }}
            </span>
          </template>
        </div>

        <ChevronsUpDownIcon class="ml-auto h-4 w-4 shrink-0 opacity-60" />
      </div>
    </ShadPopoverTrigger>

    <ShadPopoverContent
      class="w-[260px] p-0"
      @escape-key-down="exitEdit"
    >
      <ShadCommand>
        <ShadCommandInput
          ref="commandInputEl"
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
