<script setup lang="tsx">
import { type Template, mockTemplateData } from '~/mocks'

interface Props {
  isSelected?: boolean
  toggle?: () => void
  item?: Template
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: true,
  toggle: () => { },
  item: () => mockTemplateData.detail,
})
// const emits = defineEmits(['update:modelValue'])
// const isSelected = ref(props.modelValue)

// watch(() => props.modelValue, () => {
//   isSelected.value = props.modelValue
// })
// watch(isSelected, (value) => {
//   emits('update:modelValue', value)
// })
</script>

<template>
  <VCard
    rounded="lg"
    :variant="isSelected ? 'tonal' : 'elevated'"
    class="position-relative rainbow"
    :elevation="0"
    border
  >
    <!-- * 动画 -->
    <template v-if="isSelected">
      <RainbowSlot />
    </template>

    <!-- *  -->
    <VSheet class="pa-4">
      <VImg
        :src="item.thumbnailUrl"
        @click="toggle"
      >
        <!-- <VImg :src="item.thumbnailUrl"> -->
        <VOverlay
          :model-value="isSelected"
          contained
          persistent
          no-click-animation
          content-class="fill-height fill-width"
        >
          <VipTag
            :is-vip="props.item.isVip"
            size="small"
          />
          <div class="fill-height d-flex flex-column justify-center text-center gap-4 pa-8 font-weight-bold text-surface">
            <div class="text-h5 text-truncate">
              {{ item.title }}
            </div>
            <div class="text-subtitle-2 text-truncate">
              {{ item.subtitle }}
            </div>
          </div>
        </VOverlay>
      </VImg>
    </VSheet>
  </VCard>
</template>
