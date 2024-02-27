<!--
  ! SSR
  TODO: 优化UI
 -->

<script setup lang="ts">
useSeoMeta({ title: '可轻松在线制作您的精美个人简历，更好的介绍您自己' })

const { thumbnailUrl, intros, recommendTemplates, recommendAIs } = useData()
</script>

<template>
  <VContainer class="fill-height gap-16">
    <!-- * 三行文本介绍 + 封面图 -->
    <VRow align="center" justify="space-between">
      <VCol>
        <ThreeLineParagraph :gap="4" title="轻松在线制作" subtitle="您的精美个人简历" caption="节省简历制作的时间，帮助您更好的介绍自己，获得梦想的职位。">
          <VBtn to="/signin" width="50%" active color="primary">
            创建您的简历 🚀
          </VBtn>
        </ThreeLineParagraph>
      </VCol>
      <VCol class="hidden-md-and-down">
        <VImg :src="thumbnailUrl" />
      </VCol>
    </VRow>

    <!-- * 功能卡片介绍 -->

    <VSection>
      <VRow>
        <VCol v-for="(item, index) in intros" :key="item.id" cols="12" lg="4" md="4" sm="6">
          <VCard :color="item.color" rounded="xl" hover>
            <VCardText>
              <div class="d-flex flex-column pa-4 text-center  text-center">
                <VImg
                  :src="item.thumbnailUrl" width="100%" height="220"
                  class="my-2" :class="[Boolean(index % 2) && 'order-1']"
                />
                <div class="'text-h6 font-weight-bold'">
                  {{ item.title }}
                </div>
                <div class="'text-subtitle-2 mt-2'">
                  {{ item.subtitle }}
                </div>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VSection>

    <!-- * 广告 -->
    <VipAd />

    <!-- * 推荐模板预览 -->
    <VSection>
      <VRow>
        <VCol v-for="template in recommendTemplates" :key="template.id" cols="12" lg="4" md="4" sm="6">
          <TemplateCard :item="template" />
        </VCol>
      </VRow>
      <div class="d-flex justify-center">
        <VBtn to="/templates" color="primary" active>
          查看全部模板
        </VBtn>
      </div>
    </VSection>

    <!-- * AI工具 -->
    <VSection>
      <VRow>
        <VCol v-for="ai in recommendAIs" :key="ai.id" cols="12" lg="4" md="4" sm="6">
          <VCard width="100%" :to="`/ai/${ai.id}`">
            <VCardText>
              <div
                class="d-flex flex-column  align-center  pa-4 text-center"
              >
                <VImg :src="ai.thumbnailUrl" width="120" height="120" class="my-4" />
                <div class="text-h6 font-weight-bold">
                  {{ ai.name }}
                </div>
                <div class="text-subtitle-1">
                  {{ ai.description }}
                </div>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
      <div class="d-flex justify-center">
        <VBtn to="/ais" color="primary" active>
          查看全部模板
        </VBtn>
      </div>
    </VSection>
  </VContainer>
</template>
