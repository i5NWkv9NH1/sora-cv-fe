<script setup lang="tsx">
interface Props {
  title: string
  subtitle: string
  caption: string
  center: boolean
  gap: number
  width: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '轻松在线制作',
  subtitle: '您的精美个人简历',
  caption: '节省简历制作的时间，帮助您更好的介绍自己，获得梦想的职位。',
  center: false,
  gap: 4,
  width: '100%',
})
const classes = computed(() => ['headline', 'mb-10', `gap-${props.gap}`, { 'text-center': props.center }])
const styles = computed(() => {
  return {
    gap: `${props.gap}rem`,
    width: props.width,
  }
})
</script>

<template>
  <div class="wrapper fill-width">
    <div :class="classes" :style="styles">
      <div class="prepend my-4">
        <slot name="prepend" />
      </div>
      <div class="text-h3 font-weight-bold  my-4">
        {{ title }}
      </div>
      <div class="text-h3">
        {{ subtitle }}
      </div>
      <div class="text-subtitle-1 my-4">
        {{ caption }}
      </div>
    </div>

    <div class="slot">
      <slot />
    </div>
  </div>
</template>
