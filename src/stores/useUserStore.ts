import { defineStore } from 'pinia'
import type { IUser } from '~/types'

export const useUserStore = defineStore(
  'user',
  () => {
    const state = ref<IUser>({
      token: '',
      username: 'user_60dqdqdqd1231d20183921',
      avatarUrl: '/1.png',
      id: '11111111',
      name: '用户_1807',
      phoneNumebr: '',
      phone: false,
      wechat: true,
      isVip: true
    })

    function logout() {
      state.value.token = ''
      navigateTo('/signin')
    }

    return { state, logout }
  },
  { persist: true }
)
