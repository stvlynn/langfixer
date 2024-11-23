<template>
  <div>
    <button
      @click="openDialog"
      class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      Settings
    </button>

    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Settings</h2>
          <button @click="closeDialog" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              API Key for Dify Application
            </label>
            <div class="relative">
              <input
                v-model="apiKey"
                :type="showApiKey ? 'text' : 'password'"
                class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                :placeholder="apiKey ? '••••••••' + apiKey.slice(-4) : 'Enter your API key'"
              />
              <button
                type="button"
                @click="toggleApiKeyVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="showApiKey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    v-if="!showApiKey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              API URL
            </label>
            <input
              v-model="apiUrl"
              type="text"
              class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              placeholder="Enter API URL"
            />
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="closeDialog"
            class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            @click="saveSettings"
            class="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const isOpen = ref(false)
const apiKey = ref('')
const apiUrl = ref('https://api.dify.ai/v1/workflows/run')
const showApiKey = ref(false)

onMounted(() => {
  // Load saved settings from localStorage
  const savedApiKey = localStorage.getItem('apiKey')
  const savedApiUrl = localStorage.getItem('apiUrl')
  
  if (savedApiKey) {
    apiKey.value = savedApiKey
  }
  if (savedApiUrl) {
    apiUrl.value = savedApiUrl
  }
})

const toggleApiKeyVisibility = () => {
  showApiKey.value = !showApiKey.value
}

const openDialog = () => {
  isOpen.value = true
  showApiKey.value = false // Reset visibility when opening dialog
}

const closeDialog = () => {
  isOpen.value = false
}

const saveSettings = () => {
  // Save to localStorage
  localStorage.setItem('apiKey', apiKey.value)
  localStorage.setItem('apiUrl', apiUrl.value)
  
  toast.success('Settings saved successfully')
  closeDialog()
}
</script>
