<script setup lang="ts">
  import { useForm } from 'vee-validate';
  import { useBreadcrumb } from '~/composables/useBreadcrumb';
  import { useSpace } from '~/composables/useSpace';
  import { useBookmark } from '@/composables/useBookmark';
  import { useBookmarks } from '@/composables/useBookmarks';
  import { columns } from '@/components/bookmarks';
  import DataTable from '@/components/DataTable.vue';
  import { Page } from '@/components/page';
  import { BookmarkForm, BookmarkFormButtons } from '@/components/bookmark-form';
  import { bookmarkFormTypedSchema } from '@/schemas/forms/bookmarkFormSchema';
  import { BookmarkFormValues } from '@/types/fomrs/bookmarkFormValues';

  const route = useRoute();

  const breadcrumb = useBreadcrumb();
  const id = route.params.space_id as string;
  const { space } = useSpace(id);
  const { bookmarks, total } = useBookmarks({ space_id: id });
  const { create } = useBookmark();

  const spaceName = ref('');


  watchEffect(() => {
    breadcrumb.value = [{ label: 'Space List', href: '/spaces' }, { label: space.value?.name ?? '' }];
    spaceName.value = space.value?.name ?? '';
  });

  const form = useForm<BookmarkFormModelValues>({
    validationSchema: bookmarkFormTypedSchema,
  });

  function handleSubmit(values: BookmarkFormValues) {
    create(space.value!.id, values.url, values.title);
  }

  function handleCancel() {
    form.resetForm();
  }
</script>

<template>
  <Page>
    <template #top>
      <h1 class="py-8 text-4xl font-bold">{{spaceName}}</h1>
    </template>
    <BookmarkForm
      :form="form"
      @submitForm="handleSubmit"
    />
    <BookmarkFormButtons @cancel="handleCancel" />
    <div class="container mx-auto py-10">
      <DataTable
        :columns="columns"
        :data="bookmarks"
      />

    <p>total {{ total }}</p>

    </div>
  </Page>
</template>
