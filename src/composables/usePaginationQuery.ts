import type { TempateQueryKey } from '~/mocks'

// TODO add query filters

type Query = {
  [query in TempateQueryKey]: number
}
interface Props<T> {
  items: Ref<T[]>
  currentPage: Ref<number>
  pageSize?: Ref<number>
}

export function usePaginationQuery<T>(configs: Props<T>) {
  console.log('composable: currentPage', configs.currentPage.value)
  const currentPage = ref(configs.currentPage)
  const pageSize = configs.pageSize || ref(10)
  const items = computed(() => (
    configs.items.value.slice(
      (configs.currentPage.value - 1) * pageSize.value,
      configs.currentPage.value * pageSize.value,
    )
  ))

  const totalPage = computed(() => Math.ceil(
    configs.items.value.length || 0 / pageSize.value,
  ))

  return {
    items,
    totalPage,
  }
}
