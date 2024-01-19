
import { useDisplay } from 'vuetify'
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
import { templateListData } from '~/data'
import type { IUIState } from '~/types'
import { UIStateEmpty, UIStateError } from '~/widgets'
import { VTemplate } from '#components'

type QueryKey = 'category' | 'date'

export default defineComponent({
  setup() {
    useSeoMeta({ title: '所有模板' })

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
    const uiState = ref<IUIState>('ok')
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
    const totalVisible = computed(() => {
      const { mobile } = useDisplay()
      console.log(mobile.value)
      if (mobile.value) return 4
      return 9
    })

    async function fetchTemplates() {
      // uiState.value = 'loading'
      console.log('query', query.value)
      console.log('paginate', paginate.value)
      // const url = `http://jsonplaceholder.typicode.com/photos?_start=${
      //   paginate.value.currentPage - 1
      // }&_limit=${paginate.value.pageSize}`
      // const { data, error } = await useFetch<any[], H3Error>(url, {
      //   server: false
      // })
      // if (error.value) {
      //   uiState.value = 'error'
      //   return
      // }
      // if (!data.value) {
      //   uiState.value = 'empty'
      //   return
      // }
      // items.value = data.value

      // await delay(2000)
      items.value = templateListData
      // uiState.value = 'ok'
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

    function UIStateWrapper() {
      switch (uiState.value) {
        case 'error':
          return <UIStateError />
        case 'empty':
          return <UIStateEmpty />
        case 'loading':
          return (
            <>
              {Array.from({ length: 9 }).map((_) => (
                <VCol cols={12} lg={4} md={4} sm={6}>
                  <VSkeletonLoader type={'image, card'} />
                </VCol>
              ))}
            </>
          )
        case 'ok':
          return (
            <>
              {items.value?.map((item) => {
                const tags = item.style_category.map((_tag: any) => {
                  return {
                    id: _tag.category,
                    name: _tag.name
                  }
                })
                const _item = {
                  id: item.goods_id,
                  title: item.goods_name,
                  description: item.selling_point,
                  tags,
                  thumbnailUrl: item.goods_image
                }
                return (
                  <VCol cols={12} lg={4} md={4} sm={6}>
                    {/*@ts-ignore*/}
                    <VTemplate item={_item} key={_item.id} />
                    {/*@ts-ignore*/}
                  </VCol>
                )
              })}
            </>
          )
        default:
          return (
            <>
              <div class={'text-h4'}>Templates</div>
            </>
          )
      }
    }

    function FilterWrapper() {
      return (
        <>
          {/*@ts-ignore*/}
          <LazyClientOnly>
            <div class={'d-flex flex-column mt-4'} style={{ gap: '1rem' }}>
              {filters.value.map((item) => (
                <VRow align={'center'}>
                  <div class={'text-subtitle-1 ml-4'}> {item.title}：</div>
                  <VCol cols={12}>
                    <div class={'d-flex flex-wrap'} style={{ gap: '1rem' }}>
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
                    </div>
                  </VCol>
                </VRow>
              ))}
            </div>
            {/*@ts-ignore*/}
          </LazyClientOnly>
        </>
      )
    }

    function Pagination() {
      return (
        <VRow class={'my-4'} noGutters>
          <VCol cols={12}>
            <VPagination
              v-model={paginate.value.currentPage}
              length={totalPageSize.value}
              // totalVisible={totalVisible.value}
              totalVisible={5}
              onUpdate:modelValue={(value) => {
                paginate.value.currentPage = value
              }}
              disabled={uiState.value !== 'ok'}
              density={'comfortable'}
            />
          </VCol>
        </VRow>
      )
    }

    return () => (
      <VContainer style={{ gap: '2rem' }}>
        {/*@ts-ignore*/}
        <FilterWrapper />
        <Pagination />
        <VRow>
          <UIStateWrapper />
        </VRow>
        <Pagination />
        {/*@ts-ignore*/}
      </VContainer>
    )
  }
})
