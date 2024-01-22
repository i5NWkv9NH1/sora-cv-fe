<script setup lang="tsx">
import { type Template, mockTemplateData } from '~/mocks'

interface Props {
  isSelected?: boolean
  toggle?: () => void
  item?: Template
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: true,
  toggle: () => {},
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
  <ClientOnly>
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
        <VImg :src="item.thumbnailUrl" @click="toggle">
          <!-- <VImg :src="item.thumbnailUrl"> -->
          <VOverlay :model-value="isSelected" persistent contained content-class="fill-height fill-width" @click.stop="toggle">
            <!-- <VOverlay :model-value="isSelected" contained content-class="fill-height fill-width" persistent> -->
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
    <!-- <VHover v-slot="{ isHovering, props }">
      <VCard
        v-bind="props"
        :rounded="0"
        :variant="isSelected ? 'tonal' : 'elevated'"
        class="position-relative myfile"
        @click="isSelected = true"
      >
        <template v-if="isSelected">
          <span class="top" />
          <span class="right" />
          <span class="bottom" />
          <span class="left" />
        </template>
        <VImg :src="item.thumbnailUrl" v-bind="props">
          <VOverlay :model-value="isHovering" contained content-class="fill-height fill-width">
            <div class="position-absolute pa-2" :style="{ top: '0', right: '0' }">
              <VChip rounded="xl" size="small" :color="item.isVip ? 'warning' : 'black'" variant="elevated" elevation="0" class="font-weight-bold">
                {{ item.isVip ? 'VIP' : 'Free' }}
              </VChip>
            </div>
            <div class="fill-height d-flex flex-column justify-center text-center text-white gap-4 pa-8">
              <div class="text-h5 text-truncate">
                {{ item.title }}
              </div>
              <div class="text-subtitle-2 text-truncate">
                {{ item.subtitle }}
              </div>
            </div>
          </VOverlay>
        </VImg>
      </VCard>
    </VHover> -->
  </ClientOnly>
</template>
