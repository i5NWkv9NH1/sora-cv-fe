<!--
  TODO: add category chip
 -->

<script setup lang="tsx">
import { VOverlay } from 'vuetify/lib/components/index.mjs'
import { type Article, mockArticle } from '~/mocks'

interface Props {
  item?: Article
}
const props = withDefaults(defineProps<Props>(), {
  item: () => mockArticle,
})
</script>

<template>
  <!-- ! 注意不要解构，避免同名 props -->
  <VHover v-slot="args">
    <VCard
      width="100%"
      v-bind="args.props"
      :to="`/articles/${props.item.id}`"
      hover
    >
      <VRow
        class="fill-height"
        no-gutters
      >
        <VCol
          cols="12"
          lg="6"
          md="6"
        >
          <VImg
            class="position-relative fill-height"
            transition="slide-y-transition"
            eager
            cover
          >
            <img
              :src="item.thumbnailUrl"
              class="fill-height"
              :style="{ width: '100%' }"
            >
            <VOverlay
              :model-value="args.isHovering"
              contained
              eager
              class="fill-height pa-2"
              scrim="black"
              transition="slide-y-transition"
            >
              <div class="d-flex flex-wrap gap-4">
                <VAvatar
                  v-for="i in 4"
                  :key="i"
                  color="primary"
                  rounded="lg"
                />
              </div>
            </VOverlay>
          </VImg>
        </VCol>
        <VCol
          cols="12"
          lg="6"
          md="6"
        >
          <div
            class="pa-4 fill-height d-flex flex-column justify-space-around "
            :style="{ gap: '.5rem' }"
          >
            <div class="text-h6 font-weight-bold">
              {{ item.title }}
            </div>
            <VListItemSubtitle
              class=" "
              :style="{ 'max-height': '4rem' }"
            >
              {{ item.description }}...
            </VListItemSubtitle>
            <VRow
              class="text-subtitle-2 text-grey"
              align="center"
            >
              <VCol cols="6">
                <VIcon
                  size="12"
                  start
                >
                  mdi-heart-outline
                </VIcon>
                <span>{{ item.publishedAt }}</span>
              </VCol>
              <VCol cols="3">
                <VIcon
                  size="12"
                  start
                >
                  mdi-heart-outline
                </VIcon>
                <span>{{ item.stats.view }}</span>
              </VCol>
              <VCol cols="3">
                <VIcon
                  size="12"
                  start
                >
                  mdi-heart-outline
                </VIcon>
                <span>{{ item.stats.like }}</span>
              </VCol>
            </VRow>
          </div>
        </VCol>
      </VRow>
    </VCard>
  </VHover>
</template>
