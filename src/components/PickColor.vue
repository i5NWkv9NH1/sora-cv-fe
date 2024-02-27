<script setup lang="ts">
interface Props {
  color?: string
}
const props = withDefaults(defineProps<Props>(), {
  color: '#ff00ffff',
})
const emits = defineEmits(['update:color'])
const color = ref(props.color)
watch(() => props.color, () => color.value = props.color)
watch(color, newColor => emits('update:color', newColor))
</script>

<template>
  <VMenu offset="10" transition="slide-y-transition" :close-on-content-click="false">
    <template #activator="args">
      <div class="d-flex align-center gap-2 mr-4">
        <VBtn v-bind="args.props" :variant="args.isActive ? 'tonal' : 'text'">
          <VIcon start>
            mdi-invert-colors
          </VIcon>
          <span>修改主题色</span>
        </VBtn>
        <VAvatar :color="color" size="x-small" />
      </div>
    </template>
    <VSheet>
      <VColorPicker v-model="color" />
    </VSheet>
  </VMenu>
</template>
