<script setup lang="ts">
import type { VCardTitle } from 'vuetify/lib/components/index.mjs';
import type { Article } from '~/types';


type Props = {
  item: Article
}

const props = withDefaults(defineProps<Props>(), {
  item(props) {
    return {
      title: '专业技能书写指南',
      subtitle: '编写个人简历时，在专业技能部分，应该突出你拥有的与目标职位相关的技能。以下是一些编写专业技能部分的建议：关联技能与职位要求： 首先，仔细审视目标职位的要求和描述。将你拥有的技能与这些要求对应起来，并在简历中突出展示这些技能。确保强调的技能与所申请的职位密切相关。分类技能： 将你的专业技能分成不同的类别。...',
      createdAt: '2023-11-20',
      publishedAt: '2023-11-21',
      stats: {
        view: 108,
        like: 1
      },
      thumbnailUrl: 'https://www.nicecv.cn/api/web/uploads/202311202136248781b8480.jpg'
    }
  },
})
</script>

<template>
  <!-- <VRow>
    <VCol cols="12" lg="4">
      <VImg :src="item.thumbnailUrl" />
    </VCol>
    <VCol cols="12" lg="8">
      <VList lines="three" rounded="xl">
        <VListItem to="/">
          <VListItemTitle>{{ item.title }}</VListItemTitle>
          <VListItemSubtitle>{{ item.subtitle }}</VListItemSubtitle>
          <VListItemSubtitle class="meta d-flex align-center my-4">
            <div class="meta-date">
              <VIcon start size="12">mdi-heart-outline</VIcon>
              <span>{{ item.publishedAt }}</span>
            </div>
            <div class="meta-view">
              <VIcon start size="12">mdi-heart-outline</VIcon>
              <span>{{ item.stats.view }}</span>
            </div>
            <div class="meta-like">
              <VIcon start size="12">mdi-heart-outline</VIcon>
              <span>{{ item.stats.like }}</span>
            </div>
          </VListItemSubtitle>
        </VListItem>

      </VList>
    </VCol>
  </VRow> -->
  <VCard hover>
    <VRow class="d-flex" style="width: 100%">
      <VCol cols="12" lg="6" class="pa-0">
        <VImg :src="item.thumbnailUrl" />
      </VCol>
      <VCol cols="12" lg="6">
        <div class="text-h6 font-weight-bold">{{ item.title }}</div>
        <VListItemSubtitle>{{ item.subtitle }}</VListItemSubtitle>
        <div class="meta d-flex align-center my-4">
          <div class="meta-date">
            <VIcon start size="12">mdi-heart-outline</VIcon>
            <span>{{ item.publishedAt }}</span>
          </div>
          <div class="meta-view">
            <VIcon start size="12">mdi-heart-outline</VIcon>
            <span>{{ item.stats.view }}</span>
          </div>
          <div class="meta-like">
            <VIcon start size="12">mdi-heart-outline</VIcon>
            <span>{{ item.stats.like }}</span>
          </div>
        </div>
      </VCol>
    </VRow>
  </VCard>
</template>
