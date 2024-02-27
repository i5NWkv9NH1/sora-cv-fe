<script setup lang="ts">
import type { Size } from '~/mocks'

interface Props {
  isVip?: boolean

  // * 样式
  size?: Size

  // * 位置
  top?: number
  right?: number
  // * 文本
  vipText?: string
  freeText?: string
}

const props = withDefaults(defineProps<Props>(), {
  isVip: true,
  size: 'small',
  top: 0,
  right: 0,
  vipText: '会员',
  freeText: '免费',
})
const top = computed(() => `${props.top}px`)
const right = computed(() => `${props.right}px`)
</script>

<template>
  <div class="vip-chip">
    <VChip
      rounded="xl"
      :size="size"
      :color="props.isVip ? 'warning' : 'black'"
      variant="elevated"
      elevation="0"
      class="font-weight-bold"
    >
      {{ props.isVip ? vipText : freeText }}
    </VChip>
  </div>
</template>

<style lang="scss" scoped>
.vip-chip {
  position: absolute;
  padding: 8px;
  top:  v-bind(top);
  right: v-bind(right);
}
</style>
