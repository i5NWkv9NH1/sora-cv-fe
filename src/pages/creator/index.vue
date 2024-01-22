<!--
  TODO 添加视图切换
  TODO 添加分页
  TODO 添加 UIState
 -->
<script setup lang="tsx">
import type { Template, ViewStyle } from '~/mocks'
import { mockTemplates, mocksViewStyles } from '~/mocks'

definePageMeta({ layout: 'creator' })

// * 视图
const viewStyle = ref<ViewStyle>('Grid')
const viewStyles = ref(mocksViewStyles)
const uiState = ref('loading')

// * 数据
const selectedTemplates = ref<Template[]>()
// ? 先使用假数据
const templates = ref<Template[]>(mockTemplates)
function unSelectAll() {
  selectedTemplates.value = []
}
function selectAll() {
  selectedTemplates.value = templates.value
}
const checkbox = computed(() => {
  if (!selectedTemplates.value || !selectedTemplates.value.length) {
    return {
      label: '选择全部',
      icon: 'mdi-checkbox-blank-outline',
      action: selectAll,
    }
  }
  if (selectedTemplates.value.length === templates.value.length) {
    return {
      label: '取消选择全部',
      icon: 'mdi-checkbox-outline',
      action: unSelectAll,
    }
  }
  return {
    label: `已选择${selectedTemplates.value.length}项`,
    icon: 'mdi-minus-box-outline',
    action: unSelectAll,
  }
})
// * 切换视图时，取消所有选择
watch(viewStyle, () => selectedTemplates.value = [])

// * 分页
const currentPage = ref(1)
const pageSize = ref(10)
// * 分页请求
async function fetchTemplates() { }
// * 第一次请求 SSR
useSeoMeta({ title: '我的简历' })
</script>

<template>
  <VContainer>
    <!-- * 视图选项 -->
    <VToolbar density="compact" color="transparent" class="mb-4">
      <VBtn color="primary" size="large" variant="elevated" to="/editor" active>
        <VIcon start>
          mdi-plus
        </VIcon>
        <span>创建新的简历</span>
      </VBtn>
      <VSpacer />
      <VTooltip location="bottom center" v-for="item in viewStyles" :key="item.id">
        <template #activator="{ props }">
          <!-- * 选择状态下 更改图标  -->
          <!-- ! 不解构 arg，有同命名的 props  -->
          <VBtn v-bind="props" :active="viewStyle === item.value" @click="viewStyle = item.value" class="mr-2" icon>
            <VIcon>{{ item.icon }}</VIcon>
          </VBtn>
        </template>
        <span>{{ item.label }}</span>
      </VTooltip>
    </VToolbar>

    <!-- * 工具栏 -->
    <VToolbar density="compact" color="transparent" class="mb-4">
      <VTooltip location="bottom center">
        <template #activator="{ props }">
          <VBtn v-bind="props" class="mr-2" @click="checkbox.action">
            <VIcon start>
              {{ checkbox.icon }}
            </VIcon>
            <span>{{ checkbox.label }}</span>
          </VBtn>
        </template>
        <span>批量处理简历</span>
      </VTooltip>
    </VToolbar>

    <!-- * 分页 -->

    <!-- * 数据  -->
    <!-- TODO 添加视图切换 -->
    <VSlideXTransition>
      <template v-if="viewStyle === 'Grid'">
        <VItemGroup v-model="selectedTemplates" multiple>
          <VRow>
            <VItem v-for="template in templates" :value="template" v-slot="{ isSelected, toggle }">
              <VCol cols="12" lg="4" md="4" sm="6">
                <MyResumeCard :is-selected="isSelected" :toggle="toggle" />
              </VCol>
            </VItem>
          </VRow>
        </VItemGroup>
      </template>
      <template v-else>
        <VItemGroup v-model="selectedTemplates" multiple>
          <VRow>
            <VItem v-for="template in templates" :value="template" v-slot="{ isSelected, toggle }">
              <VCol cols="12">
                <MyResumeCard :is-selected="isSelected" :toggle="toggle" />
              </VCol>
            </VItem>
          </VRow>
        </VItemGroup>
      </template>
    </VSlideXTransition>
  </VContainer>
</template>
