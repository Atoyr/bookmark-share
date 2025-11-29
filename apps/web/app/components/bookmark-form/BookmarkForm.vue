<script setup lang="ts">
  import { z } from 'zod';
  import { toTypedSchema } from '@vee-validate/zod';
  import { useForm } from 'vee-validate';
  import type { BookmarkModelValues } from './BookmarkFormModelValue';

  const props = defineProps<{
    modelValue: BookmarkModelValues, 
    onSubmit: (v: BookmarkModelValues) => void;
  }>();
  const emit = defineEmits<{
    (e: 'update:modelValue', value: { url: string; title: string }): void;
  }>();

  const formSchema = toTypedSchema(
    z.object({
      url: z.url(), 
      title: z.string(),
    })
  );

  const form = useForm({
    validationSchema: formSchema,
  });

  const handleSubmit = form.handleSubmit((values) => {
    emit('update:modelValue', values); // v-model 更新
    props.onSubmit(values); // 呼び出し元の関数を実行
  });
</script>

<template>
  <form @submit="handleSubmit">
    <ShadFormField
      v-slot="{ componentField }"
      name="url"
    >
      <ShadFormItem>
        <ShadFormLabel>url</ShadFormLabel>
        <ShadFormControl>
          <ShadInput
            placeholder="url"
            v-bind="componentField"
          />
        </ShadFormControl>
        <ShadFormDescription> Input url. </ShadFormDescription>
        <ShadFormMessage />
      </ShadFormItem>
    </ShadFormField>
    <ShadFormField
      v-slot="{ componentField }"
      name="title"
    >
      <ShadFormItem>
        <ShadFormLabel>title</ShadFormLabel>
        <ShadFormControl>
          <ShadInput
            placeholder="title"
            v-bind="componentField"
          />
        </ShadFormControl>
        <ShadFormDescription> Input title. </ShadFormDescription>
        <ShadFormMessage />
      </ShadFormItem>
    </ShadFormField>
    <ShadButton type="submit">
      Submit
    </ShadButton>
  </form>
</template>
