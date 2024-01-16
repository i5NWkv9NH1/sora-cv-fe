import { defineStore } from 'pinia'

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
    return { alert, toggleAlert }
  },
  { persist: true }
)
