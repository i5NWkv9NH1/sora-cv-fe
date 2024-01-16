import {
  VAvatar,
  VChip,
  VList,
  VListItem,
  VMenu
} from 'vuetify/lib/components/index.mjs'
import { randomColor } from '~/helpers'

export const UserProfileMenu = defineComponent({
  setup() {
    const store = useUserStore()
    const isVip = ref(true)
    const list = ref([
      // { title: '购买VIP', path: '/vip', icon: 'mdi-currency-twd' },
      { title: '我的简历', path: '/creator/', icon: 'mdi-view-list-outline' },
      {
        title: '模板中心',
        path: '/creator/templates',
        icon: 'mdi-database-outline'
      },
      {
        title: '收藏夹',
        path: '/creator/favorites',
        icon: 'mdi-heart-outline'
      },
      {
        title: '回收站',
        path: '/creator/recycle',
        icon: 'mdi-trash-can-outline'
      },
      { title: '订单中心', path: '/creator/orders', icon: 'mdi-cart-minus' },
      { title: '个人设置', path: '/creator/profile', icon: 'mdi-cog-outline' },
      { title: '帮助中心', path: '/', icon: 'mdi-lightbulb-question-outline' }
    ])

    return () => (
      <VMenu
        offset={10}
        transition={'slide-y-transition'}
        v-slots={{
          default: () => (
            <VList density={'compact'} variant={'text'} nav>
              <div class={'d-flex my-2'}>
                <VChip
                  color={store.state.isVip ? '#fed7aa' : '#111827'}
                  variant={store.state.isVip ? 'elevated' : 'outlined'}
                  elevation={0}
                >
                  VIP: {store.state.isVip ? '超级会员' : '未开通'}
                </VChip>
              </div>
              <VListItem
                title={'购买VIP'}
                prependIcon={'mdi-currency-twd'}
                to={'/vip'}
              />
              {list.value.map((item) => (
                <VListItem
                  to={item.path}
                  title={item.title}
                  prependIcon={item.icon}
                  exact
                />
              ))}
              {/* <VListItem onClick={store.logout} title={'退出'} /> */}
              <VListItem
                title={'退出'}
                prependIcon={'mdi-logout'}
                onClick={store.logout}
              />
            </VList>
          ),
          activator: ({ isActive, props }) => (
            <VAvatar class={'mr-2'} image={store.state.avatarUrl} {...props} />
          )
        }}
      />
    )
  }
})
