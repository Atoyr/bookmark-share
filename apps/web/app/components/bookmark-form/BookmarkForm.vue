<script setup lang="ts">
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import type { FormContext } from 'vee-validate';
import { useForm } from 'vee-validate';
import { BookmarkFormValues } from '@/types/forms/bookmarkFormValues';
import TagInput from '@/components/tag/TagInput.vue';
import { Loader2 } from 'lucide-vue-next';

const props = defineProps<{
  form: FormContext<BookmarkFormValues>;
  defineTags: Tag[];
}>();

const emit = defineEmits<{
  (e: 'submitForm', values: BookmarkFormValues): void;
  (e: 'tag:create', value: string): Tag;
  (e: 'tag:add', value: string): void;
  (e: 'tag:remove', value: string): void;
}>();

const handleValidatedSubmit = (values: BookmarkFormValues) => {
  emit('submitForm', values);
};

const onSubmit = (e: SubmitEvent) => {
  props.form.handleSubmit(handleValidatedSubmit)(e);
};

const tags = ref<Tag[]>([]);
const fetchingTitle = ref(false);

const fetchMetaTitle = async () => {
  const url = props.form.values.url;
  const title = props.form.values.title;

  // タイトルが既に入力されている場合はスキップ
  if (title) return;

  // URL が有効かチェック
  const urlResult = z.url().safeParse(url);
  if (!urlResult.success) return;

  fetchingTitle.value = true;
  try {
    const response = await $fetch<{ title: string; url: string }>('/api/meta', {
      query: { url },
    });
    // フェッチ中にユーザーがタイトルを入力していなければ設定
    if (!props.form.values.title && response.title) {
      props.form.setFieldValue('title', response.title);
    }
  } catch {
    // メタデータ取得失敗時は何もしない（ユーザーが手動入力）
  } finally {
    fetchingTitle.value = false;
  }
};

const createTag = (name: string) => {
  const newTag = emit('tag:create', name);
  defineTags.push(newTag);
  tags.value.push(newTag);
};
</script>

<template>
  <form id="form-bookmark" @submit="onSubmit" class="flex flex-col gap-4">
    <ShadFormField v-slot="{ componentField }" name="url">
      <ShadFormItem>
        <ShadFormLabel>URL</ShadFormLabel>
        <ShadFormControl>
          <ShadInput
            placeholder="https://example.com"
            v-bind="componentField"
            @blur="fetchMetaTitle"
          />
        </ShadFormControl>
        <ShadFormMessage />
      </ShadFormItem>
    </ShadFormField>
    <ShadFormField v-slot="{ componentField }" name="title">
      <ShadFormItem>
        <ShadFormLabel>
          <span class="flex items-center gap-1">
            タイトル
            <Loader2 v-if="fetchingTitle" class="h-3 w-3 animate-spin" />
          </span>
        </ShadFormLabel>
        <ShadFormControl>
          <ShadInput
            placeholder="タイトルを入力（URLから自動取得されます）"
            v-bind="componentField"
          />
        </ShadFormControl>
        <ShadFormMessage />
      </ShadFormItem>
    </ShadFormField>
    <ShadFormField v-slot="{ componentField }" name="tags">
      <ShadFormItem>
        <ShadFormLabel>タグ</ShadFormLabel>
        <ShadFormControl>
          <TagInput v-model="tags" :define-tags="defineTags" @create="createTag" placeholder="Add tags..." />
        </ShadFormControl>
      </ShadFormItem>
    </ShadFormField>
  </form>
</template>
