import { VBtn, VContainer, VIcon } from 'vuetify/components'

interface PageProps {
  toggle: () => void
}

function Page({ toggle }: PageProps) {
  return (
    <VContainer>
      <VBtn
        // @ts-expect-error
        onClick={toggle}
        icon
        color="primary"
      >
        <VIcon>sort-variant</VIcon>
      </VBtn>
    </VContainer>
  )
}

export default defineComponent({
  setup() {
    definePageMeta({ layout: 'editor' })
    useSeoMeta({ title: 'Home' })

    const { drawer } = storeToRefs(usePreferencesStore())
    const toggle = () => { drawer.value = !drawer.value }
    return () => <Page toggle={toggle} />
  },
})
