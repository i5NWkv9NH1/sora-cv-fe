import { renderSlot, type SlotsType } from "vue"
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
//! settings
export type Size = 'x-small' | 'small' | 'default' | 'large' | 'x-large'
export type Density = null | 'default' | 'comfortable' | 'compact';
export type DensityMode = {
  label: string
  value: Density
  icon?: string
}
export type SizeMode = {
  label: string
  value: Size
}
export type Theme = 'auto' | 'light' | 'dark'
export type ThemeMode = {
  label: string;
  value: Theme
  icon?: string
}



//! form
export type SkillItem = {
  name: string
  description: string
}
export type EducationItem = {
  "id": number,
  "school": string
  "major": string
  "degree": number,
  "degreeType": number,
  "college": string
  "schoolCity": string
  "schoolTimeFrom": string
  "schoolTimeTo": string
  "experienceDesc": string
}
export type ProjectItem = {
  "id": number,
  "name": string
  "role": string
  "department": string
  "city": string
  "from": string
  "to": string
  "experienceDesc": string
}
export type WorkItem = {
  "id": number,
  "company": string
  "job": string
  "department": string
  "city": string
  "workTimeFrom": string
  "workTimeTo": string
  "experienceDesc": string
}
export type OtherItemType = 'preItemsKey' | "language"
export type OtherItem = {
  preItemsKey: OtherItemType
  isTagItem: boolean
  label: string
  value: string | string[]
}

export type IResume = {
  id: string | number
  name: string
  thumbnailUrl: string
  previewSize: PreviewSize
  modules: string[],
  theme: string
  themeColor: string
  fields: {
    baseInfoName: string
    educationName: string
    softwaveSkillsName: string
    projectName: string
    //? 经历
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
    //? 个人状态
    status: number
    //? 评价
    evalaute: string
    //? 社交媒体
    social: {
      linkedin: string
      wechat: string
    }
    //? 期望
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
    softwaveSkills: any[
    ]
    skills: SkillItem[]
  }
}
