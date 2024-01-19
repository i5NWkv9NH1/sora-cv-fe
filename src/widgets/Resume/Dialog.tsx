import {
  VCol,
  VContainer,
  VDialog,
  VRow,
} from 'vuetify/lib/components/index.mjs'
import { CreateTemplateStepper } from './Stepper'

export function CreateTemplateDiaglog() {
  const { editor } = storeToRefs(useDataStore())
  return (
    <VDialog
      v-model={editor.value.stepper.status}
      transition="slide-y-transition"
      fullscreen
    >
      {/* 全屏高度 + 垂直居中 */}
      <VContainer class="fill-height">
        <VRow>
          <VCol cols={12}>
            <CreateTemplateStepper />
          </VCol>
        </VRow>
      </VContainer>
    </VDialog>
  )
}

export function SortableDialog() {
  return <></>
}
