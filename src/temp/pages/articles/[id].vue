<script setup lang="ts">
const id = useRoute().params.id

useSeoMeta({ title: '文章' })
</script>

<template>
  <VContainer>
    query: {{ id }}
  </VContainer>
</template>
