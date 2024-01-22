import { VBtn, VContainer } from 'vuetify/lib/components/index.mjs'
import { ModifiyModuleNameDialog } from '#components'

export default defineComponent({
  setup() {
    const dialog = ref(false)
    const name = ref('实习经历')
    return () => (

      <VContainer fluid>
        <VBtn
        // @ts-expect-error
          onClick={() => { dialog.value = true }}
        >
          Button
        </VBtn>
        <ModifiyModuleNameDialog v-model:modelValue={dialog.value} v-model:name={name.value} />
        1
      </VContainer>
    )
  },
})
