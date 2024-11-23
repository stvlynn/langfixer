<script setup lang="ts">
defineProps<{
  title: string
  content: string
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-lg font-semibold mb-4 text-gray-800">{{ title }}</h2>
    <textarea
      :value="content"
      readonly
      class="w-full h-48 rounded-lg border-gray-300 shadow-sm bg-gray-50"
    ></textarea>
  </div>
</template>