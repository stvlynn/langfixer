<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps<{
  title: string
  content: string
}>()

const toast = useToast()
const isApplied = ref(false)

const formattedContent = computed(() => {
  if (isApplied.value) {
    return props.content
      .replace(/<rm>.*?<\/rm>/g, '')
      .replace(/<add>(.*?)<\/add>/g, '$1')
  }
  return props.content
    .replace(/<add>(.*?)<\/add>/g, '<span class="text-green-600">$1</span>')
    .replace(/<rm>(.*?)<\/rm>/g, '<span class="text-red-600 rm-text fade-out">$1</span>')
})

const copyContent = async () => {
  if (!isApplied.value) return
  try {
    const plainText = formattedContent.value.replace(/<\/?[^>]+(>|$)/g, '')
    await navigator.clipboard.writeText(plainText)
    toast.success('Content copied to clipboard')
  } catch (error) {
    toast.error('Failed to copy content')
  }
}

const applyChanges = () => {
  isApplied.value = true
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ title }}</h2>
      <div class="flex gap-2">
        <button
          @click="applyChanges"
          :disabled="isApplied"
          class="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Apply Changes
        </button>
        <button
          @click="copyContent"
          :disabled="!isApplied"
          class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-500 disabled:cursor-not-allowed rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy
        </button>
      </div>
    </div>
    <div class="relative">
      <div
        id="content-container"
        class="w-full h-96 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm bg-gray-50 dark:bg-gray-900 p-4 overflow-auto whitespace-pre-wrap text-gray-800 dark:text-gray-100"
        v-html="formattedContent"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.whitespace-pre-wrap {
  white-space: pre-wrap;
}

.rm-text {
  display: inline-block;
  position: relative;
}

.fade-out {
  animation: fadeOutUp 0.8s ease forwards;
}

@keyframes fadeOutUp {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>