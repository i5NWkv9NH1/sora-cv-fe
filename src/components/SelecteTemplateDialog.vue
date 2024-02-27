<!--
  TODO：最大高度计算
 -->

<script setup lang="ts">
import type { Fanwen, Template } from '~/mocks'
import { mockFanwens, mockTemplates } from '~/mocks'

interface Props {
  modelValue?: boolean
  templates?: Template[]
  fanwens?: Fanwen[]
}

const props = withDefaults(defineProps<Props>(), { modelValue: false, templates: () => mockTemplates, fanwens: () => mockFanwens })
const emits = defineEmits(['update:modelValue'])

// * dialog
const dialog = ref(props.modelValue)
// * editor
const editor = ref(false)

// * stepper
const stepper = ref(1)
const steppers = ref(['选择模板', '选择范文'])
const selectedTemplate = ref(props.templates[0].id)
const selectedFanwen = ref(props.fanwens[0].id)

// * from parent to child
watch(() => props.modelValue, _ => dialog.value = props.modelValue)
// * from child to parent
watch(dialog, value => emits('update:modelValue', value))

function confirm() {
  dialog.value = false
  stepper.value = 1
}
</script>

<template>
  <VDialog v-model="dialog" fullsreen persistent transition="slide-y-transition" content-class="`fill-height fill-width`">
    <VContainer class="fill-height">
      <VStepper v-model="stepper" :items="steppers" next-text="下一步" prev-text="上一步" width="100%" mandatory>
        <template #actions>
          <VCardActions>
            <template v-if="stepper === 1">
              <VBtn @click="dialog = false" color="warning" variant="text" elevation="0" active>
                <VIcon start>
                  mdi-close
                </VIcon>
                <span>关闭</span>
              </VBtn>
              <VSpacer />
              <VBtn @click="stepper = 2">
                <VIcon start>
                  mdi-chevron-right
                </VIcon>
                <span>下一步</span>
              </VBtn>
            </template>
            <template v-else-if="stepper === 2">
              <VBtn @click="stepper = 1">
                <VIcon start>
                  mdi-chevron-left
                </VIcon>
                <span>上一步</span>
              </VBtn>
              <VSpacer />
              <VBtn @click="confirm" color="primary" variant="elevated">
                开始创建简历
              </VBtn>
            </template>
          </VCardActions>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.1 class="item.1">
          <QueryFilter />
          <QueryFilter />
          <VItemGroup v-model="selectedTemplate" mandatory>
            <VSheet :style="{ maxHeight: '400px', overflowY: 'scroll' }">
              <VRow>
                <VCol v-for="item in props.templates" :key="item.id" cols="12" lg="4" md="4" sm="6">
                  <VItem v-slot="{ isSelected, toggle }" :value="item.id">
                    <TemplateCardMini :is-selected="isSelected" :toggle="toggle" />
                  </VItem>
                </VCol>
              </VRow>
            </VSheet>
          </VItemGroup>
        </template>
        <template #item.2>
          <VItemGroup v-model="selectedFanwen" mandatory>
            <VRow>
              <VCol v-for="item in props.fanwens" :key="item.id" cols="12" lg="3" md="4" sm="4">
                <VItem v-slot="{ isSelected, toggle }" :value="item.id">
                  <FanwenCard
                    :is-selected="isSelected"
                    :toggle="toggle"
                    :item="item"
                  />
                </VItem>
              </VCol>
            </VRow>
          </VItemGroup>
        </template>
      </VStepper>
    </VContainer>
  </VDialog>
</template>
