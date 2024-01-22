import { renderSlot } from 'vue'
import {
  VApp,
  VAppBar,
  VAppBarNavIcon,
  VMain,
  VNavigationDrawer,
} from 'vuetify/components'
import type { Density } from '~/mocks'
import type { FCProps } from '~/types'
import { ThemeSwitch } from '~/widgets'

interface AppBarProps {
  drawer: Ref<boolean>
  density: Density
}
function AppBar({ drawer, density }: AppBarProps) {
  return (
    <VAppBar density={density}>
      <VAppBarNavIcon
        // @ts-expect-error
        onClick={() => {
          drawer.value = !drawer.value
        }}
      />
    <ThemeSwitch />
    </VAppBar>
  )
}

interface DrawerProps {
  drawer: Ref<boolean>
}
function Drawer({ drawer }: DrawerProps) {
  return <VNavigationDrawer v-model={drawer.value} location="right" temporary>Drawer</VNavigationDrawer>
}

type Props = FCProps & AppBarProps & DrawerProps
function Layout({ slots, drawer, density }: Props) {
  return (
    <VApp>
      <AppBar drawer={drawer} density={density} />
      <Drawer drawer={drawer} />
      <VMain>{renderSlot(slots, 'default')}</VMain>
    </VApp>
  )
}

export default defineComponent({
  setup(_, { slots }) {
    const { drawer } = storeToRefs(usePreferencesStore())
    const { density, size } = useSettings()

    return () => <Layout slots={slots} drawer={drawer} density={density.value} />
  },
})
