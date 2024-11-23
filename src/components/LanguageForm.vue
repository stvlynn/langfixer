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
  <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Language Consistency Checker</h1>
    
    <div class="grid grid-cols-1 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Base Language</label>
        <select
          v-model="lang"
          :disabled="disabled"
          class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="en-US">English</option>
          <option value="zh-Hans">Chinese</option>
          <option value="ja-JP">Japanese</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">URL Suffix</label>
        <input
          type="text"
          v-model="url"
          :disabled="disabled"
          class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Enter URL suffix"
        />
      </div>
      
      <button
        @click="handleSubmit"
        :disabled="disabled"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {{ disabled ? 'Checking...' : 'Check Languages' }}
      </button>
    </div>
  </div>
</template>