export type UIState = 'ok' | 'loading' | 'empty' | 'error'

export type Article = {
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

export type Template = {
  title: string
  description: string
  jobCategory: []
  experienceCategory: []
  createdAt: string
  publishedAt: string
  tags: []
}
