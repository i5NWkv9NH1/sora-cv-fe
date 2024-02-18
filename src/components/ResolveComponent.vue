<script setup lang="ts">
// ! 需要解析的组件导入到这里
// import { BasicInfo } from '#components'

interface Props {
  component?: string
}

const props = withDefaults(defineProps<Props>(), { component: 'FormBasicInfo' })
// ! 在 Nuxt.config.ts 设置好路径
// ! 注意是否带有文件夹的前缀名
const Comp = resolveComponent(props.component)
</script>

<template>
  <LazyClientOnly>
    <component :is="Comp" />
    <template #fallback>
      <VSkeletonLoader type="list-item@20" />
    </template>
  </LazyClientOnly>
</template>
