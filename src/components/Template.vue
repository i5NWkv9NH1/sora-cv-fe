<script setup lang="ts">
import type { Template } from '~/types';

type Props = {
  width: string
  item: any
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  item: {
    title: '留白',
    description: '顶部留白的极简内容简历模板',
    thumbnailUrl: 'https://www.nicecv.cn/api/web/uploads/2023111015415325feb6980.jpg',
    tags: [
      { id: 10010, name: '创意' },
      { id: 10011, name: '设计师' },
      { id: 10012, name: '中级' },
      { id: 10013, name: '深色' }
    ],
    isFree: false
  }
})
</script>

<template>
  <VCard :to="`/`" class="relative" width="100%" hover>
    <VCardTitle>{{ item.title }}</VCardTitle>
    <VCardSubtitle>{{ item.description }}</VCardSubtitle>
  </VCard>
</template>
