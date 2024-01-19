import { renderSlot } from 'vue'
import { VApp, VMain } from 'vuetify/lib/components/index.mjs'

export default defineComponent({
  setup(_, { slots }) {
    return (
      <VApp>
        <VMain>
          {renderSlot(slots, 'default')}
        </VMain>
      </VApp>
    )
  },
})
