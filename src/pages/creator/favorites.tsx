import { VContainer } from 'vuetify/components'

export default defineComponent({
  setup() {
    useSeoMeta({ title: '收藏夹'})

    return() => (
      <VContainer>
          收藏夹
      </VContainer>
    )
  }
})