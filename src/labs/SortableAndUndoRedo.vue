<script setup lang="ts">
import Draggle from 'vuedraggable';
import hljs from 'highlight.js';
import 'highlight.js/styles/xcode.css'; // ここでデザインを変更
import type { PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array as PropType<Item[]>,
    required: true
  }
})
const items = ref<Item[]>(props.modelValue)
const emits = defineEmits([
  'update:modelValue'
])


const dragOptions = ref({
  animation: 400,
  group: 'draggable',
  disabled: false,
  ghostClass: 'ghost',
});
type Item = {
  id: string | number
  name: string
  color: string
}


// const { history, undo, redo, canRedo, canUndo } = useRefHistory(items, { deep: true })

watch(props, (newProps) => {
  // items.value = newProps.modelValue
  items.value = props.modelValue
})
watch(items, (value) => {
  emits('update:modelValue', value)
})

// const historyJson = computed(() => JSON.stringify((history.value), null, 2))
// const highlightItems = computed(() =>
//   items.value?.length !== 0 && hljs.highlightAuto(JSON.stringify(items.value, null, "\t"), ['JSON']).value
// );
// const highlightHistorys = computed(() =>
//   items.value?.length !== 0 && hljs.highlightAuto(JSON.stringify(history.value, null, "\t"), ['JSON']).value
// );


</script>

<template>
  <VContainer class="fill-height">
    <VCard width="100%" height="100%">
      <VCardTitle>Sortable and HistoryRef</VCardTitle>
      <VCardText>
        <VRow>
          <!-- <VCol>
            <ClientOnly>
              <VSheet>
                <VListSubheader>items</VListSubheader>
                <pre v-html="highlightItems" />
              </VSheet>
            </ClientOnly>
          </VCol>
          <VCol>
            <VSheet elevation="8" class="pa-4" :style="{ overflowY: 'scroll', height: `750px` }">
              <VListSubheader>History</VListSubheader>
              <pre v-html="highlightHistorys" />
            </VSheet>
          </VCol> -->
          <VCol>
            <VList>
              <Draggle v-model="items" item-key="id" key="draggable" v-bind="dragOptions">
                <template #item="{ element }: { element: Item }">
                  <VListItem :title="element.name" :key="element.id" :active="true" :color="element.color"
                    prepend-icon="mdi-sort-variant" class="item" />
                </template>
              </Draggle>
            </VList>
          </VCol>
        </VRow>
      </VCardText>
      <!-- <VCardActions>
        <VBtn @click="undo" :disabled="!canUndo" color="primary">Undo</VBtn>
        <VBtn @click="redo" :disabled="!canRedo" color="primary">Redo</VBtn>
      </VCardActions> -->
    </VCard>
  </VContainer>
</template>

<style lang="scss" scoped>
.item {
  cursor: move;
}
</style>
