import { renderSlot } from "vue"
import { VApp, VAppBar, VBtn, VIcon, VMain, VNavigationDrawer } from "vuetify/components"
import type { Density, FCProps, IUIState } from "~/types"



type AppBarProps = {
  density: Density
}
function AppBar({ density }: AppBarProps) {
  return (
    <VAppBar>
      <VBtn
        density={density}
        to={'/'}
        variant={'plain'}
      >
        <VIcon size={24} start>
          mdi-sort-variant
        </VIcon>
        创建
      </VBtn>
    </VAppBar>
  )
}

type DrawerProps = {
  drawer: boolean
}
function Drawer({ drawer }: DrawerProps) {
  return (
    <VNavigationDrawer
      v-model={drawer}
    >
      Drawer
    </VNavigationDrawer>
  )
}

type Props = FCProps & AppBarProps & DrawerProps
function Layout({ slots, drawer, density }: Props) {
  return (
    <VApp>
      <AppBar density={density} />
      <Drawer drawer={drawer} />
      <VMain>
        {renderSlot(slots, 'default')}
      </VMain>
    </VApp>
  )
}

export default defineComponent({
  setup(_, { slots }) {
    const { drawer, density } = storeToRefs(usePreferencesStore())


    return () => <Layout slots={slots} drawer={drawer.value} density={density.value} />
  }
})
