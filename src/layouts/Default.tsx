import { renderSlot } from 'vue'
import {
  VApp,
  VAppBar,
  VBtn,
  VCol,
  VContainer,
  VFooter,
  VImg,
  VMain,
  VRow,
  VSheet,
} from 'vuetify/components'
import type { FCProps } from '~/types'

function AppBar() {
  return (
    <VAppBar>
      <VBtn to="/templates" class="mr-2">
        简历模板
      </VBtn>
      <VBtn to="/vip" class="mr-2">
        VIP会员
      </VBtn>
    </VAppBar>
  )
}

function Footer() {
  const { footer, logo } = useData()

  return (
    <VFooter color="#1f2937" class="pt-8 mt-8">
      <VContainer>
        <VRow align="start">
          <VCol cols="12" lg="2" md="2">
            <VSheet color="transparent">
              <VImg src={logo.value} width={120} height={50} />
            </VSheet>
          </VCol>
          <VCol cols="12" lg="10" md="10">
            <VRow justify="space-between" noGutters>
              {footer.value.map((item) => {
                const Title = () => (
                  <div class={['text-subtitle-1 font-weight-bolder']}>{item.title}</div>
                )
                return (
                  <VCol cols="6" lg="2" md="2" sm="3">
                    <Title />
                    {item.children.map(route => (
                      <VBtn to={route.path} variant="plain" size="small" exact>
                        {route.name}
                      </VBtn>
                    ))}
                  </VCol>
                )
              })}
            </VRow>
          </VCol>
        </VRow>
      </VContainer>
    </VFooter>
  )
}

function Layout({ slots }: FCProps) {
  return (
    <VApp>
      <AppBar />
      <VMain>{renderSlot(slots, 'default')}</VMain>
      <Footer />
    </VApp>
  )
}

export default defineComponent({
  setup(_, { slots }) {
    return () => <Layout slots={slots} />
  },
})
