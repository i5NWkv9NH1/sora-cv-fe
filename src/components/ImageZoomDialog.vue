<script setup lang="ts">
import { mockImageUrl } from '~/mocks'

interface Props {
  modelValue?: boolean
  imageSrc?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: true,
  imageSrc: mockImageUrl,
})
const emits = defineEmits(['update:modelValue'])
const dialog = ref(props.modelValue)
watch(() => props.modelValue, () => dialog.value = props.modelValue)
watch(dialog, value => emits('update:modelValue', value))
</script>

<template>
  <VDialog
    v-model="dialog"
    fullscreen
    transition="slide-x-transition"
    close-on-content-click
  >
    <VContainer>
      <template v-if="props.imageSrc">
        <VImg :src="props.imageSrc" />
      </template>
      <!-- * Emtpy -->
      <template v-else>
        <VAvatar color="primary" />
      </template>
    </VContainer>
  </VDialog>
</template>
