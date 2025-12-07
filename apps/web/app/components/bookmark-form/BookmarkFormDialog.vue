<script setup lang="ts">
  import BookmarkForm from './BookmarkForm.vue';
  import BookmarkFormButtons from './BookmarkFormButtons.vue';

  const props = defineProps<{
    form: FormContext<BookmarkFormValues>;
  }>();

  const emit = defineEmits<{
    (e: 'submitForm', values: BookmarkFormValues): void;
    (e: 'cancel'): void;
  }>();

  const isOpen = ref(false)

  const handleSubmit = (values: BookmarkFormValues) => {
    emit('submitForm', values);
    isOpen.value = false
  };

  const handleCancel = () => {
    emit('cancel');
    isOpen.value = false
  };

</script>

<template>
  <ShadDialog v-model:open="isOpen">
    <ShadDialogTrigger as-child>
      <ShadButton @click="isOpen = true">New</ShadButton>
    </ShadDialogTrigger>
    <ShadDialogContent>
      <ShadDialogHeader>
        <ShadDialogTitle>New Bookmark</ShadDialogTitle>
      </ShadDialogHeader>
      <BookmarkForm :form="props.form" @submit-form="handleSubmit"/>
      <BookmarkFormButtons @cancel="handleCancel" />
    </ShadDialogContent>
  </ShadDialog>
</template
