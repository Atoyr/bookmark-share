<script setup lang="ts">
import { ref } from 'vue'
import Tag from './Tag.vue'
import type { TagValue } from '@/types/tag'

// props
const props = defineProps<{
  modelValue: TagValue[]
  defineTags: TagValue[]
  placeholder?: string
}>()

// emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: TagValue[]): void
}>()

const input = ref('')

const update = (tags: TagValue[]) => {
  emit('update:modelValue', tags)
}

const addTag = () => {
console.log("add tag", input.value, props.defineTags)
  const value = input.value.trim()
  if (!value) return

  // 定義済みタグから一致するものを探す
  const found = props.defineTags.find(tag => tag.name === value)
  if (!found) return

  // すでに同じIDのタグがあれば追加しない(必要なら)
  if (props.modelValue.some(t => t.id === found.id)) {
    input.value = ''
    return
  }

  update([...props.modelValue, found])
  input.value = ''
}

const removeTag = (id: string) => {
  update(props.modelValue.filter(tag => tag.id !== id))
}

const onKeydown = (e: KeyboardEvent) => {
  // Enter or カンマで追加
  if ((e.key === 'Enter' || e.key === ',') && input.value.trim()) {
    e.preventDefault()
    addTag()
    return
  }

  // Backspace で入力欄が空なら最後のタグ削除
  if (e.key === 'Backspace' && !input.value && props.modelValue.length > 0) {
    e.preventDefault()
    const clone = [...props.modelValue]
    clone.pop()
    update(clone)
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-1 items-center border rounded px-2 py-1">
    <!-- 選択済みタグ -->
    <Tag
      v-for="tag in props.modelValue"
      :key="tag.id"
      :tag="tag"
      :name="tag.name"
      @remove="removeTag(tag.id)"
    />

    <!-- 入力欄 -->
    <input
      v-model="input"
      :placeholder="props.placeholder ?? 'タグを入力...'"
      class="flex-1 min-w-[80px] outline-none bg-transparent"
      @keydown="onKeydown"
    />
  </div>
</template>
