<script setup lang="ts">
import type { Density, ResumeEditorTab, Size } from '~/mocks'

interface Props {
  modelValue: number
  tabs: ResumeEditorTab[]
  density: Density
  size: Size
  loading: boolean
  windows: any[]
  tabIcon: boolean
}
const props = (defineProps<Props>())
const emits = defineEmits(['update:modelValue'])
const tab = ref<number>(props.modelValue)
// * tab items
watch(() => props.modelValue, () => tab.value = props.modelValue, { immediate: true })
watch(tab, value => emits('update:modelValue', value))

// * 滚动高度
const { styles } = useScrollHeight({ density: props.density, padding: 8, fully: true })
const { isMobile } = useDevice()
</script>

<template>
  <!-- * Tabs -->
  <!-- * Tabs 组件置顶 -->
  <div class="tab">
    <!-- ! 客户端渲染才能强制选中第一个标签 -->
    <!-- ! 设置宽度100vw适配移动端，避免溢出 -->
    <ClientOnly>
      <template v-if="props.loading">
        <VSkeletonLoader type="button@6" />
      </template>
      <template v-else>
        <VToolbar
          color="transparent"
          :density="density"
        >
          <VTabs
            v-model="tab"
            :density="props.density"
            :style="{
              maxWidth: isMobile ? '100vw' : 'unset',
            }"
            show-arrows
          >
            <VTab
              v-for="tab in props.tabs"
              :key="tab.value"
              :value="tab.value"
              :density="props.density"
              :size="props.size"
            >
              {{ tab.name }}
            </VTab>
          </VTabs>
        </VToolbar>
      </template>

      <template #fallback>
        <VSkeletonLoader type="button@4" />
      </template>
    </ClientOnly>
  </div>

  <!-- * TabItem   -->
  <div class="form">
    <!-- TODO: 计算固定高度 -->
    <VSheet
      :rounded="false"
      :style="styles"
      color="transparent"
    >
      <VWindow v-model="tab">
        <!-- ! 注意item绑定值与tab的值相对应 -->
        <!-- ! maxWidth: 100vw 解决移动端溢出 -->
        <VWindowItem
          v-for="(item, index) in tabs"
          :key="item.value"
          :value="item.value"
          :style="{ maxWidth: '100vw' }"
        >
          <template v-if="props.loading">
            <VSkeletonLoader type="list-item@15" />
          </template>
          <template v-else>
            <!-- * 动态组件 -->
            <ResolveComponent :component="item.component" />
          </template>
        </VWindowItem>
      </VWindow>
    </VSheet>
  </div>
  <!-- * items -->
  <!-- * 基本信息 -->
</template>
