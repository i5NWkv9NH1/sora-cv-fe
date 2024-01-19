import type { SlotsType } from 'vue'
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
  VSheet
} from 'vuetify/components'
import { layoutData } from '~/data'
import type { FCProps } from '~/types'

function AppBar() {
  return (
    <VAppBar>
      <VBtn to='/templates' class='mr-2'>
        简历模板
      </VBtn>
      <VBtn to='/vip' class='mr-2'>
        VIP会员
      </VBtn>
    </VAppBar>
  )
}

function Footer() {
  const items = ref(layoutData.footer)

  return (
    <VFooter>
      <VContainer>
        <VRow align={'start'}>
          <VCol>
            <VSheet color={'transparent'}>
              <VImg src={''} width={120} height={50} />
            </VSheet>
          </VCol>
          <VCol>
            <VRow justify={'space-between'} noGutters>
              {items.value.map((item) => {
                const Title = () => (
                  <div class={['text-subtitle-1']}>{item.title}</div>
                )
                return (
                  <VCol>
                    <Title />
                    {item.children.map((route) => (
                      <VBtn to={route.path} exact>
                        {route.title}
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
  }
})
