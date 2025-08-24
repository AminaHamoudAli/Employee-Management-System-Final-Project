<template>
  <button 
    @click="toggle" 
    class="px-3 py-1 rounded border"
  >
    {{ isDark ? "  ☀️" : "🌙" }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

const isDark = ref(false)

const toggle = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>
