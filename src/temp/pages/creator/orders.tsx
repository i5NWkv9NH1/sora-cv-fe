import {
  VChip,
  VCol,
  VContainer,
  VDataTable,
  VRow,
  VSkeletonLoader
} from 'vuetify/components'
import { useDataStore } from '~/stores'
import type { IOrder, IUIState } from '~/types'
import { UIStateEmpty, UIStateError } from '~/widgets'
import { PayStatus, PayType, TableRow } from '~/widgets/Order'

export default defineComponent({
  setup() {
    useSeoMeta({ title: '订单中心' })
    const uiState = ref<IUIState>('ok')
    const store = useDataStore()

    const headers = ref([
      { title: '订单号', align: 'start', key: 'id', sortable: true },
      { title: '订单名称', align: 'start', key: 'name', sortable: false },
      { title: '下单时间', align: 'start', key: 'createdAt', sortable: false },
      { title: '支付方式', align: 'start', key: 'pay', sortable: false },
      { title: '订单金额', align: 'start', key: 'price', sortable: false },
      { title: '订单状态', align: 'start', key: 'status', sortable: false }
    ])
    const items = ref(store.state.orders)
    const paginate = ref({
      currentPage: 1,
      pageSize: 10
    })

    watch(
      paginate,
      (value) => {
        console.log(value)
      },
      { deep: true }
    )

    function fetchData(value: number) {
      console.log(value)
    }


    function UIStateWrapper() {
      switch (uiState.value) {
        case 'empty':
          return <UIStateEmpty />
        case 'error':
          return <UIStateError />
        // case 'loading':
        // return <VSkeletonLoader type={'table'} />
        case 'loading':
        case 'ok':
          return (
            <VDataTable
              items={items.value}
              //@ts-ignore
              headers={headers.value}
              loading={uiState.value === 'loading'}
              v-model:itemsPerPage={paginate.value.pageSize}
              onUpdate:modelValue={fetchData}
              v-slots={{
                loading: () => (
                  <>
                    <VSkeletonLoader type={'table-row@10'} />
                  </>
                ),
                item({ item }) {
                  return <TableRow item={item} />
                }
              }}
            />
          )
        default:
          return <>Table</>
      }
    }

    return () => (
      <VContainer>
        <UIStateWrapper />
      </VContainer>
    )
  }
})
