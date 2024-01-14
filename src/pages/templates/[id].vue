<script setup lang="tsx">
const id = useRoute().params.id
const name = ref('默认模板')
const title = computed(() => '模板中心 | ' + name.value + '|' + id)
useSeoMeta({ title: title.value })
</script>

<template>
  <VContainer>
    <div class="text-h4 font-weight-bold">
      {{ title }}
    </div>
  </VContainer>
</template>
