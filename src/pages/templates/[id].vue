<!--
  ! SSR
  TODO: 创建左栏简介和轮播图组件
  TODO: CAUSE NOT HOT RELOAD IN TSX
 -->
<!--
 -->

<script setup lang="tsx">
import { VBtn, VCarousel, VCarouselItem, VIcon, VImg } from 'vuetify/components'
import { useDisplay } from 'vuetify'
import { type Template, mockTemplateData } from '~/mocks'

const templateId = useRoute().params.id
const template = ref<Template>(mockTemplateData.detail)
const recommendTemplates = ref<Template[]>(mockTemplateData.recommend)
const articles = ref(mockTemplateData.articles.data)

const carousel = ref(1)
const { mobile } = useDisplay()

// * 左栏简介
function TextIntro() {
  return (
    <div class="d-flex flex-column flex-wrap gap-4">
      <div class="d-flex flex-column">
        <div class="text-h4 font-weight-bold text-uppercase">
          {template.value.title}
        </div>
        <div class="text-subtitle-1">{template.value.description}</div>
      </div>

      <div
        class="text-body-2 d-flex flex-column"
        style={{ gap: '.5rem' }}
      >
        <div class="profession-category">
          <span>分类：</span>
          {template.value.jobCategory.map(category => (
            <span key={category.id}>
{category.name}
{' '}
|
{' '}
            </span>
          ))}
        </div>
        <div class="job-category">
          <span>适用岗位：</span>
          {template.value.styleCategory.map(category => (
            <span key={category.id}>
{category.name}
{' '}
|
{' '}
            </span>
          ))}
        </div>
        <div class="experience-category">
          <span>适用经验：</span>
          {template.value.experienceCategory.map(category => (
            <span key={category.id}>
{category.name}
{' '}
|
{' '}
            </span>
          ))}
        </div>
        <div class="published">
          <span>发布时间：</span>
          <span>{template.value.publishedAtForamt}</span>
        </div>
      </div>

      <div class="text-body-1 text-info">
        {template.value.description}
      </div>

      <div class="d-flex my-4 gap-4">
        <VBtn>使用模板</VBtn>
        <VBtn>
          <VIcon start>mdi-heart-outline</VIcon>
          <span>收藏模板</span>
        </VBtn>
      </div>
    </div>
  )
}
// * 右栏轮播图
function Carousel() {
  return (
    <>
      <VCarousel
        v-model={carousel.value}
        hideDelimiters
        showArrows="hover"
        height={400}
      >
        {template.value.thumbnails.map(item => (
          <VCarouselItem src={item.src} width="100%" cover />
        ))}
      </VCarousel>
      <div
        class={['d-flex my-4 pa-4']}
        style={[
          {
            overflowX: mobile.value ? 'scroll' : 'unset',
            justifyContent: !mobile.value ? 'space-evenly' : 'start',
          },
        ]}
      >
        {template.value.thumbnails.map((item, index) => (
          <VBtn
            size="x-large"
            rounded="lg"
            class="mr-1"
            width={80}
            height={60}
            ripple={false}
            variant={index === carousel.value ? 'outlined' : 'text'}
            // @ts-expect-error
            onClick={() => {
              carousel.value = index
            }}
          >
            <VImg
              src={item.src}
              width={75}
              height={50}
              class="rounded-lg"
            />
          </VBtn>
        ))}
      </div>
    </>
  )
}

// * 获取对应id的模板详情
async function fetchTemplate() {
  const id = useRoute().params.id
  if (!id)
    return
  // * ...
}

useSeoMeta({ title: template.value.title })
</script>

<template>
  <LazyClientOnly>
    <VContainer class="fill-height gap-8">
      <!-- * 模板介绍、轮播图 两列布局 -->
      <VSection title="模板详情">
        <VRow>
          <VCol cols="12" lg="5" md="6" sm="4">
            <TextIntro />
          </VCol>
          <VCol cols="12" lg="7" md="6" sm="8">
            <Carousel />
          </VCol>
        </VRow>
      </VSection>

      <!-- * 推荐模板 -->
      <VRow>
        <VCol v-for="item in recommendTemplates" :key="item.id" cols="12" lg="3" md="4" sm="4">
          <TemplateCard :item="item" />
        </VCol>
      </VRow>

      <!-- * 推荐文章 -->
      <VRow>
        <VCol v-for="article in articles" cols="12" lg="6" md="6" sm="6">
          <ArticleCard :item="article" />
        </VCol>
      </VRow>
    </VContainer>
  </LazyClientOnly>
</template>
