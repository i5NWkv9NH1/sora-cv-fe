import {
  VBtn,
  VCard,
  VCarousel,
  VCarouselItem,
  VCol,
  VContainer,
  VIcon,
  VImg,
  VRow,
  VSkeletonLoader
} from 'vuetify/lib/components/index.mjs'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { VArticle, VSection, VTemplate } from '~/components'
import { templateData } from '~/data'
import type { IArticle, IUIState } from '~/types'
import { UIStateEmpty, UIStateError } from '~/widgets'

export default defineComponent({
  setup() {
    const id = useRoute().params.id

    const template = ref(templateData.detail)
    const recommend = ref(templateData.recommend)
    const articles = ref(templateData.articles)

    const uiState = ref<IUIState>('ok')
    const carousel = ref(0)

    const { mobile } = useDisplay()

    useSeoMeta({ title: `${template.value.title}` })

    //* SSR
    function TextIntro() {
      return (
        <div class={'d-flex flex-column flex-wrap '} style={{ gap: '2rem' }}>
          <div class='d-flex flex-column'>
            <div class={'text-h4 font-weight-bold text-uppercase'}>
              {template.value.file_name}
            </div>
            <div class={'text-subtitle-1'}>{template.value.title}</div>
          </div>

          <div
            class={'text-body-2 d-flex flex-column'}
            style={{ gap: '.5rem' }}
          >
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
            <div class={'published'}>
              <span>发布时间：</span>
              <span>{template.value.publish_time_format}</span>
            </div>
          </div>

          <div class={'text-body-1 text-info'}>
            {template.value.selling_point}
          </div>

          <div class={'d-flex my-4'} style={{ gap: '1rem' }}>
            <VBtn>使用模板</VBtn>
            <VBtn>
              <VIcon start>mdi-heart-outline</VIcon>
              <span>收藏模板</span>
            </VBtn>
          </div>
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
            height={400}
          >
            {template.value.image.map((item) => (
              <VCarouselItem src={item.file_path} width={'100%'} cover />
            ))}
          </VCarousel>
          <div
            class={['d-flex my-4 pa-4']}
            style={[
              {
                overflowX: mobile.value ? 'scroll' : 'unset',
                justifyContent: !mobile.value ? 'space-evenly' : 'start'
              }
            ]}
          >
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
                <VImg
                  src={item.file_path}
                  width={75}
                  height={50}
                  class={'rounded-lg'}
                />
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
                {recommend.value.data.map((item) => {
                  const tags = item.style_category.map(tag => {
                    return { id: tag.category_id, name: tag.name }
                  })
                  const _item = {
                    id: item.goods_id,
                    title: item.goods_name,
                    description: item.title,
                    thumbnailUrl: item.goods_image,
                    publishedAt: item.publish_time,
                    createdAt: item.publish_time,
                    tags
                  }
                  return (
                    <VCol cols={12} lg={4}>
                      <VTemplate item={_item} />
                    </VCol>
                  )
                })}
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
                    <VSkeletonLoader type={'image,article'} />
                  </VCol>
                ))}
              </>
            )
          case 'ok':
            return (
              <>
                {articles.value.data.map((item) => {
                  const _article: IArticle = {
                    id: item.article_id,
                    title: item.article_title,
                    subtitle: item.seo_desc,
                    createdAt: item.view_time,
                    publishedAt: item.view_time,
                    stats: {
                      view: item.show_views,
                      like: item.dian_zan
                    },
                    thumbnailUrl: item.image.file_path
                  }

                  return (
                    <VCol cols={12} lg={6} md={6} sm={6}>
                      <VArticle key={_article.id} item={_article} />
                    </VCol>
                  )
                })}
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
            <VCol cols={12} lg={5} md={6} sm={4}>
              <TextIntro />
            </VCol>
            <VCol cols={12} lg={7} md={6} sm={8}>
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
