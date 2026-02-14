<script setup lang="ts">
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import type { FormContext } from 'vee-validate';
import { useForm } from 'vee-validate';
import { BookmarkFormValues } from '@/types/forms/bookmarkFormValues';
import TagInput from '@/components/tag/TagInput.vue';

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
        <ShadFormLabel>url</ShadFormLabel>
        <ShadFormControl>
          <ShadInput placeholder="url" v-bind="componentField" />
        </ShadFormControl>
        <ShadFormMessage />
      </ShadFormItem>
    </ShadFormField>
    <ShadFormField v-slot="{ componentField }" name="title">
      <ShadFormItem>
        <ShadFormLabel>title</ShadFormLabel>
        <ShadFormControl>
          <ShadInput placeholder="title" v-bind="componentField" />
        </ShadFormControl>
        <ShadFormMessage />
      </ShadFormItem>
    </ShadFormField>
    <ShadFormField v-slot="{ componentField }" name="tags">
      <ShadFormItem>
        <ShadFormLabel>tags</ShadFormLabel>
        <ShadFormControl>
          <TagInput v-model="tags" :define-tags="defineTags" @create="createTag" placeholder="Add tags..." />
        </ShadFormControl>
      </ShadFormItem>
    </ShadFormField>
  </form>
</template>
