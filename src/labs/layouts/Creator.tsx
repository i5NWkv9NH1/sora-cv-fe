import type { SlotsType } from 'vue'
import { renderSlot } from 'vue'
import { VApp, VList, VListItem, VListSubheader, VMain, VNavigationDrawer, VSnackbar } from 'vuetify/components'
import { creatorLayoutData } from '~/data'

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

function Layout(slots: SlotsType) {
  return (
    <VApp>
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
    return () => <Layout />
  },
})
