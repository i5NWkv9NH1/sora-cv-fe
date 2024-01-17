import type { JSXComponent } from "vue"

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
  path: string
  seo: {
    title: string
    keyword: string
    description: string
    sort: string | number
    createdAt: string
    updatedAt: string
    wechat: {
      appId: string
    },
    image: unknown
  }
}
export type ICategory = ITag

export type ITemplate = {
  id: string | number
  title: string
  subtitle: string
  description: string
  thumbnailUrl: string
  publishedAt: string | number
  createdAt: string | number
  publishedAtForamt: string
  sort: string | number
  style: string
  status: number
  download: {
    url: string
    password: string
  }
  file: {
    name: string
    quantity: number
  }
  model: {
    content: string
    description: string
    data: string
  }
  thumbnails: {
    id: string | number
    src: string
  }[]
  stats: {
    view: string | number
    like: string | number
  }
  styleCategory: ICategory[]
  experienceCategory: ICategory[]
  jobCategory: ICategory[]
  tags: ICategory[]
}

export type ISubscribe = {
  id: string | number
  name: string
  price: string | number
  description: string
  type: string
}

export type IOrder = {
  id: string | number
  name: string | number
  createdAt: string
  pay: number
  price: string | number
  status: number
}

export type IUser = {
  id: string | number
  username: string
  name: string
  phone: boolean
  phoneNumebr: string
  wechat: boolean
  avatarUrl: string
  token: string
  isVip: boolean
}


export type PreviewSize = 'A4' | 'PHONE'
export type PreviewOption = { id: number; label: string; value: 'A4' | 'PHONE'; icon: string }
export type ResumeTab = {
  id: number | string,
  name: string
  icon: string
  value: number | string
  key: string
}
export type ResumeWindow = {
  value: number
  key: number | string
  component: JSXComponent
}
export type Density = null | 'default' | 'comfortable' | 'compact';
