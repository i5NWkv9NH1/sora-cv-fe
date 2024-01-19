<script setup>
import { useDate } from 'vuetify'

const { label, color, modelValue } = defineProps([
  'color',
  'modelValue',
])

const emit = defineEmits('update:modelValue')
const adapter = useDate()
const isMenuOpen = ref(false)
const selectedDate = ref(modelValue)

const formattedDate = computed(() => {
  return selectedDate.value ? adapter.toISO(selectedDate.value) : ''
})

watch(modelValue, (newDate) => {
  selectedDate.value = newDate
})

watch(selectedDate, (newDate) => {
  emit('update:modelValue', newDate)
})

watchEffect(() => {
  const date = adapter.toISO(selectedDate.value)
})
</script>

<template>
  <v-menu v-model="isMenuOpen" transition="slide-y-transition">
    <template #activator="{ props }">
      <v-text-field
        :model-value="formattedDate" readonly v-bind="props" variant="outlined" density="compact"
        placeholder="出生日期" hide-details
      />
    </template>
    <v-date-picker v-model="selectedDate" title="" :color="color" hide-header hide-weekdays>
      <template #header />
    </v-date-picker>
  </v-menu>
</template>

<style>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}

.v-picker-title {
  padding: 0 !important;
}
</style>`
