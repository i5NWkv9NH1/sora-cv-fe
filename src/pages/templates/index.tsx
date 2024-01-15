import type { H3Error } from 'h3'
import {
  VBtn,
  VCard,
  VCardSubtitle,
  VCardTitle,
  VCol,
  VContainer,
  VIcon,
  VImg,
  VPagination,
  VRow,
  VSkeletonLoader
} from 'vuetify/lib/components/index.mjs'

type QueryKey = 'category' | 'date'

export default defineComponent({
  setup() {
    const items = ref<any[]>()
    const query = ref({
      category: 0,
      date: 0
    })
    const paginate = ref({
      currentPage: 1,
      pageSize: 9
    })
    const totalSize = computed(() => 5000)
    const totalPageSize = computed(() => Math.ceil(totalSize.value / 9))
    const uiState = ref<'ok' | 'loading' | 'empty' | 'error'>('loading')
    const loading = computed(() => uiState.value === 'loading')
    const filters = ref([
      {
        title: '分类',
        key: 'category',
        filters: [
          { name: '所有模板', value: 0, icon: '' },
          { name: '简约', value: 1, icon: '' },
          { name: '创意', value: 2, icon: '' },
          { name: '专业', value: 3, icon: '' },
          { name: '深色', value: 4, icon: '' }
        ]
      },
      {
        title: '日期',
        key: 'date',
        filters: [
          { name: '最新发布', value: 0, icon: '' },
          { name: '最早发布', value: 1, icon: '' }
        ]
      }
    ])

    async function fetchTemplates() {
      uiState.value = 'loading'
      console.log('query', query.value)
      console.log('paginate', paginate.value)
      const url = `http://jsonplaceholder.typicode.com/photos?_start=${
        paginate.value.currentPage - 1
      }&_limit=${paginate.value.pageSize}`
      const { data, error } = await useFetch<any[], H3Error>(url, {
        server: false
      })
      if (error.value) {
        uiState.value = 'error'
        return
      }
      if (!data.value) {
        uiState.value = 'empty'
        return
      }
      items.value = data.value
      uiState.value = 'ok'
    }

    watch(
      paginate,
      async () => {
        await fetchTemplates()
      },
      { immediate: true, deep: true }
    )
    watch(
      query,
      async () => {
        await fetchTemplates()
      },
      { immediate: false, deep: true }
    )
    useSeoMeta({ title: '所有模板' })

    function UIStateWrapper() {
      switch (uiState.value) {
        case 'error':
          return <div class={'text-h4 text-error'}>Error</div>
        case 'empty':
          return <div class={'text-h4 text-warning'}>Empty</div>
        case 'loading':
          return (
            <>
              {Array.from({ length: 9 }).map((_) => (
                <VCol cols={4}>
                  <VSkeletonLoader type={'card'} />
                </VCol>
              ))}
            </>
          )
        case 'ok':
          return (
            <>
              {items.value?.map((item) => (
                <VCol cols={4}>
                  <VCard to={`/templates/${item.id}`}>
                    <VImg src={item.thumbnailUrl} />
                    <VCardTitle>{item.title}</VCardTitle>
                    <VCardSubtitle>
                      id: {item.id}, album id: {item.albumId}
                    </VCardSubtitle>
                  </VCard>
                </VCol>
              ))}
            </>
          )
        default:
          return <></>
      }
    }

    function FilterWrapper() {
      return (
        <>
          {filters.value.map((item) => (
            <VRow align={'center'}>
              <div class={'text-subtitle-1 ml-4'}> {item.title}：</div>
              <VCol cols={12}>
                {item.filters.map((filter) => (
                  <VBtn
                    //@ts-ignore
                    onClick={() => {
                      //@ts-ignore
                      query.value[item.key] = filter.value
                    }}
                    class={'mr-2'}
                    variant={'text'}
                    //@ts-ignore
                    active={query.value[item.key] === filter.value}
                  >
                    {filter.icon && <VIcon start>{filter.icon}</VIcon>}
                    <span>{filter.name}</span>
                  </VBtn>
                ))}
              </VCol>
            </VRow>
          ))}
        </>
      )
    }

    function Pagination() {
      return (
        <VRow>
          <VCol>
            <VPagination
              v-model={paginate.value.currentPage}
              length={totalPageSize.value}
              totalVisible={9}
              onUpdate:modelValue={(value) => {
                paginate.value.currentPage = value
              }}
              disabled={loading.value}
            />
          </VCol>
        </VRow>
      )
    }

    return () => (
      <VContainer style={{ gap: '2rem' }}>
        <FilterWrapper />
        <Pagination />
        <VRow>
          <UIStateWrapper />
        </VRow>
        <Pagination />
      </VContainer>
    )
  }
})
