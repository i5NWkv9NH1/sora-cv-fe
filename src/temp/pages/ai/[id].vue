<script setup lang="ts">
const id = useRoute().params.id

useSeoMeta({ title: 'AI工具' })
</script>

<template>
  <VContainer>
    query: {{ id }}
  </VContainer>
</template>
