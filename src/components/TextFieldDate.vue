<!--
  * 自定义 日期TextField
 -->

<script setup lang="ts">
import { useDate } from 'vuetify'

const props = withDefaults(defineProps<Props>(), {
  label: '',
  color: 'surface',
  modelValue: '2020-01-01',
})

const emits = defineEmits(['update:modelValue'])

const adapter = useDate()

interface Props {
  label?: string
  color?: string
  // * YYYY-MM-DD
  modelValue?: string
}

const isMenuOpen = ref(false)
// * 使用 vuetify 内置的日期解析器，解析为 Date
const selectedDate = ref(adapter.parseISO(props.modelValue))
// * 重新解析为 iso
const formattedDate = computed(() => {
  return selectedDate.value ? adapter.toISO(selectedDate.value) : ''
})
// * v-model
watch(() => props.modelValue, newDate => selectedDate.value = adapter.parseISO(newDate))
// * 更新 props，重新解析为 iso
watch(selectedDate, newDate => emits('update:modelValue', adapter.toISO(newDate)))
</script>

<template>
  <VMenu v-model="isMenuOpen" transition="slide-y-transition">
    <template #activator="{ props }">
      <VTextField
        v-bind="props" :model-value="formattedDate" readonly variant="outlined" density="compact"
        placeholder="出生日期" hide-details
      />
    </template>

    <VDatePicker v-model="selectedDate" title="" :color="color" hide-header hide-weekdays>
      <template #header />
    </VDatePicker>
  </VMenu>
</template>

<style lang="scss" scoped>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}

.v-picker-title {
  padding: 0 !important;
}
</style>`
