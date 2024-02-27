import {
  VBtn,
  VCard,
  VCardText,
  VCol,
  VContainer,
  VImg,
  VRow
} from 'vuetify/lib/components/index.mjs'
import {
  ClientOnly,
  NeedVIP,
  ThreeLineParagraph,
  VSection,
  VTemplate
} from '#components'
export default defineComponent({
  setup() {
    useSeoMeta({ title: '首页' })

    const { indexPageState } = storeToRefs(useDataStore())

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
            <ThreeLineParagraph
              gap={4}
              title={'轻松在线制作'}
              subtitle={'您的精美个人简历'}
              caption={
                '节省简历制作的时间，帮助您更好的介绍自己，获得梦想的职位。'
              }
            >
              <VBtn
                to={'/signin'}
                width={'50%'}
              >
                创建您的简历
              </VBtn>
            </ThreeLineParagraph>
          </VCol>
          <VCol class='hidden-md-and-down'>
            <VImg src={indexPageState.value.thumbnailUrl} cover />
          </VCol>
        </VRow>
      )
    }
    function Intros() {
      return (
        <VSection>
          <VRow>
            {indexPageState.value.intros.map((item, index) => (
              <VCol cols={12} lg={4} md={4} sm={6} key={item.title}>
                <VCard color={item.color} flat>
                  <VCardText>
                    <div
                      class={
                        'd-flex flex-column text-center pa-4 text-center'
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
        </VSection>
      )
    }
    function Templates() {
      return (
        <VSection>
          <VRow>
            {indexPageState.value.templates.map((template) => (
              <VCol cols={12} lg={4} md={4} sm={6} key={template.id}>
                <VTemplate item={template} key={template.id} />
              </VCol>
            ))}
          </VRow>
          <div class={'d-flex justify-center'}>
            <VBtn to={'/templates'}>查看全部模板</VBtn>
          </div>
        </VSection>
      )
    }
    function AI() {
      return (
        <VSection>
          <VRow>
            {indexPageState.value.ais.map((item) => (
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
        </VSection>
      )
    }

    return () => (
      <VContainer class='fill-height' style='gap: 4rem'>
        <Cover />
        <Intros />
        <NeedVIP />
        <Templates />
        <AI />
      </VContainer>
    )
  }
})
