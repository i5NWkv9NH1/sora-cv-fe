import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VCol,
  VIcon,
  VRow,
  VSpacer,
  VWindow,
  VWindowItem,
} from 'vuetify/components'

export function CreateTemplateStep1() {
  return (
    <VRow>
      {Array.from({ length: 10 }).map(_ => (
        <VCol>1</VCol>
      ))}
    </VRow>
  )
}
export function CreateTemplateStep2() {
  return (
    <VRow>
      {Array.from({ length: 10 }).map(_ => (
        <VCol>2</VCol>
      ))}
    </VRow>
  )
}

export function CreateTemplateStepper() {
  const { editor } = storeToRefs(useDataStore())
  const stepperActions = ref([
    { id: 1, label: '返回', icon: 'mdi-chevron-left', value: 1 },
    { component: true },
    { id: 2, label: '下一步', icon: 'mdi-chevron-right', value: 2 },
  ])

  return (
    <VCard>
      <VCardTitle>创建新的模板</VCardTitle>
      <VCardText>
        <VWindow v-model={editor.value.stepper.current}>
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
          if (item.component)
            return <VSpacer />

          const isActive = computed(
            () => editor.value.stepper.current === item.value,
          )

          return (
            <VBtn
              // @ts-expect-error
              onClick={() => {
                editor.value.stepper.current = item.value!
              }}
              disabled={isActive.value}
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
