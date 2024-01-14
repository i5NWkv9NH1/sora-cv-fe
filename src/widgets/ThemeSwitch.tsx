import { VBtn, VList, VListItem, VMenu } from 'vuetify/lib/components/index.mjs'
import { useTheme } from 'vuetify/lib/framework.mjs'

export const ThemeSwitch = defineComponent({
  name: 'ThemeSwitch',
  setup() {
    const vuetify = useTheme()
    function handle(value: 'light' | 'dark') {
      vuetify.global.name.value = value
    }
    return () => (
      <VMenu
        offset={10}
        transition={'slide-y-transition'}
        v-slots={{
          activator: ({ props }) => (
            <VBtn {...props} icon={'mdi-theme-light-dark'} />
          ),
          default: () => (
            <VList density={'compact'} nav>
              <VListItem onClick={() => handle('light')} title={'light'} />
              <VListItem onClick={() => handle('dark')} title={'dark'} />
            </VList>
          )
        }}
      />
    )
  }
})
