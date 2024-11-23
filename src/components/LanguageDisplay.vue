<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps<{
  title: string
  content: string
}>()

const toast = useToast()
const isApplied = ref(false)
const particles = ref<Array<{ x: number, y: number, text: string, opacity: number }>>([])

const formattedContent = computed(() => {
  if (isApplied.value) {
    // 移除<rm>标签的内容，保留<add>标签的内容但去除标签
    return props.content
      .replace(/<rm>.*?<\/rm>/g, '')
      .replace(/<add>(.*?)<\/add>/g, '$1')
  }
  return props.content
    .replace(/<add>(.*?)<\/add>/g, '<span class="text-green-600">$1</span>')
    .replace(/<rm>(.*?)<\/rm>/g, '<span class="text-red-600 rm-text">$1</span>')
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

const createParticles = (element: HTMLElement) => {
  const rmTexts = element.getElementsByClassName('rm-text')
  const newParticles: Array<{ x: number, y: number, text: string, opacity: number }> = []
  
  Array.from(rmTexts).forEach((el) => {
    const rect = el.getBoundingClientRect()
    const containerRect = element.getBoundingClientRect()
    const text = el.textContent || ''
    const chars = text.split('')
    
    chars.forEach((char, index) => {
      newParticles.push({
        x: rect.left - containerRect.left + (index * 8),
        y: rect.top - containerRect.top,
        text: char,
        opacity: 1
      })
    })
  })
  
  particles.value = newParticles
  requestAnimationFrame(animateParticles)
}

const animateParticles = () => {
  if (particles.value.length === 0) return
  
  particles.value = particles.value.map(particle => ({
    ...particle,
    y: particle.y - 2,
    opacity: particle.opacity - 0.02
  })).filter(particle => particle.opacity > 0)
  
  if (particles.value.length > 0) {
    requestAnimationFrame(animateParticles)
  }
}

const applyChanges = () => {
  const container = document.getElementById('content-container')
  if (container) {
    createParticles(container)
  }
  isApplied.value = true
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
      <div class="flex gap-2">
        <button
          @click="applyChanges"
          :disabled="isApplied"
          class="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Apply Changes
        </button>
        <button
          @click="copyContent"
          :disabled="!isApplied"
          class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg flex items-center gap-2"
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
        class="w-full h-96 rounded-lg border border-gray-300 shadow-sm bg-gray-50 p-4 overflow-auto whitespace-pre-wrap"
        v-html="formattedContent"
      ></div>
      <div class="absolute inset-0 pointer-events-none">
        <div
          v-for="(particle, index) in particles"
          :key="index"
          class="absolute text-red-600 transition-all duration-1000 ease-out text-sm"
          :style="{
            left: particle.x + 'px',
            top: particle.y + 'px',
            opacity: particle.opacity,
            transform: `rotate(${Math.random() * 360}deg)`
          }"
        >
          {{ particle.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
</style>