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

    function Pay(props: { pay: number }) {
      switch (props.pay) {
        case 1:
          return <div>微信支付</div>
        case 2:
          return <div>支付宝支付</div>
        default:
          return <div>未知</div>
      }
    }

    function Status(props: { status: number }) {
      switch (props.status) {
        case 1:
          return <VChip color={'success'}>已付款</VChip>
        case 2:
          return <VChip color={'warning'}>待付款</VChip>
        case 3:
          return <VChip color={'error'}>付款失败</VChip>
        default:
          return <VChip color={'error'}>付款失败</VChip>
      }
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
                  return (
                    <tr>
                      <td>🍇 {item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.createdAt}</td>
                      <td>
                        <Pay pay={item.pay} />
                      </td>
                      <td>{item.price}元</td>
                      <td>
                        <Status status={item.status} />
                      </td>
                    </tr>
                  )
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
