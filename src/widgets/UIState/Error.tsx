import { defineComponent } from 'vue'

export const UIStateError = defineComponent({
  setup() {
    return () => <div class="text-h4 text-error">Error</div>
  },
})
