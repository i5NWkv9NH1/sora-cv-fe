import { VBtn, VContainer, VRow, VCol, VCard, VHover, VExpansionPanels, VExpansionPanel, VExpansionPanelText,VExpansionPanelTitle,VSheet, VFabTransition, VDivider } from 'vuetify/lib/components/index.mjs'
import { VSection, VIntro, NeedVIP } from '~/components'
import type { ISubscribe } from '~/types'

export default defineComponent({
  setup() {
    useSeoMeta({ title: 'VIP会员' })

    const store = useUserStore()

    const items = ref([
      { id: 1, title: '月度会员', price: '18', type: '月度', description: `<p>无限制访问所有简历模板</p>\n <p>创建和编辑您的简历</p><p>使用ai简历助手</p>`, order: 0, value: 1 },
      { id: 2, title: '年度会员', price: '98', type: '每年', description: `<p>无限制访问所有简历模板</p>\n <p>创建和编辑无限的简历</p><p>使用ai简历助手</p>`, order: 1, value: 2 },
      { id: 3, title: '终身会员', price: '198', type: '终身', description: `<p>无限制访问所有简历模板</p>\n <p>创建和编辑您的简历</p><p>AI简历助手无限制使用</p>`, order: 0, value: 3 },
    ])
    const selectedPlan = ref(2)
    const faq = ref([
      { id: '1', title: '奈思简历（NiceCV.cn）是什么？', content: `<p>奈思简历NiceCV 是一个在线简历制作平台，提供超多制作精心制作可修改定制的简历模板，借助奈思简历NiceCV，您可以自信、专业地展示自己，给潜在雇主留下难忘的印象。NiceCV旨在帮助像您这样的求职者发挥潜力并获得梦想的职位，同时节省简历制作的时间。</p> <br /> <p>奈思简历NiceCV 的主要功能有：创建、编辑和下载简历；原创设计的专业简历模板；简历制作的ai助手。</p>` },
      { id: '2', title: '我可以使用哪些免费功能？', content: `<p>奈思简历NiceCV提供免费的在线简历模板，可免费编辑保存，如果需要下载保存为PDF文件则需购买VIP会员。另外奈思简历NiceCV还提供免费的ai求职工具，帮你节约写简历的时间。</p>` },
      { id: '3', title: '哪些功能需要开通VIP会员才能使用？', content: `<p>奈思简历NiceCV 提供丰富的简历模板，这些模板都是原创设计，您仅需购买月会员就可以使用。开通会员后，您可以使用所有的简历模板，制作好的简历可保存为PDF，您也可以分享简历的在线版本。简历提供A4尺寸、手机尺寸两个规格，你可以根据实际情况选择使用。</p>` },
      { id: '4', title: '开通VIP会员后会自动续费吗？', content: `<p>不会，你可以选择月会员、年会员和终身会员，月会员时间为30天，年会员时间为365天，终身会员为永久有效，会员到期后VIP功能自动停止使用。</p>` },
      { id: '5', title: '有哪些付款方式？', content: `<p>您可以使用多种支付方式，包括 微信 和 支付宝。</p>` },
      { id: '6', title: '是否支持退款？', content: `<p>当前不支持退款服务，如确有退款需求的，请添加我们的官方微信客服（Nicecv_cn）或给我们发邮件（hi@nicecv.cn），说明理由以及写明你的用户ID（可以点击顶部导航用户头像进入个人中心，然后点击个人设置查看用户ID）。</p>` },
    ])
    const selectedFAQ = ref(['1', '2', '3', '4', '5', '6'])

    function SubscribeWrapper() {
      return (
        <VIntro
          title={'升级为VIP会员'}
          subtitle={''}
          caption={'会员可无限制使用所有精美简历模板，更新您的简历，获得梦想的职位。'}
          center={true}
          gap={1.25}
          class={'mb-10'}
          v-slots={{
            default: () => (
        <VRow>
          {items.value.map(item => {
            const isMain = computed(() => item.order)
            return (
              <VCol cols={12} lg={ isMain.value ? 6 : 3} md={ isMain.value ? 4 : 4} sm={ isMain.value ? 4 : 4 }
                // order={isMain.value ? 1 : 2}
              >
                <VHover  v-slots={{ default: ({ isHovering, props }) => {
                  const selected = computed(() => {
                    if(item.value === selectedPlan.value) return true
                    if(isHovering) return true
                    return false
                  })
                  const styles = computed(() => {
                    const isDark = computed(() => useTheme().global.name.value === 'dark')
                    if(selected.value) {
                      if(isDark) {
                        return {
                          bgColor: '#fed7aa',
                          color: '#000000'
                        }
                      } else {
                        return {
                          bgColor: '#fed7aa',
                          color: '#000000'
                        }
                      }
                    } else {
                        if(isDark) {
                          return {
                            bgColor: '#111827',
                            color: '#fed7aa'
                          }
                        } else {
                          return {
                            bgColor: '#111827',
                            color: '#fed7aa'
                          }}
                        }
                  })

                  return (
                    <VSheet
                      {...props}    
                      key={item.id}
                      onClick={() => {selectedPlan.value = item.value }}
                      style={{
                        transition: 'all .2s ease-in'
                      }}
                      class={'pa-8'}
                      color={styles.value.bgColor}
                      style={{ border: '4px solid #111827'}}
                      rounded={'xl'}
                      border
                    >
                      <div class={'d-flex flex-column align-center justify-space-between'} style={{ gap: '1.25rem', color: styles.value.color }}>
                        <div class={'text-h6'}>{item.title}</div>
                        <div class={'d-flex align-baseline'}>
                          <div class={'text-h4'}  style={{ fontWeight: 'bolder !important'}}>¥</div>
                          <div class={'text-h2'}  style={{ fontWeight: 'bolder !important'}}>{item.price}</div>
                        </div>
                        <div class={'text-body-1 font-weight-black'}>{item.type}</div>
                        <div class={'d-flex flex-column align-center text-body-2'} style={{ gap: '.5rem' }} v-html={item.description } /> 
                        <div class={'d-flex'}>
                          <VBtn  variant={'flat'} color={styles.value.color} size={'large'} active={isHovering}>开通{item.type}会员</VBtn>
                        </div>
                      </div>
                    </VSheet> 
                  )
                }}} />
              </VCol>
            )
          })}
        </VRow>
), 
            prepend: () => <div class={'text-grey'}>NiceCV PRO</div>
          }}
        />
      )
    }





    function FAQWrapper() {
      return (
        <VIntro title={'常见问题'} caption={'常见问题解答'} center={true} v-slots={{ prepend: () => <div class={'text-grey'}>FAQ</div>}}>
          <VRow>
            <VCol cols={12}>
            {faq.value.map(item => (
              <div class={'pa-4 d-flex flex-column '} style={{ gap: '1rem' }}>
                <div class={'text-h6 font-weight-black'}>{item.title}</div>
                <div class={'text-body-2'} v-html={item.content} />
                <VDivider />
              </div>
            ))}
            </VCol>
          </VRow>
        </VIntro>
      )
    }

    return () => (
      <VContainer class='fill-height' style='gap: 4rem'>
        <SubscribeWrapper />
        <NeedVIP />
        <FAQWrapper />
      </VContainer>
    )
  }
})
