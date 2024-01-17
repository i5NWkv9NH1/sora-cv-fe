import { isEmpty } from 'lodash-es'
import {
  VAppBar,
  VAvatar,
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VCol,
  VContainer,
  VDialog,
  VDivider,
  VFabTransition,
  VFadeTransition,
  VForm,
  VIcon,
  VList,
  VListItem,
  VRow,
  VScrollXTransition,
  VSelect,
  VSheet,
  VSlideXReverseTransition,
  VSlideXTransition,
  VSpacer,
  VStepper,
  VTab,
  VTabs,
  VTextField,
  VTextarea,
  VToolbar,
  VWindow,
  VWindowItem
} from 'vuetify/lib/components/index.mjs'
import { templateListData } from '~/data'
import type { ITemplate, IUIState, PreviewOption, ResumeTab } from '~/types'
import { UIStateEmpty, UIStateError } from '~/widgets'
import { ResumeFormWrapper2, ResumePreview, } from '~/widgets/Resume'

type IQuery = {
  templateId: string | number
}

export default defineComponent({
  async setup() {
    definePageMeta({ layout: 'editor' })

    //#region store
    const data = useDataStore()
    const user = useUserStore()
    const setting = usePreferencesStore()
    const uiState = ref<IUIState>('ok')
    //#endregion

    //#region
    const current = ref<ITemplate>()
    //#endregion

    //* tab
    //#region tab
    const tab = ref<number>(1)
    const tabs = ref<ResumeTab[]>()
    //#endregion
    //* 表格数据
    //#region 表格数据
    const gender = ref()
    const nations = ref()
    const maritals = ref()
    const dutys = ref()
    //#endregion
    //TODO
    //#region store
    //TODO 移动到Store
    const density = ref<null | 'default' | 'comfortable' | 'compact'>('compact')
    //#endregion

    //* 右侧预览数据
    //#region 右侧预览数据
    const previewSize = ref<'A4' | 'PHONE'>('A4')
    const previewSizeOptions = ref<PreviewOption[]>()
    //#endregion

    //! HOOK
    //#region HOOK
    watchEffect(() => {
      if (current.value) {
        useSeoMeta({
          title: `${current.value.title} · ${current.value.subtitle}`
        })
      }
    })
    //#endregion

    //! widgets
    //#region
    //#endregion

    function ResumeA4Preview() {
      return (
        <VRow>
          <VCol cols={12}>
            <VCard>
              {Array.from({ length: 20 }).map((_) => (
                <h1>1</h1>
              ))}
            </VCard>
          </VCol>
        </VRow>
      )
    }
    function ResumePhonePreview() {
      return (
        <VRow justify={'center'}>
          <VCol cols={6}>
            <VCard>
              {Array.from({ length: 20 }).map((_) => (
                <h1>1</h1>
              ))}
            </VCard>
          </VCol>
        </VRow>
      )
    }
    function ResumePreviewSizeWrapper() {
      switch (previewSize.value) {
        case 'A4':
          return <ResumeA4Preview />
        case 'PHONE':
          return <ResumePhonePreview />
        default:
          return <ResumeA4Preview />
      }
    }
    function ResumePreviewWrapper() {
      return (
        <>
          <VToolbar density={density.value} border={1}>
            {previewSizeOptions.value?.map((btn) => (
              <VBtn
                key={btn.id}
                //@ts-ignore
                onClick={() => {
                  previewSize.value = btn.value
                }}
                active={previewSize.value === btn.value}
                class={'mr-2'}
                variant={previewSize.value === btn.value ? 'tonal' : 'flat'}
                size={'small'}
              >
                <VIcon start>{btn.icon}</VIcon>
                <span>{btn.label}</span>
              </VBtn>
            ))}
          </VToolbar>
          <VSheet
            style={{
              maxHeight: `calc(100vh - 64px - 48px)`,
              overflowX: 'scroll'
            }}
            rounded={0}
            class={'preview'}
          >
            <VContainer>
              <VSlideXTransition>
                <ResumePreviewSizeWrapper />
              </VSlideXTransition>
            </VContainer>
          </VSheet>
        </>
      )
    }

    function ResumeWrapper() {
      return (
        //*
        <VRow  noGutters>
          <VCol cols={12} lg={5} md={5}>
            <ResumeFormWrapper2 />
          </VCol>
          <VCol cols={12} lg={7} md={7} class='hidden-xs'>
            <ResumePreview />
          </VCol>
        </VRow>
      )
    }



    watchEffect(() => {
      const route = useRoute()
      const query = route.query as IQuery

      if (isEmpty(query)) {
        current.value = data.state.defaultTemplate
      } else {
        const item = data.state.templateList.find(
          (item) =>
            item.id === query.templateId || item.id === +query.templateId
        )
        current.value = item
      }
      console.log(current.value)
    })

    return () => (
      <VContainer class={'pa-0 fill-height'} fluid>
        <ResumeWrapper />
      </VContainer>
    )
  }
})
