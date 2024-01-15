import { VContainer } from 'vuetify/lib/components/index.mjs'
import { templateData } from '~/data'

export default defineComponent({
  setup() {
    const id = useRoute().params.id
    const title = computed(() => `简历 | ${id}`)
    const template = ref(templateData)

    useSeoMeta({ title: title.value })

    async function fetchTemplate() {
      // const url = ''
      // const { data, error } = await useFetch(url, { server: false })
    }

    return () => <VContainer></VContainer>
  }
})
