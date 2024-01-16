import { VContainer } from 'vuetify/components'

import { VIntro } from '~/components'

export default defineComponent({
  setup() {
    definePageMeta({ layout: 'editor' })

    return () => (
      <>
        <div>
          <VIntro />
        </div>
      </>
    )
  }
})
