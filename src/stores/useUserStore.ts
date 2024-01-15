import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const state = reactive({
      token: ''
    })

    return { state }
  },
  { persist: true }
)
