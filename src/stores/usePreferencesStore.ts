import { defineStore } from 'pinia'
import { useTheme } from 'vuetify/lib/framework.mjs'
import type { PreviewOption, PreviewSize, Density, DensityMode, Size, SizeMode, Theme, ThemeMode } from '~/types'



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
    const drawer = ref<boolean>(false)
    const density = ref<Density>('compact')
    const densityMode = ref<DensityMode[]>([
      { label: '默认', value: 'default' },
      { label: '舒适', value: 'comfortable' },
      { label: '紧凑', value: 'compact' },
    ])
    const densityHeight = computed(() => {
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
    const height = computed(() => {
      const value = densityHeight.value * 2
      return `calc(100vh - ${value + 4}px)`
    })

    const size = ref<Size>('default')
    const sizeMode = ref<SizeMode[]>([
      { label: '超小的', value: 'x-small' },
      { label: '小的', value: 'small' },
      { label: '默认', value: 'default' },
      { label: '大的', value: 'large' },
      { label: '超大的', value: 'x-large' },
    ])

    const theme = ref<Theme>('auto')
    const themeMode = ref<ThemeMode[]>([
      { label: '跟随系统', value: 'auto', icon: '' },
      { label: '亮色', value: 'light', icon: '' },
      { label: '暗色', value: 'dark', icon: '' },
    ])

    const flat = ref<boolean>(true)

    const previewSize = ref<PreviewSize>('A4')


    function toggleDrawer() {
      drawer.value = !drawer.value
    }
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
    return { alert, drawer, density, densityMode, size, sizeMode, theme, themeMode, height, toggleAlert, previewSize, updatePreviewSize, toggleDrawer, flat }
  },
  {
    persist: {
      debug: true
    }
  }
)
