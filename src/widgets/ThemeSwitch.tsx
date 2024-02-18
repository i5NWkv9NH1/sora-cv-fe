import { VBtn, VIcon, VList, VListItem, VMenu } from 'vuetify/lib/components/index.mjs'
import { useTheme } from 'vuetify/lib/framework.mjs'
import type { Size } from '~/mocks'

export const ThemeSwitch = defineComponent({
  name: 'ThemeSwitch',
  props: {
    size: {
      type: String as PropType<Size>,
      default: 'default',
    },
  },
  setup(props, _) {
    const vuetify = useTheme()
    function handle(value: 'light' | 'dark') {
      vuetify.global.name.value = value
    }
    return () => (
      <VMenu
        offset={10}
        transition="slide-y-transition"
        v-slots={{
          activator: args => (
            <VBtn {...args.props} size={props.size} icon>
              <VIcon>mdi-theme-light-dark</VIcon>
            </VBtn>
          ),
          default: () => (
            <VList density="compact" nav>
              <VListItem onClick={() => handle('light')} title="light" />
              <VListItem onClick={() => handle('dark')} title="dark" />
            </VList>
          ),
        }}
      />
    )
  },
})
