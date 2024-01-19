<!--
  * Exmaple
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
import type { PropType } from 'vue';
import type { TemplateCategory } from '~/mocks'
import type { Variant } from '~/types';
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

type Props = {
  modelValue?: number
  title?: string
  items?: TemplateCategory[]
  variant?: Variant
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  title: '示例 - 标签',
  items: () => [
    { id: 1, name: '标签 1', value: 1, icon: '' },
    { id: 2, name: '标签 2', value: 2, icon: '' },
  ],
  variant: 'text'
})
const emits = defineEmits(['update:modelValue'])
const selectedQuery = ref(props.modelValue)
watch(() => props.modelValue, (newModelValue) => {
  selectedQuery.value = newModelValue
})
watch(selectedQuery, (newQuery) => {
  console.log(`更新查询值 :: ${props.title} :: ${selectedQuery.value}`)
  emits('update:modelValue', newQuery)
})

console.log(props)
</script>

<template>
  <div>
    <div class="text-subtitle-1 mb-4">
      {{ title }}
    </div>
    <div class="d-flex">
      <VBtn v-for="query in items" :key="query.id" :active="selectedQuery === query.value"
        @click="selectedQuery = query.value" :variant="variant" class="mr-2">
        <VIcon v-if="query.icon">{{ query.icon }}</VIcon>
        <span>{{ query.name }}</span>
      </VBtn>
    </div>
  </div>
</template>
