import type { SlotsType } from "vue"
import { renderSlot } from "vue"
import { VBtn, VCard, VContainer, VIcon, VSheet, VSkeletonLoader, VSlideXTransition, VToolbar } from "vuetify/lib/components/index.mjs"
import { previewSizeOptionsData } from "~/data"
import type { IUIState, PreviewOption, PreviewSize } from "~/types"
import './Preview.scss'

//* A4
export function A4Preview() {
  return (
    <>
      {Array.from({ length: 20 }).map(_ => <h1>1</h1>)}</>
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
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const density = ref<any>('default')
    const previewSizeOptions = ref<PreviewOption[]>()
    const uiState = ref<IUIState>('ok')
    previewSizeOptions.value = previewSizeOptionsData

    function Ok() {
      return (
        <VToolbar
          density={density.value}
        >
          {previewSizeOptions.value!.map(btn => {
            const isActive = computed(() => props.modelValue === btn.value)
            return (
              <VBtn
                //@ts-ignore
                onClick={() => {
                  console.log('from toolbar', btn.value)
                  emit('update:modelValue', btn.value)
                }}
                key={btn.id}
                active={isActive.value}
                variant={isActive.value ? 'tonal' : 'flat'}
              >
                {btn.icon && <VIcon start>{btn.icon}</VIcon>}
                <span>{btn.label}</span>
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
  props: ['previewSize'],
  setup(props) {
    const { height } = storeToRefs(usePreferencesStore())

    const { previewSize } = toRefs<{ previewSize: PreviewSize }>(props)
    const uiState = ref<IUIState>('ok')

    const Wrapper = (props: any, { slots }: { slots: SlotsType }) => (
      <VSheet
        class={'preview'}
        rounded={false}
        style={{
          overflow: 'scroll',
          minHeight: `calc(100vh - ${height.value * 2}px)`,
          maxHeight: `calc(100vh - ${height.value * 2}px)`
        }}
      >
        {renderSlot(slots, 'default')}
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
                <A4Preview />
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
  const previewSize = ref<PreviewSize>('A4')

  return (
    <>
      <PreviewToolbar v-model={previewSize.value} onUpdate:modelValue={(e: PreviewSize) => {
        console.log('ResumePreview', e)
        previewSize.value = e
      }} />
      <PreviewSizeWrapper previewSize={previewSize.value} />
    </>
  )

}
