import type { SlotsType } from 'vue'
import { renderSlot } from 'vue'
import { VApp, VAppBar, VBtn, VChip, VList, VListItem, VListSubheader, VMain, VNavigationDrawer, VSnackbar, VSpacer } from 'vuetify/components'
import { creatorLayoutData } from '~/data'
import { ThemeSwitch } from '~/widgets'

function AppBar() {
  const { user } = useData()

  return (
    <VAppBar>
      <VSpacer />
      <ThemeSwitch />
      <VList>
        <VListItem
          prependAvatar={user.avatarUrl}
          v-slots={{
            title: () => (
              <>
                <span class="mr-2">Sora</span>
                <VChip color="warning" rounded="xl" density="compact">月会员</VChip>
              </>
            ),
            subtitle: () => (
              <>
                <span class="mr-2">2024年3月19日到期</span>
                <VBtn color="error" rounded="xl" density="compact" to="/vip" class="opacity-1 text-decoration-underline pa-0">去续费</VBtn>
              </>
            ),
          }}
        />
      </VList>
    </VAppBar>
  )
}

function Drawer() {
  const items = ref(creatorLayoutData.items)

  return (
    <VNavigationDrawer
      v-slots={{
        default: () => {
          return (
            <>
              {items.value.map(list => (
                <VList key={list.id}>
                  {list.name && <VListSubheader>{list}</VListSubheader>}
                  {list.routes.map(route => (
                    <VListItem
                      title={route.title}
                      prependIcon={route.icon}
                      to={route.path}
                      key={route.path}
                    />
                  ))}
                </VList>
              ))}
            </>
          )
        },

        append: () => (
          <VList
            density="compact"
            nav
          >
            <VListItem
              prependIcon="mdi-lightbulb-question-outline"
              title="帮助中心"
              to="/"
              exact
            />
          </VList>
        ),
      }}
    />
  )
}

function GlobalMessage() {
  const { alert } = storeToRefs(usePreferencesStore())

  return (
    <VSnackbar
      v-model={alert.value.status}
      text={alert.value.message}
      color={alert.value.color}
      location={alert.value.location}
      timeout={alert.value.delay}
    />
  )
}

function Layout({ slots }: { slots: SlotsType }) {
  return (
    <VApp>
      <AppBar />
      <GlobalMessage />
      <Drawer />
      <VMain>
        {renderSlot(slots, 'default')}
      </VMain>
    </VApp>
  )
}

export default defineComponent({
  setup(_, { slots }) {
    return () => <Layout slots={slots} />
  },
})
