<!--
  TODO：优化UI
 -->

<script setup lang="ts">
const { vips, faqs } = useData()
const selectedPlan = ref(vips.value[0])

useSeoMeta({ title: 'VIP会员' })
</script>

<template>
  <VContainer class="fill-height gap-32">
    <!-- * 介绍 -->
    <ThreeLineParagraph title="升级为VIP会员" subtitle="" caption="会员可无限制使用所有精美简历模板，更新您的简历，获得梦想的职位。" center>
      <template #prepend>
        NiceCV PRO
      </template>

      <!-- *广告卡片 -->
      <VItemGroup v-model="selectedPlan" mandatory>
        <VRow>
          <VItem v-for="vip in vips" :key="vip.id" :value="vip" v-slot="{ isSelected, toggle }">
            <VCol cols="12" :lg="vip.order ? 6 : 3" md="4" sm="4">
              <VipAdCard :item="vip" :toggle="toggle" :is-selected="isSelected" />
            </VCol>
          </VItem>
        </VRow>
      </VItemGroup>
    </ThreeLineParagraph>

    <!-- * 广告 -->
    <VipAd />

    <!-- * FAQ -->
    <ThreeLineParagraph title="常见问题" subtitle="" caption="常见问题解答" center>
      <!-- <template #prepend>
        NiceCV PRO
      </template> -->

      <VRow>
        <VCol cols="12">
          <div class="pa-4 d-flex flex-column gap-4" v-for="faq in faqs" :key="faq.id">
            <div class="text-h6 font-weight-black">
              {{ faq.title }}
            </div>
            <div class="text-body-2" v-html="faq.content" />
            <VDivider />
          </div>
        </VCol>
      </VRow>
    </ThreeLineParagraph>
  </VContainer>
</template>

<style lang="scss" scoped></style>
