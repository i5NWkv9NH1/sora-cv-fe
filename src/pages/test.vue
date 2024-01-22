<script setup lang="ts">
import { v4 } from 'uuid'

const dialog = ref(false)
const items = ref([
  { id: v4(), color: 'red', title: 'A', value: 1 },
  { id: v4(), color: 'yellow', title: 'B', value: 2 },
  { id: v4(), color: 'blue', title: 'C', value: 3 },
  { id: v4(), color: 'green', title: 'D', value: 4 },
])

watch(items, () => { console.log('update items') })
</script>

<template>
  <VContainer>
    <SortableListDialog v-model="dialog" v-model:items="items" />
    <VBtn @click="dialog = true">
      Refresh
    </VBtn>
  </VContainer>
</template>
