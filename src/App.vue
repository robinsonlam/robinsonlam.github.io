<script setup lang="ts">
// * Global
import GlobalNavigation from './components/core/GlobalNavigation/GlobalNavigation.vue'
import BackgroundRenderer from './components/core/BackgroundRenderer/BackgroundRenderer.vue'
import TheFooter from './components/core/TheFooter/TheFooter.vue'
</script>

<template>
  <router-view />

  <GlobalNavigation />
  <BackgroundRenderer />
  <TheFooter />
</template>

<style scoped>
#app {
  
}
</style>
