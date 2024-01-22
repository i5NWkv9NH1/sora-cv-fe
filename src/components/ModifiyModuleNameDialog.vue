<!--
  * 修改 tab 模块的名字
 -->

<script setup lang="ts">
import { mockModifyModulePreset } from '~/mocks'

interface Props {
  modelValue?: boolean
  // * 推荐的名字
  items?: any[]
  title?: string
  name?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: true,
  items: () => mockModifyModulePreset,
  title: '修改模块名称',
  name: '实习经历',
})
const emits = defineEmits(['update:modelValue', 'update:name'])
const dialog = ref<boolean>(props.modelValue)
const name = ref<string>(props.name)
watch(() => props.modelValue, () => dialog.value = props.modelValue)
watch(() => props.name, () => name.value = props.name)
watch(dialog, () => emits('update:modelValue', dialog.value))
watch(name, () => emits('update:name', name.value))

function handleConfirm() {
  dialog.value = false
}
function handleChangePreset(value: string) {
  name.value = value
}
</script>

<template>
  <VDialog
    v-model="dialog"
    transition="slide-y-transition"
    fullscreen
    persistent
  >
    <VContainer class="fill-height">
      <VRow class="fill-width" justify="center">
        <VCol cols="12" lg="6" md="8" sm="8">
          <VCard>
            <VCardTitle>
              <div class="d-flex align-center">
                <VIcon start>
                  mdi-pencil-outline
                </VIcon>
                <div>{{ props.title }}</div>
                <VSpacer />
                <VBtn @click="dialog = false" variant="text" icon>
                  <VIcon>mdi-close</VIcon>
                </VBtn>
              </div>
            </VCardTitle>

            <VCardText>
              <div>
                <VTextField v-model="name" hide-details variant="outlined" clearable label="模块名" />
                <div class="d-flex flex-wrap mt-4 gap-2">
                  <VBtn v-for="preset in props.items" :key="preset.id" @click="handleChangePreset(preset.name)" :variant="name === preset.name ? 'tonal' : 'text'" :active="name === preset.name" :color="name === preset.name ? 'primary' : 'default'">
                    {{ preset.name }}
                  </VBtn>
                </div>
              </div>
            </VCardText>

            <VCardActions>
              <VSpacer />
              <VBtn @click="handleConfirm" color="primary" elevation="0" active>
                确定
              </VBtn>
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VDialog>
</template>
