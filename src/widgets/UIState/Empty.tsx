import { defineComponent } from 'vue'
import { VCol, VImg, VRow } from 'vuetify/lib/components/index.mjs'

export const UIStateEmpty = defineComponent({
  setup() {
    const image = ref(
      'https://www.nicecv.cn/api/web/uploads/2023122814062323d033241.png'
    )
    return () => (
      <VRow align={'center'} justify={'center'} class={'fill-height'}>
        <VCol cols={12}>
          <div
            class={
              'd-flex flex-column align-center justify-center text-caption'
            }
          >
            <VImg src={image.value} width={'160'} />
            <span>暂无数据</span>
          </div>
        </VCol>
      </VRow>
    )
  }
})
