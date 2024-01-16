import { defineStore } from 'pinia'
import type { IOrder } from '~/types'

export const useDataStore = defineStore(
  'data',
  () => {
    const state = reactive({
      orders: [
        {
          id: 'RC2024011610052101',
          name: '月度会员',
          createdAt: '2024-01-16 15:30:37',
          pay: 1,
          price: 18.0,
          status: 1
        },
        {
          id: 'RC2024011610052102',
          name: '月度会员',
          createdAt: '2024-01-16 15:30:37',
          pay: 1,
          price: 18.0,
          status: 2
        },
        {
          id: 'RC2024011610052103',
          name: '月度会员',
          createdAt: '2024-01-16 15:30:37',
          pay: 2,
          price: 18.0,
          status: 3
        },
        {
          id: 'RC2024011610052104',
          name: '月度会员',
          createdAt: '2024-01-16 15:30:37',
          pay: 2,
          price: 18.0,
          status: 2
        }
      ] as IOrder[]
    })

    return { state }
  },
  { persist: true }
)
