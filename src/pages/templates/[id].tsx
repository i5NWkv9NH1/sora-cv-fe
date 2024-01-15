import {
  VBtn,
  VBtnGroup,
  VCard,
  VCarousel,
  VCarouselItem,
  VCol,
  VContainer,
  VImg,
  VRow,
  VSkeletonLoader
} from 'vuetify/lib/components/index.mjs'
import { Article, VSection } from '~/components'
import { templateData } from '~/data'
import type { UIState } from '~/types'
import { UIStateEmpty, UIStateError } from '~/widgets'

export default defineComponent({
  setup() {
    const id = useRoute().params.id

    const template = ref(templateData.detail)
    const recommend = ref(templateData.recommend)
    const articles = ref(templateData.articles)

    const uiState = ref<UIState>('ok')
    const carousel = ref(0)

    const documentTitle = computed(() => `简历 | ${template.value.file_name}`)

    useSeoMeta({ title: documentTitle.value })

    //* SSR
    function TextIntro() {
      return (
        <div class={'d-flex flex-column flex-wrap'}>
          <div class={'text-h4'}>{template.value.file_name}</div>
          <div class={'text-subtitle-1'}>{template.value.title}</div>
          <div class={'profession-category'}>
            <span>分类：</span>
            {template.value.job_category.map((category) => (
              <span key={category.category_id}>{category.name} | </span>
            ))}
          </div>
          <div class={'job-category'}>
            <span>适用岗位：</span>
            {template.value.style_category.map((category) => (
              <span key={category.category_id}>{category.name} | </span>
            ))}
          </div>
          <div class={'profession-category'}>
            <span>适用经验：</span>
            {template.value.profession_category.map((category) => (
              <span key={category.category_id}>{category.name} | </span>
            ))}
          </div>
          <div class={'published'}>{template.value.publish_time_format}</div>
          <div class={'published'}>{template.value.selling_point}</div>
        </div>
      )
    }

    function Carousel() {
      return (
        <>
          <VCarousel
            v-model={carousel.value}
            hideDelimiters
            showArrows={'hover'}
            height={'400'}
          >
            {template.value.image.map((item) => (
              <VCarouselItem src={item.file_path} width={'100%'} />
            ))}
          </VCarousel>
          <div class={'d-flex justify-space-evenly'}>
            {/* {template.value.image.map((item) => (
              <VImg src={item.file_path} width={75} height={50} />
            ))} */}
            {template.value.image.map((item, index) => (
              <VBtn
                size={'x-large'}
                rounded={'lg'}
                class={'mr-1'}
                width={80}
                height={60}
                ripple={false}
                variant={index === carousel.value ? 'outlined' : 'text'}
                //@ts-ignore
                onClick={() => {
                  carousel.value = index
                }}
              >
                <VImg src={item.file_path} width={75} height={50} />
              </VBtn>
            ))}
          </div>
        </>
      )
    }

    //* Client
    //* UI State
    function Recommend() {
      const UIStateWrapper = () => {
        switch (uiState.value) {
          case 'error':
            return <UIStateError />
          case 'empty':
            return <UIStateEmpty />
          case 'loading':
            return (
              <>
                {Array.from({ length: 3 }).map((item) => (
                  <VCol cols={12} lg={4}>
                    <VSkeletonLoader type={'card'} />
                  </VCol>
                ))}
              </>
            )
          case 'ok':
            return (
              <>
                {recommend.value.data.map((item) => (
                  <VCol cols={12} lg={4}>
                    <VCard>123</VCard>
                  </VCol>
                ))}
              </>
            )
          default:
            return <></>
        }
      }

      return (
        <VSection title={'更多模板推荐'}>
          <VRow>
            <UIStateWrapper />
          </VRow>
        </VSection>
      )
    }

    function Articles() {
      const UIStateWrapper = () => {
        switch (uiState.value) {
          case 'error':
            return <UIStateError />
          case 'empty':
            return <UIStateEmpty />
          case 'loading':
            return (
              <>
                {Array.from({ length: 4 }).map((item) => (
                  <VCol cols={12} lg={6}>
                    <VSkeletonLoader type={'article'} />
                  </VCol>
                ))}
              </>
            )
          case 'ok':
            return (
              <>
                {articles.value.data.map((article) => (
                  <VCol cols={12} lg={6}>
                    <Article />
                  </VCol>
                ))}
              </>
            )
          default:
            return <></>
        }
      }

      return (
        <VSection title={'求职攻略'}>
          <VRow>
            <UIStateWrapper />
          </VRow>
        </VSection>
      )
    }

    return () => (
      <VContainer class='fill-height' style='gap: 4rem'>
        <VSection title={'模板详情'}>
          <VRow>
            <VCol cols={12} lg={6} md={6}>
              <TextIntro />
            </VCol>
            <VCol cols={12} lg={6} md={6}>
              <Carousel />
            </VCol>
          </VRow>
        </VSection>
        <Recommend />
        <Articles />
      </VContainer>
    )
  }
})
