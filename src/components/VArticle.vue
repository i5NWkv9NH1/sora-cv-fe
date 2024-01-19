<script setup lang="tsx">
import { VOverlay } from 'vuetify/lib/components/index.mjs'
import type { IArticle } from '~/types'

interface Props {
  item: IArticle
}
const props = withDefaults(defineProps<Props>(), {
  item(props) {
    return {
      id: '1',
      title: '专业技能书写指南',
      subtitle: '编写个人简历时，在专业技能部分，应该突出你拥有的与目标职位相关的技能。以下是一些编写专业技能部分的建议：关联技能与职位要求： 首先，仔细审视目标职位的要求和描述。将你拥有的技能与这些要求对应起来，并在简历中突出展示这些技能。确保强调的技能与所申请的职位密切相关。分类技能： 将你的专业技能分成不同的类别。',
      createdAt: '2023-11-20',
      publishedAt: '2023-11-21',
      stats: {
        view: 108,
        like: 1,
      },
      thumbnailUrl: 'https://www.nicecv.cn/api/web/uploads/202311202136248781b8480.jpg',
      tags: [],
    }
  },
})
</script>

<template>
  <VHover v-slot="{ isHovering, props }">
    <VCard width="100%" v-bind="props" :to="`/articles/${item.id}`" hover>
      <VRow class="fill-height" no-gutters>
        <VCol cols="12" lg="6" md="6">
          <VImg class="position-relative fill-height" transition="slide-y-transition" eager cover>
            <img :src="item.thumbnailUrl" class="fill-height" :style="{ width: '100%' }">
            <VOverlay
              :model-value="isHovering" contained eager class="fill-height pa-2" scrim="black"
              transition="slide-y-transition"
            >
              <div class="d-flex flex-wrap gap-4">
                <VAvatar v-for="i in 4" :key="i" color="primary" rounded="lg" />
              </div>
            </VOverlay>
          </VImg>
        </VCol>
        <VCol cols="12" lg="6" md="6">
          <div class="pa-4 fill-height d-flex flex-column justify-space-around " :style="{ gap: '.5rem' }">
            <div class="text-h6 font-weight-bold">
              {{ item.title }}
            </div>
            <VListItemSubtitle class=" " :style="{ 'max-height': '4rem' }">
              {{ item.subtitle }}...
            </VListItemSubtitle>
            <VListItemSubtitle class="d-flex align-center text-caption" :style="{ gap: '1rem' }">
              <div class="meta-date">
                <VIcon size="12" class="mr-1">
                  mdi-heart-outline
                </VIcon>
                <span>{{ item.publishedAt }}</span>
              </div>
              <div class="meta-view">
                <VIcon size="12" class="mr-1">
                  mdi-heart-outline
                </VIcon>
                <span>{{ item.stats.view }}</span>
              </div>
              <div class="meta-like">
                <VIcon size="12" class="mr-1">
                  mdi-heart-outline
                </VIcon>
                <span>{{ item.stats.like }}</span>
              </div>
            </VListItemSubtitle>
          </div>
        </VCol>
      </VRow>
    </VCard>
  </VHover>
</template>
