import { defineStore } from 'pinia'
import { templateListData } from '~/data'
import { transformField, transformFields } from '~/helpers'
import type { AI, ColorMode, FAQ, IOrder, ITemplate, IUIState, Intro, PreviewSize, VIP } from '~/types'

//* fake data
import { faqsData, indexPageData, vipsData } from '~/data'

export interface EditorPageState {
  uiState: IUIState
  template: ITemplate | null | undefined
  picker: {
    color: string
    mode: ColorMode
  }
  modules: any[]
  previewSize: PreviewSize
  selectedTemplateId: ITemplate['id'] | undefined
  stepper: {
    status: boolean
    current: number
  }
  resume: {
    name: string
  }
}
export interface VIPPageState {
  vips: VIP[]
  faqs: FAQ[]
}
export interface IndexPageState {
  logo: string
  thumbnailUrl: string
  title: string
  subtitle: string
  caption: string
  intros: Intro[]
  templates: ITemplate[]
  ais: AI[]
}

export const useDataStore = defineStore(
  'data',
  () => {
    const state = reactive({
      orders: [
        {
          id: 'RC2024011610052101',
          name: '月度会员',
          createdAt: '2024-01-16 15:30:37',
          pay: 1,
          price: 18.0,
          status: 1,
        },
        {
          id: 'RC2024011610052102',
          name: '月度会员',
          createdAt: '2024-01-16 15:30:37',
          pay: 1,
          price: 18.0,
          status: 2,
        },
        {
          id: 'RC2024011610052103',
          name: '月度会员',
          createdAt: '2024-01-16 15:30:37',
          pay: 2,
          price: 18.0,
          status: 3,
        },
        {
          id: 'RC2024011610052104',
          name: '月度会员',
          createdAt: '2024-01-16 15:30:37',
          pay: 2,
          price: 18.0,
          status: 2,
        },
      ] as IOrder[],
      defaultTemplate: transformField(templateListData[0]),
      templateList: transformFields(templateListData),
    })
    const indexPageState = reactive<IndexPageState>({
      logo: indexPageData.logo,
      thumbnailUrl: indexPageData.thumbnailUrl,
      title: indexPageData.logo,
      subtitle: indexPageData.logo,
      caption: indexPageData.logo,
      intros: indexPageData.intros,
      templates: transformFields(indexPageData.templates),
      ais: indexPageData.ais,
    })
    const vipPageState = reactive<VIPPageState>({
      vips: vipsData,
      faqs: faqsData,
    })
    const creatorState = reactive({
      resumes: [],
      recycle: [],
      templates: [],
    })
    const editor = reactive<EditorPageState>({
      uiState: 'loading',
      template: null,
      picker: {
        color: '#dfdfdf',
        mode: 'hexa',
      },
      modules: [],
      previewSize: 'A4',
      selectedTemplateId: undefined,
      stepper: {
        status: false,
        current: 1,
      },
      resume: {
        name: '简约Nice的求职简历',
      },
    })

    function updateUiState(value: IUIState) {
      editor.uiState = value
    }

    return {
      state,
      indexPageState,
      vipPageState,
      editor,
      editorPageState: editor,
      updateUiState,
    }
  },
  {
    persist: {
      debug: true,
    },
  },
)
