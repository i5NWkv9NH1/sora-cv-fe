import { v4 as uuid } from 'uuid'
import type { TemplateFilter } from './type'

export const mockTemplateFilters: TemplateFilter[] = [
  {
    id: uuid(),
    title: '分类',
    key: 'category',
    querys: [
      { id: 1, name: '所有模板', value: 0, icon: '' },
      { id: 2, name: '简约', value: 1, icon: '' },
      { id: 3, name: '创意', value: 2, icon: '' },
      { id: 4, name: '专业', value: 3, icon: '' },
      { id: 5, name: '深色', value: 4, icon: '' },
    ],
  },
  {
    id: uuid(),
    title: '日期',
    key: 'date',
    querys: [
      { id: 1, name: '最新发布', value: 0, icon: '' },
      { id: 2, name: '最早发布', value: 1, icon: '' },
    ],
  },
]
