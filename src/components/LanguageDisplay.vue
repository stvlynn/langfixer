<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps<{
  title: string
  content: string
}>()

const toast = useToast()

const formattedContent = computed(() => {
  return props.content
    .replace(/<add>(.*?)<\/add>/g, '<span class="text-green-600">$1</span>')
    .replace(/<del>(.*?)<\/del>/g, '<span class="text-red-600">$1</span>')
})

const copyContent = async () => {
  try {
    // 复制原始内容，不包含HTML标签
    const plainText = props.content.replace(/<\/?[^>]+(>|$)/g, '')
    await navigator.clipboard.writeText(plainText)
    toast.success('Content copied to clipboard')
  } catch (error) {
    toast.error('Failed to copy content')
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
      <button
        @click="copyContent"
        class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        Copy
      </button>
    </div>
    <div
      class="w-full h-96 rounded-lg border border-gray-300 shadow-sm bg-gray-50 p-4 overflow-auto whitespace-pre-wrap"
      v-html="formattedContent"
    ></div>
  </div>
</template>

<style scoped>
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
</style>