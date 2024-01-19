export function usePaginateQuery() {
  const items = ref<any[]>()

  const query = ref({
    category: 0,
    date: 0,
  })

  const paginate = ref({
    currentPage: 1,
    pageSize: 10,
    totalPage: 100,
    totalSize: 500,
  })

  async function fetchTemplates() {

  }
  return { query, paginate }
}
