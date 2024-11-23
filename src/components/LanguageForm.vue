<script setup lang="ts">
import { ref } from 'vue'
import type { LanguageCode } from '../services/api'

const emit = defineEmits<{
  (e: 'submit', data: { lang: LanguageCode; url: string }): void
}>()

const props = defineProps<{
  disabled?: boolean
}>()

const lang = ref<LanguageCode>('en-US')
const url = ref('')

const handleSubmit = () => {
  emit('submit', { lang: lang.value, url: url.value })
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
    <div class="grid grid-cols-1 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Base Language</label>
        <select
          v-model="lang"
          :disabled="disabled"
          class="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        >
          <option value="en-US">English</option>
          <option value="zh-Hans">Chinese</option>
          <option value="ja-JP">Japanese</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL Suffix</label>
        <input
          type="text"
          v-model="url"
          :disabled="disabled"
          class="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          placeholder="Enter URL suffix"
        />
      </div>
      
      <button
        @click="handleSubmit"
        :disabled="disabled"
        class="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-800 rounded-lg flex items-center justify-center gap-2"
      >
        {{ disabled ? 'Checking...' : 'Check Languages' }}
      </button>
    </div>
  </div>
</template>