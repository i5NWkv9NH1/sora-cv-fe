<template>
  <v-menu v-model="isMenuOpen" :close-on-content-click="false" transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-text-field :model-value="formattedDate" readonly v-bind="props" variant="outlined" density="compact"
        placeholder="出生日期" hide-details />
    </template>
    <v-date-picker v-model="selectedDate" title="" :color="color" hide-header hide-weekdays>
      <template v-slot:header></template>
    </v-date-picker>
  </v-menu>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from "vue";
import { useDate } from 'vuetify'

const { label, color, modelValue } = defineProps([
  "color",
  "modelValue",
]);

const adapter = useDate()
const emit = defineEmits("update:modelValue");

const isMenuOpen = ref(false);
const selectedDate = ref(modelValue);

const formattedDate = computed(() => {
  return selectedDate.value ? adapter.toISO(selectedDate.value) : "";
});

watch(modelValue, (newDate) => {
  selectedDate.value = newDate;
});

watch(selectedDate, (newDate) => {
  emit("update:modelValue", newDate);
});

watchEffect(() => {
  const date = adapter.toISO(selectedDate.value)
  console.log(date)
})
</script>
<style>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}

.v-picker-title {
  padding: 0 !important;
}
</style>`
