import {
  VBtn,
  VCard,
  VCardText,
  VCol,
  VContainer,
  VImg,
  VRow
} from 'vuetify/lib/components/index.mjs'
import { VTemplate, VIntro } from '~/components'
export default defineComponent({
  setup() {
    useSeoMeta({ title: '首页' })

    const state = reactive({
      logo: 'https://www.nicecv.cn/api/web/uploads/202312231607230d6e51965.png',
      cover: {
        url: 'https://www.nicecv.cn/api/web/uploads/20231206093708b10308459.jpg',
        size: '',
        title: '轻松在线制作',
        subtitle: '您的精美个人简历',
        caption: '节省简历制作的时间，帮助您更好的介绍自己，获得梦想的职位。'
      },
      intros: [
        {
          title: '在线制作',
          subtitle: '直观的编辑和修改简历，所见即所得',
          thumbnailUrl:
            'https://www.nicecv.cn/api/web/uploads/202306292153212ff562769.png',
          color: '#fff1f2'
        },
        {
          title: '精美模板',
          subtitle: '原创设计的精美模板，满足各种岗位需求',
          thumbnailUrl:
            'https://www.nicecv.cn/api/web/uploads/20230629215322085c95436.png',
          color: '#fff9f4'
        },
        {
          title: '简历助手',
          subtitle: '内置简历内容ai生成工具，为您节约更多时间',
          thumbnailUrl:
            'https://www.nicecv.cn/api/web/uploads/2023062921532161b754059.png',
          color: '#f2f1ff'
        }
      ],
      templates: [
        {
          id: 1,
          title: '黑色幻想',
          description: '深色背景的创意排版简历模板',
          thumbnailUrl:
            'https://www.nicecv.cn/api/web/uploads/2023111521440306f5b2895.jpg',
          tags: [
            { id: 10010, name: '创意' },
            { id: 10011, name: '设计师' },
            { id: 10012, name: '中级' },
            { id: 10013, name: '深色' }
          ]
        },
        {
          id: 2,
          title: '地平线',
          description: '极简线条感的简历模板',
          thumbnailUrl:
            'https://www.nicecv.cn/api/web/uploads/20231110164008053fc3619.jpg',
          tags: [
            { id: 10010, name: '创意' },
            { id: 10011, name: '设计师' },
            { id: 10012, name: '中级' },
            { id: 10013, name: '深色' }
          ]
        },
        {
          id: 3,
          title: '留白',
          description: '顶部留白的极简内容简历模板',
          thumbnailUrl:
            'https://www.nicecv.cn/api/web/uploads/2023111015415325feb6980.jpg',
          tags: [
            { id: 10010, name: '创意' },
            { id: 10011, name: '设计师' },
            { id: 10012, name: '中级' },
            { id: 10013, name: '深色' }
          ]
        },
        {
          id: 4,
          title: '雅素',
          description: '轻奢唯美的女设计师简历模板',
          thumbnailUrl:
            'https://www.nicecv.cn/api/web/uploads/20231110145759f786e6264.jpg',
          tags: [
            { id: 10010, name: '创意' },
            { id: 10011, name: '设计师' },
            { id: 10012, name: '中级' },
            { id: 10013, name: '深色' }
          ]
        },
        {
          id: 5,
          title: 'BlueBox',
          description: '蓝色调bento风格的分区块简历模板',
          thumbnailUrl:
            'https://www.nicecv.cn/api/web/uploads/202311101133190a2965546.jpg',
          tags: [
            { id: 10010, name: '创意' },
            { id: 10011, name: '设计师' },
            { id: 10012, name: '中级' },
            { id: 10013, name: '深色' }
          ]
        },
        {
          id: 6,
          title: '极空间',
          description: '简洁实用的左右双栏简历模板',
          thumbnailUrl:
            'https://www.nicecv.cn/api/web/uploads/20231121102916935e32518.jpg',
          tags: [
            { id: 10010, name: '创意' },
            { id: 10011, name: '设计师' },
            { id: 10012, name: '中级' },
            { id: 10013, name: '深色' }
          ]
        }
      ],
      ai: [
        {
          id: 1,
          name: 'Resign AI',
          description: '离职信生成',
          thumbnailUrl:
            'https://www.nicecv.cn/api/web/uploads/20230816223216060e58971.png'
        },
        {
          id: 2,
          name: 'CovLetter AI',
          description: '求职信生成',
          thumbnailUrl:
            'https://www.nicecv.cn/api/web/uploads/20230816215424fd4547943.png'
        },
        {
          id: 3,
          name: 'Recommend AI',
          description: '推荐信生成',
          thumbnailUrl:
            'https://www.nicecv.cn/api/web/uploads/20230816215226f25132063.png'
        }
      ],
      footer: [
        {
          title: '产品',
          children: [
            { title: '简历模板', path: '/templates' },
            { title: 'AI 工具', path: '/ai' }
          ]
        },
        {
          title: '文章',
          children: [
            { title: '求职攻略', path: '/templates' },
            { title: '面试经验', path: '/ai' },
            { title: '建立指南', path: '/ai' }
          ]
        },
        {
          title: '关于我们',
          children: [
            { title: '产品介绍', path: '/templates' },
            { title: '服务协议', path: '/ai' },
            { title: '隐私条款', path: '/ai' }
          ]
        },
        {
          title: '服务',
          children: [
            { title: '帮助中心', path: '/templates' },
            { title: '常见问题', path: '/ai' },
            { title: '成为VIP会员', path: '/ai' }
          ]
        },
        {
          title: '联系我们',
          children: [
            { title: '微信号：Bravesnail' },
            { title: '公众号：奈斯简历NiceCV' },
            { title: '小红书：奈斯简历' }
          ]
        }
      ]
    })

    function Headline(props: { title: string }) {
      return (
        <div class={'text-h4 font-weight-bold'}>
          <span class={'text-primary mr-2'}>#</span>
          {props.title}
        </div>
      )
    }
    function Cover() {
      return (
        <VRow align={'center'} justify={'space-between'}>
          <VCol>
            <VIntro gap={1.25}>
              <VBtn to={'/signin'} width={'50%'}>
                创建您的简历
              </VBtn>
            </VIntro> 

          </VCol>
          <VCol class='hidden-md-and-down'>
            <VImg src={state.cover.url} cover />
          </VCol>
        </VRow>
      )
    }
    function Intros() {
      return (
        <div
          class={'d-flex flex-column fluid'}
          style={{ gap: '1.25rem', width: '100%' }}
        >
          <Headline title={'简要介绍'} />
          <VRow>
            {state.intros.map((item, index) => (
              <VCol cols={12} lg={4} md={4} sm={6} key={item.title}>
                <VCard color={item.color} flat>
                  <VCardText>
                    <div
                      class={
                        'd-flex flex-column text-center pa-4 text-center intros'
                      }
                    >
                      <VImg
                        src={item.thumbnailUrl}
                        width={'100%'}
                        height={'220'}
                        class={['my-2', Boolean(index % 2) && 'order-1']}
                      />
                      <div class={'text-h6 font-weight-bold'}>{item.title}</div>
                      <div class={'text-subtitle-2 mt-2'}>{item.subtitle}</div>
                    </div>
                  </VCardText>
                </VCard>
              </VCol>
            ))}
          </VRow>
        </div>
      )
    }
    function Templates() {
      return (
        <div
          class={'d-flex flex-column fluid'}
          style={{ gap: '1.25rem', width: '100%' }}
        >
          <Headline title={'热门简历模板'} />
          <VRow>
            {state.templates.map((template) => (
              <VCol cols={12} lg={4} md={4} sm={6} key={template.id}>
                <VTemplate item={template} key={template.id} />
              </VCol>
            ))}
          </VRow>
          <div class={'d-flex justify-center'}>
            <VBtn to={'/templates'}>查看全部模板</VBtn>
          </div>
        </div>
      )
    }
    function AI() {
      return (
        <div
          class={'d-flex flex-column fluid'}
          style={{ gap: '1.25rem', width: '100%' }}
        >
          <Headline title={'AI 求职工具'} />
          <VRow>
            {state.ai.map((item) => (
              <VCol cols={12} lg={4} md={4} sm={6} key={item.id}>
                <VCard width={'100%'} to={`/ai/${item.id}`} flat>
                  <VCardText>
                    <div
                      class={'d-flex flex-column text-center pa-4 align-center'}
                    >
                      <VImg
                        src={item.thumbnailUrl}
                        width={120}
                        height={120}
                        class={'my-4'}
                      />
                      <div class={'text-h6 font-weight-bold'}>{item.name}</div>
                      <div class={'text-subtitle-1'}>{item.description}</div>
                    </div>
                  </VCardText>
                </VCard>
              </VCol>
            ))}
          </VRow>
          <div class={'d-flex justify-center'}>
            <VBtn to={'/ai'}>查看所有工具</VBtn>
          </div>
        </div>
      )
    }

    return () => (
      <VContainer class='fill-height' style='gap: 4rem'>
        <Cover />
        <Intros />
        <Templates />
        <AI />
      </VContainer>
    )
  }
})
