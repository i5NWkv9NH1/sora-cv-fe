<script setup lang="ts">
import { QueryFilter } from '~/refator'
import type { TemplateFilter, TemplateQuery } from '~/mocks'

// * your data
const filters = ref<TemplateFilter[]>()
const query = ref<TemplateQuery>({
  category: 1,
  date: 1,
  star: 1,
})
watch(query, (newQuery) => {
  // * do updated
}, { deep: true })
</script>

<template>
  <VContainer>
    <QueryFilter />
    <template v-for="(item) in filters" :key="item.id" />
  </VContainer>
</template>

<style lang="scss" scoped></style>
