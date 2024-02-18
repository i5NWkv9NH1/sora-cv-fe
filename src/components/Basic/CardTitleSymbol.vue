<script setup lang="ts">
import type { StyleValue } from 'vue'

interface Props {
  color?: string
  width?: number
  height?: number
}
const props = withDefaults(defineProps<Props>(), {
  color: 'red',
  width: 10,
  height: 24,
})

const styles = computed<StyleValue>(() => {
  return {
    backgroundColor: props.color,
    width: `${props.width}px`,
    height: `${props.height}px`,
  }
})
</script>

<template>
  <div
    class="card-title-symbol"
    :style="styles"
  />
</template>

<style scoped lang="scss">
.card-title-symbol {
  border-radius: 10px;
  margin-right: 1rem;
}
</style>
