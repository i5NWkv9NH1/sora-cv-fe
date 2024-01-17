import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VCol,
  VContainer,
  VDialog,
  VIcon,
  VRow,
  VSpacer,
  VWindow,
  VWindowItem
} from 'vuetify/lib/components/index.mjs'

export const CreateTemplateStep1 = defineComponent({
  setup(props, ctx) {
    return () => (
      <VRow>
        {Array.from({ length: 10 }).map((_) => (
          <VCol>1</VCol>
        ))}
      </VRow>
    )
  }
})
export const CreateTemplateStep2 = defineComponent({
  setup(props, ctx) {
    return () => (
      <VRow>
        {Array.from({ length: 10 }).map((_) => (
          <VCol>2</VCol>
        ))}
      </VRow>
    )
  }
})

export const CreateTemplateStepper = defineComponent({
  setup(props, ctx) {
    const step = ref(1)
    const stepperActions = ref([
      { id: 1, label: '下一步', icon: '', value: 1 },
      { component: true },
      { id: 2, label: '返回', icon: '', value: 2 }
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
        <VCardActions>
          {stepperActions.value.map((item) => {
            if (item.component) {
              return <VSpacer />
            }
            const isActive = computed(() => step.value === item.value)

            return (
              <VBtn
                //@ts-ignore
                onClick={() => {
                  step.value = item.value!
                }}
                disabled={!isActive.value}
                variant={isActive ? 'tonal' : 'flat'}
              >
                {item.icon && <VIcon start>{item.icon}</VIcon>}
                <span>{item.label}</span>
              </VBtn>
            )
          })}
        </VCardActions>
      </VCard>
    )
  }
})

export const CreateTemplateDiaglog = defineComponent({
  setup(props, ctx) {
    const dialog = ref(false)
    return () => (
      <VDialog
        v-model={dialog.value}
        transition={'slide-y-transition'}
        fullscreen
      >
        {/* 全屏高度 + 垂直居中 */}
        <VContainer class={'fill-height'}>
          <VRow>
            <VCol cols={12}>
              <CreateTemplateStepper />
            </VCol>
          </VRow>
        </VContainer>
      </VDialog>
    )
  }
})
