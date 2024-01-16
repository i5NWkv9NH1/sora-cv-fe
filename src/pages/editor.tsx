export default defineComponent({
  setup() {
    definePageMeta({ layout: 'editor' })

    const store = useDataStore()
    const user = useUserStore()
    const setting = usePreferencesStore()

    const { query } = useRoute()
    const title = computed(() => `${query.templateId}`)

    watch(
      query,
      (newQueryValue) => {
        console.log(newQueryValue)
      },
      { immediate: true, deep: true }
    )

    return () => (
      <>
        <div>query</div>
      </>
    )
  }
})
