import {
  VBtn,
  VCard,
  VCardTitle,
  VCol,
  VContainer,
  VExpandTransition,
  VFabTransition,
  VFadeTransition,
  VIcon,
  VRow,
  VScaleTransition,
  VSkeletonLoader,
  VSlideXTransition,
  VSlideYReverseTransition,
  VSlideYTransition,
  VSpacer,
  VToolbar,
  VToolbarItems,
  VTooltip
} from 'vuetify/lib/components/index.mjs'
import type { IUIState } from '~/types'

export default defineComponent({
  setup() {
    useSeoMeta({ title: '我的简历' })
    const userStore = useUserStore()
    const settingsStore = usePreferencesStore()
    const items = ref(Array.from({ length: 10 }))
    const viewStyle = ref<'grid' | 'list'>('grid')
    const uiState = ref<IUIState>('loading')
    const isSelectedAll = ref(false)
    const toolbarActions = ref([
      { id: 1, name: '选择', icon: 'mdi-select', action: () => {} },
      { id: 2, name: '网格', icon: 'mdi-select', action: () => {} },
      { id: 3, name: '列表', icon: 'mdi-select', action: () => {} }
    ])

    function Toolbar() {
      return (
        <VToolbar density={'compact'} color={'transparent'}>
          <VBtn
            //@ts-ignore
            onClick={() => {
              viewStyle.value = 'list'
            }}
            active={viewStyle.value === 'list'}
          >
            <VIcon>mdi-format-list-bulleted</VIcon>
          </VBtn>
          <VBtn
            //@ts-ignore
            onClick={() => {
              viewStyle.value = 'grid'
            }}
            active={viewStyle.value === 'grid'}
          >
            <VIcon>mdi-grid-large</VIcon>
          </VBtn>
        </VToolbar>
      )
    }
    function Card({ title }: { title: string }) {
      return (
        <VCard>
          <VIcon>mdi-select</VIcon>
          <VCardTitle>{title}</VCardTitle>
        </VCard>
      )
    }
    function GridWrapper() {
      return (
        <VRow>
          {items.value.map((item) => (
            <VCol cols={4}>
              <Card title={'1'} />
            </VCol>
          ))}
        </VRow>
      )
    }
    function ListWrap() {
      return (
        <VRow>
          {items.value.map((item) => (
            <VCol cols={12}>
              <Card title={'1'} />
            </VCol>
          ))}
        </VRow>
      )
    }

    function ViewStyleWrapper() {
      switch (viewStyle.value) {
        case 'grid':
          return <GridWrapper />
        case 'list':
          return <ListWrap />
        default:
          return <></>
      }
    }

    return () => (
      <VContainer>
        <Toolbar />
        <ViewStyleWrapper />
      </VContainer>
    )
  }
})
