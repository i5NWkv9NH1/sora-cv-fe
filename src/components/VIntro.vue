<script setup lang="tsx">
const props = withDefaults(defineProps<{ title: string; subtitle: string; caption: string; center: boolean; gap: number; width: string | number }>(), {
  title: '',
  subtitle: '',
  caption: '',
  center: false,
  gap: 1,
  width: '100%'
})

const classes = computed(() => ['headline', 'mb-10', { 'text-center': props.center }])
const styles = computed(() => {
  return {
    gap: `${props.gap}rem`,
    width: props.width
  }
})

</script>

<template>
  <div class="wrapper" style="width: 100%">
    <div :class="classes" :style="styles">
      <div class="prepend my-4">
        <slot name="prepend" />
      </div>
      <div class='text-h3 font-weight-bold  my-4'>{{ props.title }}</div>
      <div class='text-h3'>{{ props.subtitle }}</div>
      <div class='text-subtitle-1 my-4'>
        {{ props.caption }}
      </div>
    </div>

    <div class="slot">
      <slot />
    </div>
  </div>
</template>

