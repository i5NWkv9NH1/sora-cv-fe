import { mockTemplates } from '~/mocks'

export const useTemplateStore = defineStore('template', () => {
  const templates = ref(mockTemplates)

  return { templates }
}, { persist: true })
