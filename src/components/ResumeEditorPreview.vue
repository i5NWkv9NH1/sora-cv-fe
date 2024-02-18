<!--
  TODO：优化 loading
 -->
<script setup lang="ts">
import { v4 } from 'uuid'
import { type Density, type ResumePreviewSize, mockResumePreviewOptions } from '~/mocks'

interface Props {
  previewSize?: ResumePreviewSize
  loading?: boolean
  density?: Density
  selecteTemplateDialog?: boolean
  // * 排序绑定的数组
  items?: any[]
}
const props = withDefaults(defineProps<Props>(), {
  previewSize: 'A4',
  loading: false,
  density: 'compact',
  selecteTemplateDialog: false,
  items: () => [
    { id: v4(), color: 'red', title: 'A', value: 1 },
    { id: v4(), color: 'yellow', title: 'B', value: 2 },
    { id: v4(), color: 'blue', title: 'C', value: 3 },
    { id: v4(), color: 'green', title: 'D', value: 4 },
  ],
})
const emits = defineEmits(['update:selecteTemplateDialog', 'update:items'])
const previewOptions = ref(mockResumePreviewOptions)
const previewSize = ref<ResumePreviewSize>(previewOptions.value[0].value)
const { styles } = useScrollHeight({ density: props.density, padding: 0, fully: true })

const sortableDialog = ref(false)
const color = ref('#24292e')
const copyItem = ref(props.items)
watch(() => props.items, value => copyItem.value = props.items)
watch(copyItem, value => emits('update:items', value))
</script>

<template>
  <!-- * 添加 dialog -->
  <!-- <SortableListDialog v-model="sortableDialog" :items="modules" /> -->
  <SortableListDialog
    v-model="sortableDialog"
    v-model:items="copyItem"
  />

  <div class="tools">
    <!-- * 工具栏 -->
    <template v-if="props.loading">
      <VSkeletonLoader type="button@6" />
    </template>
    <template v-else>
      <VToolbar :density="props.density">
        <VSlideGroup
          show-arrows
          class="fill-width px-4"
        >
          <VBtn
            v-for="item in previewOptions"
            :key="item.id"
            class="mr-2"
            :variant="previewSize === item.value ? 'tonal' : 'flat'"
            :active="previewSize === item.value"
            @click="previewSize = item.value"
          >
            <VIcon
              v-if="item.icon"
              start
            >
              {{ item.icon }}
            </VIcon>
            <span>{{ item.label }}</span>
          </VBtn>
          <VSpacer />
          <!-- * dialog -->
          <VBtn
            @click="sortableDialog = true"
            :active="sortableDialog"
          >
            <VIcon start>
              mdi-sort-variant
            </VIcon>
            <span>修改模块位置</span>
          </VBtn>
          <!-- * menu -->
          <PickColor v-model:color="color" />

          <!-- * dialog -->
          <VBtn @click="$emit('update:selecteTemplateDialog', true)">
            <VIcon start>
              mdi-table
            </VIcon>
            <span>使用模板</span>
          </VBtn>
          <!-- TODO: loading -->
        </VSlideGroup>
      </VToolbar>
    </template>
  </div>

  <div class="content">
    <VSheet
      :style="styles"
      :rounded="0"
    >
      <VContainer>
        <!-- TODO: loading -->
        <!-- * A4 -->
        <template v-if="props.loading">
          <VSkeletonLoader type="image@5" />
        </template>
        <template v-else>
          <!-- TODO: transition -->
          <template v-if="previewSize === 'A4'">
            <VCard>A4</VCard>
          </template>

          <!-- * PHONE -->
          <template v-else>
            <VCard>PHONE</VCard>
          </template>
        </template>
      </VContainer>
    </VSheet>
  </div>
</template>
