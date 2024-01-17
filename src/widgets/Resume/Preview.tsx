import type { SlotsType } from "vue"
import { renderSlot } from "vue"
import { VBtn, VCard, VContainer, VIcon, VSheet, VSkeletonLoader, VSlideXReverseTransition, VSlideXTransition, VSlideYTransition, VToolbar } from "vuetify/lib/components/index.mjs"
import { previewSizeOptionsData } from "~/data"
import type { IUIState, PreviewOption, PreviewSize } from "~/types"
import './Preview.scss'

//* A4
export function A4Preview() {
  return (
    <h1>A4</h1>
  )
}
//* PHONE
export function PhonePreview() {
  return (
    <h1>PHONE</h1>
  )
}

//* 工具栏
export const PreviewToolbar = defineComponent({
  setup() {
    const previewSizeOptions = ref<PreviewOption[]>()
    const uiState = ref<IUIState>('ok')
    previewSizeOptions.value = previewSizeOptionsData
    const { previewSize, density } = storeToRefs(usePreferencesStore())
    const { updatePreviewSize } = usePreferencesStore()

    function Ok() {
      return (
        <VToolbar
          density={density.value}
        >
          {previewSizeOptions.value!.map(item => {
            const isActive = computed(() => previewSize.value === item.value)
            return (
              <VBtn
                class={'mr-2'}
                key={item.id}
                variant={isActive.value ? 'tonal' : 'flat'}
                active={isActive.value}
                //@ts-ignore
                onClick={() => updatePreviewSize(item.value)}
              >
                {item.icon && <VIcon start>{item.icon}</VIcon>}
                <span>{item.label}</span>
              </VBtn>
            )
          })}
        </VToolbar>
      )
    }
    function Loadng() {
      return (
        <VSkeletonLoader type={'chip@4'} />
      )
    }

    return () => {
      switch (uiState.value) {
        case 'ok': return <Ok />
        case 'loading': return <Loadng />
        default: return <Loadng />
      }
    }
  }
})

//* 预览容器
//* 提供切换
//TODO 增加动画
export const PreviewSizeWrapper = defineComponent({
  setup() {
    const { height, previewSize } = storeToRefs(usePreferencesStore())
    const uiState = ref<IUIState>('ok')

    const Wrapper = (_: any, { slots }: { slots: SlotsType }) => (
      <VSheet
        class={'preview'}
        rounded={false}
        style={{
          overflow: 'scroll',
          minHeight: `calc(100vh - ${height.value * 2}px)`,
          maxHeight: `calc(100vh - ${height.value * 2}px)`
        }}
      >
        <VContainer>
          <VSlideYTransition>
            {renderSlot(slots, 'default')}
          </VSlideYTransition>
        </VContainer>
      </VSheet>
    )

    const Loading = () => <VSkeletonLoader type={'paragraph@6'} />

    return () => {
      switch (uiState.value) {
        default: return <Wrapper><Loading /></Wrapper>
        case 'loading': return <Wrapper><Loading /></Wrapper>
        case 'ok':
          switch (previewSize.value) {
            case 'A4':
              return <Wrapper>
                <A4Preview />
              </Wrapper>
            case 'PHONE':
              return <Wrapper>
                <PhonePreview />
              </Wrapper>
            default: <Wrapper>
              <A4Preview />
            </Wrapper>
          }
      }
    }
  }
})

//* 整体容器
export function ResumePreview() {
  return (
    <>
      <PreviewToolbar />
      <PreviewSizeWrapper />
    </>
  )

}
