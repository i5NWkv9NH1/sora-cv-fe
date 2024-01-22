// * 生成插槽
/**
 *
 *
 * ? 例子
 * ? 组件添加 class rainbow
 * ? 在组件内判断是否是loading, selected, clicked...等等
      <template v-if="isSelected">
        <Rainbow />
      </template>
 */
export default function () {
  return (
    <>
      <span class="top" />
      <span class="right" />
      <span class="bottom" />
      <span class="left" />
    </>
  )
}
