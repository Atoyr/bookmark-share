<script setup lang="ts">
  import { z } from 'zod';
  import { toTypedSchema } from '@vee-validate/zod';
  import type { FormContext } from 'vee-validate';
  import { useForm } from 'vee-validate';
  import { BookmarkFormValues } from '@/types/forms/bookmarkFormValues';

  const props = defineProps<{
    form: FormContext<BookmarkFormValues>;
  }>();

  const emit = defineEmits<{
    (e: 'submitForm', values: BookmarkFormValues): void;
  }>();

  const handleValidatedSubmit = (values: BookmarkFormValues) => {
    console.log('onSubmit in BookmarkForm', values);
    emit('submitForm', values);
  };

  const onSubmit = (e: SubmitEvent) => {
    props.form.handleSubmit(handleValidatedSubmit)(e);
  };
</script>

<template>
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
</template>
