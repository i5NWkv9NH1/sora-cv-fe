<script setup lang="tsx">
//! Parent template
definePageMeta({
  layout: 'creator', middleware: ['auth']
})

console.log(useUserStore().state.token)
</script>

<template>
  <NuxtPage />
</template>
