import { defineStore } from 'pinia'
import type { PreviewOption, Density, PreviewSize } from '~/types'

export const usePreferencesStore = defineStore(
  'preferences',
  () => {
    const alert = ref({
      status: false,
      message: '',
      delay: 1000,
      color: 'primary',
      location: 'top center' as any
    })
    const density = ref<Density>('default')
    const height = computed(() => {
      switch (density.value) {
        case 'default':
          return 64
        case 'compact':
          return 48
        case 'comfortable':
          return 56
        default:
          return 64
      }
    })
    const previewSize = ref<PreviewSize>('A4')

    function updatePreviewSize(value: PreviewSize) {
      previewSize.value = value
    }

    function toggleAlert(
      { message, color, delay } = {
        message: 'ok',
        color: 'primary',
        delay: 2000
      }
    ) {
      if (!alert.value.status) {
        alert.value.status = true
      }

      alert.value.message = message
      alert.value.color = color
      alert.value.delay = delay
    }
    return { alert, density, height, toggleAlert, previewSize, updatePreviewSize }
  },
  { persist: true }
)
