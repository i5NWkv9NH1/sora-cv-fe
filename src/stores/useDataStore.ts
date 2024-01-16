import { defineStore } from 'pinia'
import { templateListData } from '~/data'
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
      ] as IOrder[],
      templateList: templateListData.map((item) => {
        const tags = item.style_category.map((_tag) => {
          return {
            id: _tag.category_id,
            name: _tag.name
          }
        })
        return {
          id: item.goods_id,
          title: item.goods_name,
          description: item.selling_point,
          tags,
          thumbnailUrl: item.goods_image
        }
      })
    })

    return { state }
  },
  { persist: true }
)
