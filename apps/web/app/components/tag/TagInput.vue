<script setup lang="ts">
  import { ref, computed, nextTick, watch, onMounted, defineComponent } from 'vue';
  import TagItem from './TagItem.vue';
  import type { Tag } from '@/types/tag';
  import { ChevronsUpDownIcon, CheckIcon, PlusIcon } from 'lucide-vue-next';
  import { useCommand } from '@/components/ui/command';
  import { useTags } from '@/composables/useTags';

  // props
  const props = defineProps<{
    modelValue: Tag[];
    defineTags: Tag[];
    placeholder?: string;
  }>();

  // emits
  const emit = defineEmits<{
    (e: 'update:modelValue', value: Tag[]): void;
    (e: 'create', value: string): void;
  }>();

  const open = ref(false);
  const editing = ref(false);

  // 検索文字列を管理
  const query = ref('');

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

  // 検索で絞り込み（表示用）
  const filteredTags = computed(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return selectableTags.value;
    return selectableTags.value.filter((t) => t.name.toLowerCase().includes(q));
  });

  // 同名のタグが既にあるか（defineTags全体で判定）
  const existsSameName = computed(() => {
    const q = query.value.trim();
    if (!q) return true;
    return props.defineTags.some((t) => t.name === q);
  });

  // 作成候補を出す条件
  const canCreate = computed(() => {
    const q = query.value.trim();
    return q.length > 0 && !existsSameName.value;
  });

  // TODO: tagVariantsから取得する
  // 利用可能な9色（tagVariants.tsで定義されている色）
  const AVAILABLE_COLORS = ['gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red'] as const;

  // ランダムに色を選択する関数
  const getRandomColor = (): string => {
    const randomIndex = Math.floor(Math.random() * AVAILABLE_COLORS.length);
    return AVAILABLE_COLORS[randomIndex];
  };

  const requestCreate = () => {
    const name = query.value.trim();
    if (!name) return;
    emit('create', name); // ★作成依頼だけ
    // UX: 依頼後はいったん閉じる/クリア（好みで）
    query.value = '';
    open.value = false;
    editing.value = false;
  };

  // 「新しいタグを作成」オプションを表示すべきか判定
  const shouldShowCreateOption = computed(() => {
    // 検索文字列が空なら表示しない
    if (!query.value.trim()) return false;

    // 既存のタグに完全一致するものがあれば表示しない
    const searchLower = query.value.toLowerCase();
    const hasExactMatch = props.defineTags.some((tag) => tag.name.toLowerCase() === searchLower);

    return !hasExactMatch;
  });

  // 閲覧→編集へ
  const enterEdit = async () => {
    editing.value = true;
    open.value = true;
    await nextTick();
    // CommandInputコンポーネント内のinput要素を取得してフォーカス
    const inputElement = commandInputEl.value?.$el?.querySelector('input');
    if (inputElement && typeof inputElement.focus === 'function') {
      inputElement.focus();
    }
  };

  // 編集終了（Popover閉じ）
  const exitEdit = () => {
    open.value = false;
    editing.value = false;
    query.value = ''; // 検索値をリセット
  };

  // Popover が閉じたら編集モードも解除
  watch(open, (v) => {
    if (!v) editing.value = false;
  });

  // Command内で動作するヘルパーコンポーネント
  const QueryValueSync = defineComponent({
    emits: ['update'],
    setup(_, { emit }) {
      const { filterState } = useCommand();
      watch(
        () => filterState.search,
        (newValue) => {
          emit('update', newValue);
        },
        { immediate: true }
      );
      return () => null; // 何もレンダリングしない
    },
  });

  // 新しいタグを作成する関数
  const createNewTag = async () => {
    // 検索文字列が空の場合は何もしない
    const tagName = query.value.trim();
    if (!tagName) {
      return;
    }
    emit('create', tagName); // 作成依頼だけ

    // 検索値をリセット
    query.value = '';

    // Popoverを閉じる
    open.value = false;
  };
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
        <!-- filterStateを監視してqueryValueを更新するヘルパー -->
        <QueryValueSync @update="(val: string) => (query = val)" />

        <ShadCommandInput
          ref="commandInputEl"
          class="h-9"
          placeholder="タグを検索…"
        />

        <!-- 新しいタグを作成するオプション（CommandListの外に配置してフィルタリングを回避） -->
        <div
          v-if="shouldShowCreateOption && !isCreating"
          class="border-b"
        >
          <div
            role="option"
            class="hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            @click="createNewTag"
          >
            <PlusIcon class="mr-2 h-4 w-4" />
            <span class="text-sm"> 「{{ query }}」を作成 </span>
          </div>
        </div>

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
