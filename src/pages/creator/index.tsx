import { VBtn, VContainer } from 'vuetify/lib/components/index.mjs'

export default defineComponent({
  setup() {
    useSeoMeta({ title: '我的简历' })

    const store = useUserStore()
    function logout() {
      store.state.token = ''

      navigateTo({ path: '/signin' })
    }

    return () => (
      <VContainer>
        <VBtn to={'/signin'}>登录</VBtn>
        <VBtn
          //@ts-ignore
          onClick={logout}
        >
          退出
        </VBtn>
      </VContainer>
    )
  }
})
