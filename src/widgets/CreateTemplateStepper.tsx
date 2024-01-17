import {
  VCard,
  VCardText,
  VWindow,
  VWindowItem
} from 'vuetify/lib/components/index.mjs'
import { CreateTemplateStep1, CreateTemplateStep2 } from './Temporary'

export const CreateTemplateStepper = defineComponent({
  setup(props, ctx) {
    const step = ref(1)
    const stepperActions = ref([
      { id: 1, label: '下一步', icon: '', action: () => {} },
      { id: 2, label: '返回', icon: '', action: () => {} }
    ])

    return () => (
      <VCard>
        <VCardTitle>创建新的模板</VCardTitle>
        <VCardText>
          <VWindow v-model={step.value}>
            <VWindowItem value={1}>
              <CreateTemplateStep1 />
            </VWindowItem>
            <VWindowItem value={2}>
              <CreateTemplateStep2 />
            </VWindowItem>
          </VWindow>
        </VCardText>
        <VCardActions></VCardActions>
      </VCard>
    )
  }
})
