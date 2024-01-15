<script setup lang="ts">
import type { ITemplate } from "~/types";

type Props = {
  item: Partial<ITemplate>
}

const props = defineProps<Props>()
</script>

<template>
  <VCard class="position-relative" width="100%" hover>
    <div class="position-absolute pa-4" style={{ top: 0, right: 0 }}>
      <VChip color="warning" rounded="lg" size="small">
        VIP
      </VChip>
    </div>
    <VCardTitle class="font-weight-bold">{{ props.item.title }}</VCardTitle>
    <VCardSubtitle>{{ props.item.description }}</VCardSubtitle>
    <VCardText>
      <VImg :src="props.item.thumbnailUrl" class="rounded-lg" />
    </VCardText>
    <VCardActions>
      <VBtn :to="`/editor?templateId=${props.item.id}`" variant="tonal" rounded="lg">
        使用模板
      </VBtn>
      <VBtn :to="`/templates/${props.item.id}`" variant="tonal" rounded="lg">
        查看模板
      </VBtn>
    </VCardActions>
    <!-- <VCardActions>
      <VChip v-for="tag in props.item.tags" :key="tag.id" class="mr-1" rounded="lg">
        {{ tag.name }}
      </VChip>
    </VCardActions> -->
  </VCard>
</template>
