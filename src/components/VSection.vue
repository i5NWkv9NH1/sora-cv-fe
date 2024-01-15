<script setup lang="tsx">
const props = withDefaults(defineProps<{ title: string }>(), {
  title: '热门简历模板'
})

function Headline(props: { title: string }) {
  return (
    <div class={'text-h4 font-weight-bold'}>
      <span class={'text-primary mr-2'}>#</span>
      {props.title}
    </div>
  )
}
</script>

<template>
  <div class="d-flex flex-column fluid" style="gap: 1.25rem; width: 100%">
    <Headline :title="title" />
    <VRow>
      <slot />
    </VRow>
  </div>
</template>

