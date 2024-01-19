import { renderSlot } from 'vue'
import {
  VApp,
  VAppBar,
  VAppBarNavIcon,
  VBtn,
  VIcon,
  VMain,
  VNavigationDrawer
} from 'vuetify/components'
import type { Density, FCProps, IUIState } from '~/types'

type AppBarProps = {
  drawer: Ref<boolean>
}
function AppBar({ drawer }: AppBarProps) {
  return (
    <VAppBar>
      <VAppBarNavIcon
        //@ts-ignore
        onClick={() => {
          drawer.value = !drawer.value
        }}
      />
      <VBtn to={'/'} variant={'plain'}>
        <VIcon size={24} start>
          mdi-sort-variant
        </VIcon>
        创建
      </VBtn>
    </VAppBar>
  )
}

type DrawerProps = {
  drawer: Ref<boolean>
}
function Drawer({ drawer }: DrawerProps) {
  return <VNavigationDrawer v-model={drawer.value}>Drawer</VNavigationDrawer>
}

type Props = FCProps & AppBarProps & DrawerProps
function Layout({ slots, drawer }: Props) {
  return (
    <VApp>
      <AppBar drawer={drawer} />
      <Drawer drawer={drawer} />
      <VMain>{renderSlot(slots, 'default')}</VMain>
    </VApp>
  )
}

export default defineComponent({
  setup(_, { slots }) {
    const { drawer } = storeToRefs(usePreferencesStore())

    return () => <Layout slots={slots} drawer={drawer} />
  }
})
