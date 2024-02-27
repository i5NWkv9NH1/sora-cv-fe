<script setup lang="tsx">
import { VBtn, VCardActions, VSpacer } from 'vuetify/lib/components/index.mjs'
import { Btn } from '#components'

const dialog = ref(false)
const stepper = ref(1)
const items = ['选择模板', '选择范文']
function StepperActions() {
  async function reset() {
    dialog.value = false
    stepper.value = 1
  }

  switch (stepper.value) {
    case 1:
      return (
        <>
          <VSpacer />
          <Btn
            onClick={() => stepper.value = 2}
          >
            Next
          </Btn>
        </>
      )
    case 2:
      return (
        <>
          <Btn onClick={() => { stepper.value = 1 }}>Prev</Btn>
          <VSpacer />
          <Btn onClick={reset}>确认</Btn>
        </>
      )
  }
}
</script>

<template>
  <VContainer>
    <VBtn @click="dialog = true">
      打开
    </VBtn>
    <VDialog v-model="dialog" fullscreen transition="slide-y-transition">
      <VContainer>
        <VStepper v-model="stepper" :items="items" next-text="下一步" prev-text="上一步">
          <template #actions>
            <VCardActions>
              <StepperActions />
            </VCardActions>
          </template>
          <template #item.1>
            111
          </template>
          <template #item.2>
            2
          </template>
        </VStepper>
      </VContainer>
    </VDialog>
  </VContainer>
</template>

<style lang="scss" scoped></style>
