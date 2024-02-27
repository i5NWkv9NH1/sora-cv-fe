<!--
  ! SSR/CLIENT
 -->
<!--
  * 首次SSR
  * 之后客户端查询分页
  * 使用状态切换
 -->
<!-- TODO: pagination and filter composable -->

<script setup lang="ts">
import { type Template, type UIState, mockTemplateFilters, mockTemplates } from '~/mocks'

useSeoMeta({ title: '简历模板' })

const routeQuery = useRoute().query
const filter = reactive({
  category: (routeQuery.category || 1) as number,
  date: (routeQuery.date || 1) as number,
  star: (routeQuery.date || 1) as number,
})
const pagination = reactive({
  currentPage: (routeQuery.currentPage || 1) as number,
  pageSize: routeQuery.pageSize || 10,
})
const filters = ref(mockTemplateFilters)
const templates = ref<Template[]>(mockTemplates)
const uiState = ref<UIState>('ok')
const disabled = computed(() => uiState.value === 'loading')

watch(pagination, () => console.log('page updated', pagination))
watch(filter, () => console.log('filter updated', filter))
</script>

<template>
  <VContainer>
    <!-- * 过滤器 -->
    <template v-for="item in filters">
      <QueryFilter v-model="filter[item.key]" :item="item" :disabled="disabled" />
    </template>
    <!-- * 分页 -->
    <QueryPagination v-model="pagination.currentPage" :disabled="disabled" />
    <!-- * 数据 -->
    <VSlideYTransition>
      <template v-if="disabled">
        <VSkeletonLoader type="card@1" />
      </template>
      <template v-else>
        <VRow>
          <VCol v-for="item in templates" :key="item.id" cols="4">
            <TemplateCard :item="item" />
          </VCol>
        </VRow>
      </template>
    </VSlideYTransition>
    <!-- * 分页数 -->
    <QueryPagination v-model="pagination.currentPage" :disabled="disabled" />
  </VContainer>
</template>
