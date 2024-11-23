<template>
  <button
    @click="toggleDarkMode"
    class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg flex items-center gap-2 transition-colors"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

// Check if it's night time (between 18:00 and 6:00)
const isNightTime = () => {
  const hour = new Date().getHours()
  return hour >= 18 || hour < 6
}

// Initialize dark mode based on:
// 1. Local storage preference
// 2. System preference
// 3. Time of day
const initializeDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode !== null) {
    isDark.value = savedMode === 'true'
  } else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDark.value = true
    } else {
      // If no system preference, check time
      isDark.value = isNightTime()
    }
  }
  applyDarkMode()
}

// Apply dark mode to document
const applyDarkMode = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('darkMode', isDark.value.toString())
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
}

// Watch for system dark mode changes
onMounted(() => {
  initializeDarkMode()
  
  // Listen for system dark mode changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('darkMode') === null) {
      isDark.value = e.matches
    }
  })

  // Check time every minute
  setInterval(() => {
    if (localStorage.getItem('darkMode') === null && 
        !window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDark.value = isNightTime()
    }
  }, 60000)
})

// Watch for dark mode changes
watch(isDark, () => {
  applyDarkMode()
})
</script>
