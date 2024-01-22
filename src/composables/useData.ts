import { mockFaqs, mockFooter, mockIntros, mockRecommendAIs, mockTemplateData, mockVips } from '~/mocks'

export function useData() {
  const logo = ref('https://www.nicecv.cn/api/web/uploads/202312231607230d6e51965.png')
  const thumbnailUrl = ref('https://www.nicecv.cn/api/web/uploads/20231206093708b10308459.jpg')
  // #region index page
  const footer = ref(mockFooter)

  const intros = ref(mockIntros)
  const recommendTemplates = ref(mockTemplateData.recommend)
  const recommendAIs = ref(mockRecommendAIs)
  // #endregion
  const vips = ref(mockVips)
  const faqs = ref(mockFaqs)

  const sign = reactive({
    thumbnailUrl: 'https://www.nicecv.cn/api/web/uploads/20230722150520f541c9245.jpg',
    qrCode: 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQGj8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyUV9TSDhPVC1lakcxSkpuQXhCMXEAAgQx16RlAwQ8AAAA',
  })

  return {
    logo,
    thumbnailUrl,
    intros,
    recommendTemplates,
    recommendAIs,
    footer,
    vips,
    faqs,
    sign,
  }
}
