<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import LanguageForm from './components/LanguageForm.vue'
import LanguageDisplay from './components/LanguageDisplay.vue'
import { checkLanguages } from './services/api'

const toast = useToast()
const loading = ref(false)
const texts = ref({ cn: '', en: '', jp: '' })

const handleSubmit = async ({ lang, url }: { lang: string; url: string }) => {
  if (!url.trim()) {
    toast.error('Please enter a URL suffix')
    return
  }

  loading.value = true
  try {
    const response = await checkLanguages(lang, url)
    texts.value = {
      cn: response.cn || '',
      en: response.en || '',
      jp: response.jp || ''
    }
    toast.success('Languages checked successfully')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to check languages'
    toast.error(errorMessage)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-6 px-3">
    <div class="max-w-7xl mx-auto">
      <LanguageForm @submit="handleSubmit" :disabled="loading" />
      
      <div v-if="loading" class="text-center mb-6">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <LanguageDisplay title="Chinese" :content="texts.cn" />
        <LanguageDisplay title="English" :content="texts.en" />
        <LanguageDisplay title="Japanese" :content="texts.jp" />
      </div>
    </div>
  </div>
</template>