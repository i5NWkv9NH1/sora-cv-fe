import {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VCol,
  VColorPicker,
  VContainer,
  VDialog,
  VIcon,
  VMenu,
  VRow,
  VSelect,
  VSheet,
  VSpacer,
  VWindow,
  VWindowItem
} from 'vuetify/lib/components/index.mjs'
import type { ColorMode } from '~/stores'

export function CreateTemplateStep1() {
  return (
    <VRow>
      {Array.from({ length: 10 }).map((_) => (
        <VCol>1</VCol>
      ))}
    </VRow>
  )
}
export function CreateTemplateStep2() {
  return (
    <VRow>
      {Array.from({ length: 10 }).map((_) => (
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
    { id: 2, label: '下一步', icon: 'mdi-chevron-right', value: 2 }
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
          if (item.component) {
            return <VSpacer />
          }
          const isActive = computed(() => editor.value.stepper.current === item.value)

          return (
            <VBtn
              //@ts-ignore
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

export function CreateTemplateDiaglog() {
  const { editor } = storeToRefs(useDataStore())
  return (
    <VDialog
      v-model={editor.value.stepper.status}
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


export function PickColorMenu() {
  const { editor } = storeToRefs(useDataStore())
  const modes = ref<ColorMode[]>(['hsla', 'rgba', 'hexa'])

  return (
    <VMenu
      offset={10}
      transition={'slide-y-transition'}
      closeOnContentClick={false}
      v-slots={{
        default: () => (
          <VSheet class={'pa-4'} >
            <VColorPicker
              v-model={editor.value.picker.color}
              mode={editor.value.picker.mode}
              showSwatches
            />
            <VSelect
              class={'mt-4'}
              v-model={editor.value.picker.mode}
              items={modes.value}
              density={'compact'}
              variant={'solo'}
              label={'颜色输出格式'}
              rounded={'lg'}
              eager
              hideDetails
              hideNoData
              hideSpinButtons
            />
          </VSheet>
        ),
        activator: ({ props, isActive }) =>
          <VBtn
            {...props}
            variant={'text'}
          >
            <VIcon color={editor.value.picker.color} start>mdi-palette</VIcon>
            <span>修改主题色</span>
          </VBtn>
      }}
    />
  )
}


export function SortableDialog() {
  return <></>
}
