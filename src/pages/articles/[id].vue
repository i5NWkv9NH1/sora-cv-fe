<script setup lang="tsx">
const id = useRoute().params.id
const name = ref('专业技能书写指南')
const title = computed(() => `求职攻略 | ${name.value}`)
useSeoMeta({ title: title.value })
</script>

<template>
  <VContainer>
    <div class="text-h4 font-weight-bold">
      {{ title }}
    </div>
  </VContainer>
</template>
