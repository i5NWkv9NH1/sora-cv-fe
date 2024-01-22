import type { Density, Size } from '~/mocks'

export function useSettings() {
  const drawer = ref<boolean>(false)
  const density = ref<Density>('compact')
  const size = ref<Size>('default')

  return {
    density,
    drawer,
    size,
  }
}
