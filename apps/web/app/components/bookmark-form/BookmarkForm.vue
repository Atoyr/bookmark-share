<script setup lang="ts">
  import { z } from 'zod';
  import { toTypedSchema } from '@vee-validate/zod';
  import { useForm } from 'vee-validate';
  import type { BookmarkModelValues } from './BookmarkFormModelValue';

  const props = defineProps<{
    modelValue: BookmarkModelValues;
    onSubmit: (v: BookmarkModelValues) => void;
  }>();
  const emit = defineEmits<{
    (e: 'update:modelValue', value: { url: string; title: string }): void;
    (e: 'cancel:modelValue', value: { url: string; title: string }): void;
  }>();

  const formSchema = toTypedSchema(
    z.object({
      url: z.url(),
      title: z.string(),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: {
      url: '',
      title: '',
    },
  });

  const onSubmit = handleSubmit((values) => {
    emit('update:modelValue', values); // v-model 更新
    props.onSubmit(values); // 呼び出し元の関数を実行
  });
  const onCancel = () => {
    resetForm();
    emit('cancel:modelValue', { url: '', title: '' });
  };
</script>

<template>
  <div>
    <form
      id="form-bookmark"
      @submit="onSubmit"
      class="flex flex-col gap-4"
    >
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
          <ShadFormMessage />
        </ShadFormItem>
      </ShadFormField>
    </form>
    <div class="flex gap-2 pt-2">
      <ShadButton
        type="submit"
        form="form-bookmark"
      >
        Submit
      </ShadButton>
      <ShadButton
        type="button"
        variant="outline"
        @click="onCancel"
      >
        cancel
      </ShadButton>
    </div>
  </div>
</template>
