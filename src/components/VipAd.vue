<!--
  * 恰饭广告。。。
 -->

<script setup lang="ts">
interface Props {
  content?: string
  gap?: number
}
const props = withDefaults(defineProps<Props>(), {
  content: `
	<p>我们不断为各行业从业者制作各种风格的精美简历，</p>
	<p>开通VIP会员后您可以使用所有的模板。</p>
	`,
  gap: 6,
})
</script>

<template>
  <div
    class="d-flex flex-column text-center font-weight-black font-body-2 pa-4 fill-width" :class="[
      `gap-${props.gap}`,
    ]"
  >
    <VDivider class="fill-width" />
    <div class="my-4" v-html="props.content" />
    <VDivider class="fill-width" />
  </div>
</template>
