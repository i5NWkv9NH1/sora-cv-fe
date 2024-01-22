<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import type { UIState } from '~/mocks'

// * data
import { ResumeEditorTab, mockResumeEditorTabs } from '~/mocks'

definePageMeta({ layout: 'editor' })

// * composables
const { density, size } = useSettings()
const uiState = ref<UIState>('loading')
// * state
// TODO: use loading ref
const loading = computed(() => uiState.value === 'loading')
const query = useRoute().query
// * dialog
const selecteTemplateDialog = ref(false)
// * tab
const tabs = ref<ResumeEditorTab[]>(mockResumeEditorTabs)
const tab = ref(0)

watchEffect(() => {
  // * 创建新简历
  if ((isEmpty(query))) {
    uiState.value = 'loading'
    selecteTemplateDialog.value = true
  }
  // * 使用已有模板
  // * 获取简历数据...
  else {
  }
})

watch(selecteTemplateDialog, (newValue) => {
  // * 打开状态
  if (newValue)
    uiState.value = 'loading'

  // * 关闭状态
  else
    uiState.value = 'ok'
}, { immediate: true })
</script>

<template>
  <!-- * 创建新的模板 -->
  <SelecteTemplateDialog v-model="selecteTemplateDialog" />
  <VContainer class="fill-height fill-width pa-0" fluid>
    <VRow class="fill-height" no-gutters>
      <VCol cols="12" lg="5" md="5">
        <!-- * Tabs + 表单 -->
        <!-- <ResumeEditorTab v-model="tab" :tabs="tabs" :windows="[]" :density="density" :size="size" :loading="loading"  /> -->
        <ResumeEditorTab v-model="tab" :tabs="tabs" :density="density" :size="size" :loading="loading" />
      </VCol>
      <VCol cols="12" lg="7" md="7" class="hidden-xs">
        <!-- * 预览 -->
        <ResumeEditorPreview
          :density="density" :loading="loading" v-model:selecte-template-dialog="selecteTemplateDialog"
          v-model:items="tabs"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
