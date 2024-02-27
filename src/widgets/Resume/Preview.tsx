import type { Component, SlotsType } from 'vue'
import { renderSlot } from 'vue'
import { VBtn, VCard, VCol, VContainer, VIcon, VRow, VSheet, VSkeletonLoader, VSlideXTransition, VSpacer, VToolbar } from 'vuetify/components'
import { SortableList } from './Module'
import { previewSizeOptionsData } from '~/data'
import type { IUIState, PreviewOption } from '~/types'
import { ClientOnly } from '#components'
import './Preview.scss'
import { PickColorMenu } from './Toolbar'

//* A4
export function A4Preview() {
  return (
    <VRow>
      <VCol cols={12}>
        {/* <VCard rounded={false}>
          {Array.from({ length: 20 }).map((_) => (
            <h1>1</h1>
          ))}
        </VCard> */}
        <ClientOnly>
          <SortableList />
        </ClientOnly>
      </VCol>
    </VRow>
  )
}
//* PHONE
export function PhonePreview() {
  return (
    <VRow justify="center">
      <VCol cols={6}>
        <VCard rounded={false}>
          {Array.from({ length: 20 }).map(_ => (
            <h1>1</h1>
          ))}
        </VCard>
      </VCol>
    </VRow>
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
    const toolbarDialogs = ref<Component[]>([
      PickColorMenu,
    ])

    function Ok() {
      return (
        <VToolbar
          density={density.value}
        >
          {previewSizeOptions.value!.map((item) => {
            const isActive = computed(() => previewSize.value === item.value)
            return (
              <VBtn
                class="mr-2"
                key={item.id}
                variant={isActive.value ? 'tonal' : 'flat'}
                active={isActive.value}
                // @ts-expect-error
                onClick={() => updatePreviewSize(item.value)}
              >
                {item.icon && <VIcon start>{item.icon}</VIcon>}
                <span>{item.label}</span>
              </VBtn>
            )
          })}
          <VSpacer />
          {toolbarDialogs.value.map(item => (
            <item />
          ))}
        </VToolbar>
      )
    }
    function Loading() {
      return (
        <VSkeletonLoader type="chip@4" />
      )
    }

    return () => {
      switch (uiState.value) {
        case 'ok': return <Ok />
        case 'loading': return <Loading />
        default: return <Loading />
      }
    }
  },
})

//* 预览容器
//* 提供切换
// TODO 增加动画
export const PreviewSizeWrapper = defineComponent({
  setup() {
    const { height, previewSize } = storeToRefs(usePreferencesStore())
    const uiState = ref<IUIState>('ok')
    const previewEl = ref<HTMLElement>()
    //*

    const Wrapper = (_: any, { slots }: { slots: SlotsType }) => (
      <VSheet
        class="preview"
        rounded={false}
        style={{
          overflow: 'scroll',
          height: height.value,
          maxHeight: height.value,
        }}
        ref={previewEl}
      >
        <VContainer>
          <VSlideXTransition>
            {renderSlot(slots, 'default')}
          </VSlideXTransition>
        </VContainer>
      </VSheet>
    )

    const Loading = () => <VSkeletonLoader type="paragraph@6" />

    return () => {
      switch (uiState.value) {
        case 'loading': return <Wrapper><Loading /></Wrapper>
        case 'ok':
          switch (previewSize.value) {
            case 'A4':
              return (
                <Wrapper>
                  <A4Preview />
                </Wrapper>
              )
            case 'PHONE':
              return (
                <Wrapper>
                  <PhonePreview />
                </Wrapper>
              )
            default: <Wrapper>
              <A4Preview />
                     </Wrapper>
          }
      }
    }
  },
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
