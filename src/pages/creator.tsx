export default defineComponent({
  setup() {
    definePageMeta({ layout: 'creator', middleware: ['auth'] })

    return () => (
      //@ts-ignore
      <NuxtPage />
    )
  }
})
