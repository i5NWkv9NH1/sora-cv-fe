import { useDisplay } from 'vuetify/lib/framework.mjs'

export function useDevice() {
  const { platform } = useDisplay()
  const isMobile = computed(() => platform.value.touch)

  return {
    isMobile,
  }
}
