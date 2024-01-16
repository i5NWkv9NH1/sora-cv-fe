import { VContainer } from 'vuetify/components'

export default defineComponent({
  setup() {
    useSeoMeta({ title: '简历中心'})

    return() => (
      <VContainer>
          简历中心
      </VContainer>
    )
  }
})