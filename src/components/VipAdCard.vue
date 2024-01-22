<!--
  TODO：优化UI
 -->

<script setup lang="tsx">
import { useTheme } from 'vuetify'
import { type VIP, mockVips } from '~/mocks'

const props = withDefaults(defineProps<Props>(), {
  isSelected: true,
  item: () => mockVips[0],
  toggle: () => {},
})
const { global: { name } } = useTheme()
interface Props {
  isSelected?: boolean
  item?: VIP
  toggle?: () => void
}
const styles = computed(() => {
  const isDark = name.value === 'dark'
  // * selected
  if (props.isSelected) {
    // * dark
    if (isDark)
      return { backgroundColor: '#fed7aa', color: '#000000' }
    // * light
    return { backgroundColor: '#fed7aa', color: '#000' }
  }
  // * unselected
  if (isDark)
    return { backgroundColor: '#111827', color: '#fed7aa' }
  return { backgroundColor: '#111827', color: '#fed7aa' }
})
</script>

<template>
  <ClientOnly>
    <VHover>
      <template #default="{ isHovering, props }">
        <VSheet v-bind="props" :style="styles" :color="styles.backgroundColor" class="pa-8 vip-card" rounded="xl" @click="toggle">
          <div class="d-flex flex-column justify-space-between align-center gap-4" :style="{ color: styles.color }">
            <div class="text-h6">
              {{ item.title }}
            </div>
            <div class="d-flex align-baseline">
              <div class="text-h4 font-weight-bolder">
                ¥
              </div>
              <div class="text-h2 font-weight-bolder">
                {{ item.price }}
              </div>
            </div>

            <div class="text-body-1 font-weight-black">
              {{ item.payTime }}
            </div>
            <div class="d-flex flex-column align-center text-body-2 gap-4" v-html="item.description" />
            <div class="d-flex">
              <VBtn variant="outlined" size="large" class="font-weight-bolder text-h6 button" rounded="lg">
                开通{{ item.title }}
              </VBtn>
            </div>
          </div>
        </VSheet>
      </template>
    </VHover>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.vip-card {
  border: 4px solid #111827;
  cursor: pointer;

  .button {
    border: 2px solid;
  }
}
</style>
