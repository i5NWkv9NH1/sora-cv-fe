import { defineComponent } from 'vue'

export const UIStateEmpty = defineComponent({
  setup() {
    return () => <div class={'text-h4 text-warning'}>Empty</div>
  }
})
