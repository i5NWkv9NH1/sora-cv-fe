<script setup lang="tsx">
import { VDivider } from 'vuetify/components'

const props = withDefaults(defineProps<{ content: string; gap: number }>(), {
  content: `
	<p>我们不断为各行业从业者制作各种风格的精美简历，</p>
	<p>开通VIP会员后您可以使用所有的模板。</p>
	`,
  gap: 1.25
})

function Lines() {
  return (
    <div
      class={'d-flex flex-column text-center font-weight-black font-body-2 pa-4'}
      style={{ width: '100%', gap: `${props.gap}rem` }}
    >
      <VDivider class={'fill-width'} />
      <div class={'my-4'}
        v-html={props.content}
      />
      <VDivider class={'fill-width'} />
    </div>
  )
}
</script>

<template>
  <Lines />
</template>
