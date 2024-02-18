import type { StyleValue } from 'vue'
import type { Density } from '~/mocks'

interface Options {
  density: Density
  padding: number
  fully?: boolean
}
// * 计算滚动高度
// * compact -> 112
export function useScrollHeight({ density, padding, fully }: Options) {
  const { isMobile } = useDevice()

  const densityHeight = computed(() => {
    switch (density) {
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

  const styles = computed<StyleValue>(() => {
    // * 16 -> padding
    const value = (densityHeight.value * 2) + padding
    if (isMobile.value)
      return {}
    return {
      overflowY: 'scroll',
      maxHeight: `calc(100vh - ${value}px)`,
      // minHeight: fully ? `calc(100vh - ${value}px)` : 'unset',
      height: fully ? `calc(100vh - ${value}px)` : 'unset',
    }
  })

  return { styles }
}
