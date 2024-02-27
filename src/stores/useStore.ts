export const useStore = defineStore('a', () => {
  const counter = ref(0)

  return {
    counter,
  }
}, { persist: { debug: true } })
