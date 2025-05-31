<!-- ThemeToggle.vue -->
<template>
  <v-btn icon @click="toggleTheme">
    <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
  </v-btn>
</template>

<script setup>
  import { useTheme } from 'vuetify'
  import { ref } from 'vue'
  const theme = useTheme()
  const isDark = ref(theme.global.name.value === 'dark')

  if (localStorage.getItem('theme') === 'dark') {
    theme.global.name.value = 'dark'
    isDark.value = true
  }

  function toggleTheme () {
    isDark.value = !isDark.value
    theme.global.name.value = isDark.value ? 'dark' : 'light'
    localStorage.setItem('theme', theme.global.name.value)
  }
</script>
