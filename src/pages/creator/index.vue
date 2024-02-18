<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import { delay } from '~/helpers'
import type { ViewStyle } from '~/mocks'

definePageMeta({ layout: 'creator' })
useSeoMeta({ title: '我的简历' })

// * 视图
const viewStyle = ref<ViewStyle>('Grid')
const { viewStyles } = usePreferencesStore()

const loading = ref(false)

// * store
const { findResumes, updateResumes, deleteResume } = useResumeStore()
const { resumes } = storeToRefs(useResumeStore())
const { toggleAlert } = usePreferencesStore()

// * 选择
const selectedResumes = ref<any[]>()
function unSelectAll() {
  selectedResumes.value = []
}
function selectAll() {
  selectedResumes.value = resumes.value
}

// #region Checkbox
const checkbox = computed(() => {
  if (!selectedResumes.value || !selectedResumes.value.length) {
    return {
      label: '选择全部',
      icon: 'mdi-checkbox-blank-outline',
      action: selectAll,
    }
  }
  if (selectedResumes.value.length === resumes.value.length) {
    return {
      label: '取消选择全部',
      icon: 'mdi-checkbox-outline',
      action: unSelectAll,
    }
  }
  return {
    label: `已选择${selectedResumes.value.length}项`,
    icon: 'mdi-minus-box-outline',
    action: unSelectAll,
  }
})
// #endregion

// * 切换视图时，取消所有选择
watch(viewStyle, () => selectedResumes.value = [])

// * 绑定按键
const { control, a } = useMagicKeys()
watchEffect(() => {
  if (control.value && a.value) {
    if (isEmpty(selectedResumes.value))
      selectAll()
    else
      unSelectAll()
  }
})

// * 分页
const currentPage = ref(1)
const pageSize = ref(10)
const totalPageSize = ref(3)
// * 分页请求
watch(currentPage, async () => {
  console.log('api:: 分页请求')
  loading.value = true
  await delay(2000)
  toggleAlert({ message: '请求成功', color: 'green', delay: 2000 })
  loading.value = false
})

// * SSR
// const { data } = await useFetch('', { query: { currentPage, pageSize }})
// updateResumes([])
</script>

<template>
  <!-- * Loading... -->
  <VDialog
    v-model="loading"
    fullscreen
  >
    <VProgressCircular indeterminate />
  </VDialog>

  <VContainer>
    <!-- * 视图选项 -->
    <VToolbar
      density="compact"
      color="transparent"
      class="mb-4"
    >
      <VBtn
        color="primary"
        size="large"
        variant="elevated"
        to="/editor"
        active
      >
        <VIcon start>
          mdi-plus
        </VIcon>
        <span>创建新的简历</span>
      </VBtn>
      <VSpacer />
      <VTooltip
        location="bottom center"
        v-for="item in viewStyles"
        :key="item.id"
      >
        <template #activator="{ props }">
          <!-- * 选择状态下 更改图标  -->
          <!-- ! 不解构 arg，有同命名的 props  -->
          <VBtn
            v-bind="props"
            :active="viewStyle === item.value"
            @click="viewStyle = item.value"
            class="mr-2"
            icon
          >
            <VIcon>{{ item.icon }}</VIcon>
          </VBtn>
        </template>
        <span>{{ item.label }}</span>
      </VTooltip>
    </VToolbar>

    <!-- * 工具栏 -->
    <VToolbar
      density="compact"
      color="transparent"
      class="mb-4"
    >
      <VTooltip location="bottom center">
        <template #activator="{ props }">
          <VBtn
            v-bind="props"
            class="mr-2"
            @click="checkbox.action"
          >
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
    <QueryPagination
      v-model="currentPage"
      :total-page-size="totalPageSize"
    />

    <!-- * 数据  -->
    <VSlideXTransition>
      <template v-if="viewStyle === 'Grid'">
        <VItemGroup
          v-model="selectedResumes"
          multiple
        >
          <VRow>
            <VItem
              v-for="resume in resumes"
              :value="resume"
              v-slot="{ isSelected, toggle }"
            >
              <VCol
                cols="12"
                lg="4"
                md="4"
                sm="6"
              >
                <MyResumeCard
                  :is-selected="isSelected"
                  :toggle="toggle"
                  @delete="deleteResume"
                  :item="resume"
                />
              </VCol>
            </VItem>
          </VRow>
        </VItemGroup>
      </template>
      <template v-else>
        <VItemGroup
          v-model="selectedResumes"
          multiple
        >
          <VRow>
            <VItem
              v-for="resume in resumes"
              :value="resume"
              v-slot="{ isSelected, toggle }"
            >
              <VCol cols="12">
                <VerticalResumeListItem
                  :is-selected="isSelected"
                  :toggle="toggle"
                  :item="resume"
                />
              </VCol>
            </VItem>
          </VRow>
        </VItemGroup>
      </template>
    </VSlideXTransition>
  </VContainer>
</template>
