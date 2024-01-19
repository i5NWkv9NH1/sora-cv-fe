import type { JSXComponent, type SlotsType } from 'vue'

export * from './vuetify'

export type IUIState = 'ok' | 'loading' | 'empty' | 'error'

export interface IArticle {
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

export interface ITag {
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
    }
    image: unknown
  }
}
export type ICategory = ITag

export interface ITemplate {
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

export interface ISubscribe {
  id: string | number
  name: string
  price: string | number
  description: string
  type: string
}

export interface IOrder {
  id: string | number
  name: string | number
  createdAt: string
  pay: number
  price: string | number
  status: number
}

export interface IUser {
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
export interface PreviewOption {
  id: number
  label: string
  value: 'A4' | 'PHONE'
  icon: string
}
export interface ResumeTab {
  id: number | string
  name: string
  icon: string
  value: number | string
  key: string
}
export interface ResumeWindow {
  value: number
  key: number | string
  component: JSXComponent
}

// ! form
export interface SkillItem {
  name: string
  description: string
}
export interface EducationItem {
  id: number
  school: string
  major: string
  degree: number
  degreeType: number
  college: string
  schoolCity: string
  schoolTimeFrom: string
  schoolTimeTo: string
  experienceDesc: string
}
export interface ProjectItem {
  id: number
  name: string
  role: string
  department: string
  city: string
  from: string
  to: string
  experienceDesc: string
}
export interface WorkItem {
  id: number
  company: string
  job: string
  department: string
  city: string
  workTimeFrom: string
  workTimeTo: string
  experienceDesc: string
}
export type OtherItemType = 'preItemsKey' | 'language'
export interface OtherItem {
  preItemsKey: OtherItemType
  isTagItem: boolean
  label: string
  value: string | string[]
}

export interface IResume {
  id: string | number
  name: string
  thumbnailUrl: string
  previewSize: PreviewSize
  modules: string[]
  theme: string
  themeColor: string
  fields: {
    baseInfoName: string
    educationName: string
    softwaveSkillsName: string
    projectName: string
    // ? 经历
    experienceName: string
    otherName: string
  }
  form: {
    name: string
    avatarUrl: string
    enName: string
    job: string
    phone: string
    email: string
    city: string
    birthday: Date
    gender: number
    nation: number
    height: number
    weight: number
    marital: number
    // ? 个人状态
    status: number
    // ? 评价
    evalaute: string
    // ? 社交媒体
    social: {
      linkedin: string
      wechat: string
    }
    // ? 期望
    purpose: {
      city: string
      job: string
      salar: {
        min: number
        max: number
      }
    }
    projects: ProjectItem[]
    others: OtherItem[]
    experiences: WorkItem[]
    educations: EducationItem[]
    softwaveSkills: any[]
    skills: SkillItem[]
  }
}

export interface VIP {
  id: string | number
  title: string
  price: string | number
  type: number
  description: string
  order: number
  value: number
}

export interface FAQ {
  id: string | number
  title: string
  content: string
}

export interface Intro {
  title: string
  subtitle: string
  thumbnailUrl: string
  color: string
}

export interface AI {
  id: string | number
  name: string
  thumbnailUrl: string
  description: string
}

export interface FCProps {
  slots: SlotsType
}
