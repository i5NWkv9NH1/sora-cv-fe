<!--
  TODO：更新
 -->
<script setup lang="ts">
import { v4 } from 'uuid'
import Draggle from 'vuedraggable'
interface Props {
  // * dialog
  modelValue?: boolean
  // * sortable items
  items?: any[]
  title?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '模块排序',
  items: () => [
    { id: v4(), color: 'red', title: 'A', value: 1 },
    { id: v4(), color: 'yellow', title: 'B', value: 2 },
    { id: v4(), color: 'blue', title: 'C', value: 3 },
    { id: v4(), color: 'green', title: 'D', value: 4 },
  ],
})
const emits = defineEmits(['update:modelValue', 'update:items'])
const dialog = ref(props.modelValue)
const copyItems = ref(props.items)
watch(() => props.modelValue, () => dialog.value = props.modelValue)
watch(dialog, () => emits('update:modelValue', dialog.value))
watch(() => props.items, () => copyItems.value = props.items)
watch(copyItems, () => emits('update:items', copyItems.value))

const activeElement = ref(null)

const dragOptions = ref({
  animation: 400,
  group: 'draggable',
  disabled: false,
  ghostClass: 'ghost',
})

function handleSelect({ oldIndex }: { oldIndex: number }) {
  activeElement.value = copyItems.value[oldIndex]
}
function handleUnSelect(e: any) {
  activeElement.value = null
}
</script>

<template>
  <VDialog
    v-model="dialog"
    fullscreen
  >
    <VContainer class="fill-height">
      <VCard
        width="400"
        class="mx-auto"
      >
        <VCardTitle>
          <div class="d-flex align-center">
            <!-- <VIcon start>
              mdi-format-list-bulleted
            </VIcon> -->
            <BasicCardTitleSymbol />
            {{ props.title }}
            <VSpacer />
            <VBtn
              variant="text"
              @click="dialog = false"
              icon
            >
              <VIcon>mdi-close</VIcon>
            </VBtn>
          </div>
        </VCardTitle>
        <VCardText>
          <!-- * icon: mdi-sort-variant -->
          <VList>
            <!-- ! 不要在里面写注释，会被当做 slot 渲染 😂 -->
            <Draggle
              key="draggable"
              v-model="copyItems"
              item-key="id"
              v-bind="dragOptions"
              @choose="handleSelect"
              @unchoose="handleUnSelect"
            >
              <!-- <VListItem :key="element.value" :title="element.title || element.name" prepend-icon="mdi-sort-variant" class="cursor-move" :active="element === activeElement" /> -->
              <template #item="{ element, index }: { element: any; index: number }">
                <VListItem
                  :key="element.value"
                  :title="element.title || element.name"
                  :prepend-icon="`mdi-numeric-${index + 1}`"
                  class="cursor-move"
                  :active="element === activeElement"
                />
              </template>
            </Draggle>
          </VList>
        </VCardText>
      </VCard>
    </VContainer>
  </VDialog>
</template>
