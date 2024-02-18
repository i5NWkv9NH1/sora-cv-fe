export * from './vuetify'
export type UIState = 'loading' | 'ok'

export interface Article {
  id: string
  title: string
  content: string
  sort: number
  status: number
  description: string
  thumbnailUrl: string
  seo: {
    description: string
  }
  stats: {
    view: number
    like: number
  }
  publishedAt: string | Date
  categories: Category[] | null
}

export interface Category {
  id: string | number
  parentId?: string | null
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
  subtitle: string
  description: string
  thumbnailUrl: string
  publishedAt: string | number
  createdAt: string | number
  publishedAtForamt: string
  isVip: boolean
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
  styleCategory: Category[]
  experienceCategory: Category[]
  jobCategory: Category[]
  tags: Category[]
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
  querys: Category[]
}

export interface Resume { }
export interface Fanwen {
  id: string
  title: string
  description: string
  form: any
}

export interface VIP {
  id: string | number
  title: string
  price: number
  type: number
  payTime: string
  description: string
  order: number
  value: number
}
export interface PayType {
  id: string | number
  name: string
  value: number
  icon: string
  color: string
}

export interface FAQ {
  id: string | number
  title: string
  content: string
}
export type ViewStyle = 'Grid' | 'List'

export type ResumePreviewSize = 'A4' | 'PHONE'
export interface PreviewOption {
  id: number
  name: string
  value: ResumePreviewSize
  icon?: string | null
}

export interface ResumeEditorTab {
  id: string
  name: string
  icon: string
  key: string
  value: number | string
  component: string
}

export interface Education {
  id: string
  school: string
  major: string
  educationalBackgrounds: number | null
  degree: number | null
  schooling: number | null
  college: string
  city: string
  startDate: string | null
  endDate: string | null
  description: string
}
export interface Work {
  id: string
  company: string
  department: string
  job: string
  city: string
  startDate: string
  endDate: string
  description: string
}
