<script setup lang="tsx">
const props = withDefaults(defineProps<{ title: string, titleCenter: boolean, hideTag: boolean }>(), {
  title: '热门简历模板',
  titleCenter: false,
  hideTag: false,
})

function Headline(props: { title: string, titleCenter: boolean, hideTag: boolean }) {
  return (
    <div class={['text-h4', 'font-weight-bold', { 'text-center': props.titleCenter }]}>
      {!props.hideTag && <span class="text-primary mr-2">#</span>}
      {props.title}
    </div>
  )
}
</script>

<template>
  <div class="d-flex flex-column fill-width gap-4">
    <Headline :title="title" :title-center="titleCenter" :hide-tag="hideTag" />
    <slot />
  </div>
</template>
