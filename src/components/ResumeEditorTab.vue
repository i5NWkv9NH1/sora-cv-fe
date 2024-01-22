<!--
  TODO：添加tab子项
 -->
<script setup lang="ts">
import { mockResumeEditorTabs } from '~/mocks'
import type { Density, ResumeEditorTab, Size } from '~/mocks'

interface Props {
  modelValue?: number | string
  tabs?: ResumeEditorTab[]
  density?: Density
  size?: Size
  loading?: boolean
  windows?: any[]
  tabIcon?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: mockResumeEditorTabs[0].value,
  tabs: () => mockResumeEditorTabs,
  density: 'default',
  size: 'small',
  loading: false,
  windows: () => [1, 1, 1, 1, 1, 1],
  tabIcon: false,
})
const emits = defineEmits(['update:modelValue'])
const tab = ref<number | string>(props.modelValue)
// * tab items
watch(() => props.modelValue, () => tab.value = props.modelValue)
watch(tab, value => emits('update:modelValue', value))

// * 滚动高度
const { styles } = useScrollHeight({ density: props.density, padding: 8, fully: true })
</script>

<template>
  <!-- * Tabs -->
  <!-- * Tabs 组件置顶 -->
  <VFadeTransition>
    <template v-if="props.loading">
      <!-- TODO: loading -->
      loading...
    </template>
    <template v-else>
      <VContainer class="pa-2">
        <VTabs v-model="tab" :density="props.density" show-arrows>
          <VSlideXTransition group>
            <VTab v-for="tab in props.tabs" :key="tab.id" :value="tab.value" :density="props.density" :size="props.size">
              {{ tab.name }}
            </VTab>
          </VSlideXTransition>
        </VTabs>
      </VContainer>
    </template>
  </VFadeTransition>

  <!-- * TabItem   -->
  <VFadeTransition>
    <template v-if="props.loading">
      <VSkeletonLoader tpye="paragraph@6" />
    </template>
    <template v-else>
      <!-- TODO: 计算固定高度 -->
      <VSheet :rounded="false" :style="styles">
        <VWindow v-model="tab">
          <!-- ! 注意item绑定值与tab的值相对应 -->
          <VWindowItem v-for="(item, index) in tabs" :key="item.value" :value="item.value">
            <template v-if="item.component">
              <!-- * 动态组件 -->
              <!-- <ResolveComponent :component="item.component" /> -->
              <FormTest />
            </template>
            <template v-else>
              {{ item }}
            </template>
          </VWindowItem>
          <!-- <VWindowItem v-for="window in props.windows" :key="window">
            <h1 v-for="i in 20" :key="i">
              {{ window }}
            </h1>
          </VWindowItem> -->
        </VWindow>
      </VSheet>
    </template>
  </VFadeTransition>
  <!-- * items -->
  <!-- * 基本信息 -->
</template>
