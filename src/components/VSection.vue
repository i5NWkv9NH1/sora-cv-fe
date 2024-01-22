<!--
  * 带有标题的Section
 -->

<script setup lang="ts">
interface Props {
  title?: string
  titleCenter?: boolean
  hideTag?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: '热门简历模板',
  titleCenter: false,
  hideTag: false,
})
</script>

<template>
  <div class="d-flex flex-column fill-width gap-4">
    <div class="text-h4 font-weight-bold" :class="[{ 'text-center': props.titleCenter }]">
      <template v-if="!props.hideTag">
        <span class="text-primary mr-2">#</span>
        <span>{{ props.title }}</span>
      </template>

      <template v-else>
        {{ props.title }}
      </template>
    </div>
    <slot />
  </div>
</template>
