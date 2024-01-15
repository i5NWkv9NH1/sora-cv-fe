export type IUIState = 'ok' | 'loading' | 'empty' | 'error'

export type IArticle = {
  id: string | number
  title: string
  subtitle: string
  createdAt: string
  publishedAt: string
  stats: {
    view: number
    like: number
  }
  thumbnailUrl: string
}

export type ITag = {
  id: string | number
  name: string
}

export type ITemplate = {
  id: string | number
  title: string
  description: string
  createdAt: string 
  publishedAt: string
  tags: ITag[]
  thumbnailUrl: string
  jobCategory: ITag[]
  experienceCategory: ITag[]
}

export type ISubscribe = {
  id: string | number
  name: string
  price: string | number
  description: string
  type: string
}