export interface TemplateCategory {
  id: string | number
  parentId?: string | number
  name: string
  value: number
  icon?: string
}

export interface Author {
  id: string | number
  username: string
  avatarUrl: string
}

export interface Template {
  id: string | number
  title: string
  description: string
  author: string | Author
}

export type TempateQueryKey = 'category' | 'date' | 'star'
export interface TemplateQuery {
  category: number
  date: number
  star: number
}
export interface TemplateFilter {
  id: string | number
  title: string
  key: TempateQueryKey
  querys: TemplateCategory[]
}
