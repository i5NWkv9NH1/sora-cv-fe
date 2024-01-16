import { VContainer } from 'vuetify/components'

export default defineComponent({
  setup() {
    useSeoMeta({ title: '回收站'})

    return() => (
      <VContainer>
          回收站
      </VContainer>
    )
  }
})