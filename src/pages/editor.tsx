import { isEmpty } from 'lodash-es'
import { storeToRefs } from 'pinia'
import {
  VCol,
  VContainer,
  VRow
} from 'vuetify/lib/components/index.mjs'
import type { ITemplate } from '~/types'
import { ResumeForm, ResumePreview, } from '~/widgets/Resume'
import { CreateTemplateDiaglog } from '~/widgets/Resume/Dialog'

type IQuery = {
  templateId: string | number
}

export default defineComponent({
  async setup() {
    definePageMeta({ layout: 'editor' })
    //#region store
    const { editor, state } = storeToRefs(useDataStore())
    //#region
    const current = ref<ITemplate>()
    //#endregion

    //! HOOK
    //#region HOOK

    watchEffect(() => {
      const route = useRoute()
      const query = route.query as IQuery

      if (isEmpty(query)) {
        //* 创建新模板
        current.value = state.value.defaultTemplate
        //* 打开模板库
        editor.value.stepper.status = true
      } else {
        //* 请求模板数据
        const item = state.value.templateList.find(
          (item) =>
            item.id === query.templateId || item.id === +query.templateId
        )
        current.value = item
      }
      console.log(current.value)
      useSeoMeta({
        title: `${current.value!.title} · ${current.value!.subtitle}`
      })
    })

    function ResumeWrapper() {
      return (
        //*
        <VRow
          //* fix tabs no respoive on mobile
          class={'fill-width'}
          noGutters>
          <VCol cols={12} lg={5} md={5}>
            <ResumeForm />
          </VCol>
          <VCol cols={12} lg={7} md={7} class='hidden-xs'>
            <ResumePreview />
          </VCol>
        </VRow>
      )
    }


    return () => (
      <>
        <CreateTemplateDiaglog />
        <VContainer class={'pa-0 fill-height'} fluid>
          <ResumeWrapper />
        </VContainer>
      </>
    )
  }
})
