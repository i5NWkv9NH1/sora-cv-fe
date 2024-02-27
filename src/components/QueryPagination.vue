<!--
  TODO: 使用 composables
 -->

<script setup lang="ts">
import type { Density } from '~/mocks'

interface Props {
  top?: number
  bottom?: number
  modelValue?: number
  // * 总页数
  totalPageSize?: number
  // * 总条目
  visible?: number
  density?: Density
  disabled?: boolean
  // * 默认 100%
  fullWidth?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  top: 4,
  bottom: 4,
  modelValue: 1,
  totalPageSize: 10,
  visible: 5,
  disabled: false,
  density: 'default',
  fullWidth: true,
})
const emits = defineEmits(['update:modelValue'])
const currentPage = ref(props.modelValue)
watch(() => props.modelValue, () => currentPage.value = props.modelValue)
watch(currentPage, value => emits('update:modelValue', value))
</script>

<template>
  <VRow :class="[`mt-${props.top} my-${props.bottom}`]">
    <VPagination
      v-model="currentPage" :length="props.totalPageSize" :total-visible="props.visible"
      :disabled="props.disabled" :density="props.density" :class="[{
        'fill-width': props.fullWidth,
      }]"
    />
  </VRow>
</template>
