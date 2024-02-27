<!--
  TODO：优化UI
 -->
<script setup lang="ts">
import { type Template, mockTemplateData } from '~/mocks'

interface Props {
  item?: Template
}
const props = withDefaults(defineProps<Props>(), {
  // @ts-expect-error
  item: () => mockTemplateData.detail,
})
</script>

<template>
  <VCard class="position-relative" width="100%" hover>
    <!-- * VIP标签 -->
    <VipTag :is-vip="props.item.isVip" size="small" />

    <!-- * 正文 -->
    <VCardTitle class="font-weight-bold">
      {{ item.title }}
    </VCardTitle>
    <VCardSubtitle>{{ item.subtitle }}</VCardSubtitle>
    <VCardText>
      <VImg :src="item.thumbnailUrl" class="rounded-lg" />
    </VCardText>
    <VCardActions>
      <VBtn :to="`/editor?templateId=${item.id}`" variant="tonal">
        使用模板
      </VBtn>
      <VBtn :to="`/templates/${item.id}`" variant="tonal">
        查看模板
      </VBtn>
    </VCardActions>
    <VCardActions>
      <VChip v-for="tag in item.tags" :key="tag.id" class="mr-2">
        {{ tag.name }}
      </VChip>
    </VCardActions>
  </VCard>
</template>
