<!--
  TODO：优化 loading
 -->

<!--
  * 可以给 button 禁用或者添加骨架屏
-->

<!--
  * example
import { QueryFilter } from '~/refator'
import { mockTemplateFilters, } from '~/mocks'
import type { TemplateQuery, TempateQueryKey, TemplateFilter } from '~/mocks'

// * your data
const filters = ref<TemplateFilter[]>()
const query = ref<TemplateQuery>({
  category: 1,
  date: 1,
  star: 1
})
watch(query, (newQuery) => {
  // * do updated
}, { deep: true })
</script>

<template>
  <VContainer>
    <template v-for="(item) in filters" :key="item.id">
      <QueryFilter v-model="(query[item.key])" :items="item.querys" :title="item.title" />
    </template>
  </VContainer>
</template>
 -->
<script setup lang="tsx">
import type { Category } from '~/mocks'
import { mockQueryTags } from '~/mocks'
import type { Variant } from '~/types'

// const props = defineProps({
//   // ? 查询值
//   modelValue: {
//     type: Number,
//     required: true
//   },
//   // ? 查询选项
//   items: {
//     type: Array as PropType<TemplateCategory[]>,
//     required: true
//   },
//   // ? 查询标题
//   title: {
//     type: String,
//     required: true
//   }
// })

interface Props {
  modelValue?: number
  bottom?: number
  title?: string
  items?: Category[]
  variant?: Variant
  // ? 数据加载时可禁用
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  bottom: 4,
  title: '标签：',
  items: () => mockQueryTags,
  variant: 'text',
  disabled: false,
})
const emits = defineEmits(['update:modelValue'])
const selectedQuery = ref(props.modelValue)
watch(() => props.modelValue, (newModelValue) => {
  selectedQuery.value = newModelValue
})
watch(selectedQuery, (newQuery) => {
  emits('update:modelValue', newQuery)
})
</script>

<template>
  <div :class="[`mb-${props.bottom}`]">
    <VRow align="baseline" no-gutters>
      <VCol lg="1" sm="2" cols="12">
        <div class="text-subtitle-1">
          {{ props.title }}
        </div>
      </VCol>

      <VCol lg="11" sm="10" cols="12">
        <VBtn
          v-for="query in items" :key="query.id" :active="selectedQuery === query.value" :variant="props.disabled ? 'outlined' : props.variant"
          class="mr-2" @click="selectedQuery = query.value" :disabled="props.disabled"
        >
          <VIcon v-if="query.icon">
            {{ query.icon }}
          </VIcon>
          <span>{{ query.name }}</span>
        </VBtn>
      </VCol>
    </VRow>
  </div>
</template>
