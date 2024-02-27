<script setup lang="ts">
import { type Fanwen, mockFanwens } from '~/mocks'

interface Props {
  toggle?: () => void
  isSelected?: boolean
  item?: Fanwen
}
const props = withDefaults(defineProps<Props>(), {
  isSelected: false,
  toggle: () => { },
  item: () => mockFanwens[0],
})
</script>

<template>
  <VList lines="three">
    <VListItem :active="props.isSelected" rounded="lg" @click="toggle">
      <VListItemTitle>{{ props.item.title }}</VListItemTitle>
      <VListItemSubtitle>{{ props.item.description }}</VListItemSubtitle>
    </VListItem>
  </VList>
</template>
