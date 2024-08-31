import { type Education, mockEducations, mockFaqs, mockFooter, mockIntros, mockRecommendAIs, mockTemplateData, mockVips, mockWorks } from '~/mocks'

export function useData() {
  const logo = ref('')
  const thumbnailUrl = ref('')
  // #region index page
  const footer = ref(mockFooter)

  const intros = ref(mockIntros)
  const recommendTemplates = ref(mockTemplateData.recommend)
  const recommendAIs = ref(mockRecommendAIs)
  // #endregion
  const vips = ref(mockVips)
  const faqs = ref(mockFaqs)

  const sign = reactive({
    thumbnailUrl: '',
    qrCode: '',
  })

  const user = reactive({
    avatarUrl: '3.jpg',
  })

  const form = reactive({
    basic: {
      name: '林泽鑫',
      enName: 'sora',
      currentJob: 'CEO（首席技术总裁）',
      phone: '15697544151',
      email: 'sora@bakken.com',
      birthday: '1998-02-28',
      gender: 1,
      nation: 1,
      height: 168,
      weight: 60,
      marital: 1,
      duty: 1,
      currentCity: '广东省汕头市',
      wechat: 'bravesnail98',
      linkein: '',
      description: '<p>没什么好说的</p><p>这个人很懒，什么都没有留下。。。</p>',
      purposeCity: '厦门',
      purposeMinSalary: 4500,
      purposeMaxSalary: 7000,
    },
    // educations: [
    //   { id: v4(), school: '潮汕职业技术学院', major: '软件与信息服务', educationalBackgrounds: 4, degree: 0, schooling: 1, college: '信息技术学院', city: '广东省揭阳市', startDate: '2016-09-01', endDate: '2019-06-30', description: `<p>荣誉奖项：优秀毕业生（专业前3%）、一等奖学金（2022，2023）。</p><p> 主修课程：视觉传达设计方法、视觉传达设计创意、视觉传达设计应用、视觉传达设计传播。</p>` },
    //   { id: v4(), school: '湛江科技学院', major: '计算机科学与技术', educationalBackgrounds: 5, degree: 1, schooling: 1, college: '智能制造学院', city: '广东省湛江市', startDate: '2021-09-01', endDate: '2023-06-29', description: `<p>荣誉奖项：优秀毕业生（专业前3%）、一等奖学金（2022，2023）。</p><p> 主修课程：视觉传达设计方法、视觉传达设计创意、视觉传达设计应用、视觉传达设计传播。</p>` },
    // ],
    educations: mockEducations as Education[],
    // works: [
    //   { id: v4(), company: '厦门奈思科技有限公司', department: '电商设计部', job: 'ui设计实习生', city: '厦门', startDate: '2020-02-02', endDate: '2022-01-21', description: '<p>公司主营业务为线上电商，产品主要有陶瓷茶具与关联产品。本人负责线上产品视觉展示，首页和详情设计和修改。线下物料延展，部分节气海报绘制。</p>' },
    // ],
    works: mockWorks,
    // skills: {
    //   softwares: ['Vue.js', 'React.js', 'Adobe'],
    //   professions: [],
    // },
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
    user,
    form,
  }
}
