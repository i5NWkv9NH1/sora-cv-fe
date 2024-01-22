<script setup lang="ts">
const dialog = ref(false)
// @ts-expect-error
const name = ref('工作经历')
const isEditing = ref(false)
</script>

<template>
  <VContainer class="fill-height" fluid>
    <VRow no-gutters>
      <VCol>
        <VList class="pa-0">
          <ModifiyModuleNameDialog v-model:modelValue="dialog" v-model:name="name" />

          <VListSubheader>列出你的教育经历，并不是所有经历都要写入，而需要选取该过程中的亮点</VListSubheader>
          <VListSubheader @click="dialog = true" class="cursor-pointer">
            <!-- <VBtn class="text-caption cursor-pointer" @click="dialog = true" variant="text">
              <span>{{ name }}</span>
              <VIcon end>mdi-square-edit-outline</VIcon>
            </VBtn> -->
            <span>教育经历</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>

          <VListItem lines="three" variant="outlined" rounded="lg" class="mt-4">
            <template #prepend>
              <VIcon>mdi-sort-variant</VIcon>
            </template>
            <VListItemTitle>厦门理工学院 - 中专</VListItemTitle>
            <VListItemSubtitle>视觉传达设计 - 2020/11/11 - 2023/11/11</VListItemSubtitle>
            <template #append>
              <VBtn variant="text" class="mr-2" icon>
                <VIcon>mdi-pencil-outline</VIcon>
              </VBtn>
              <VBtn variant="text" icon>
                <VIcon>mdi-delete-outline</VIcon>
              </VBtn>
            </template>
          </VListItem>

          <VBtn block @click="isEditing = true" class="my-4">
            添加新的{{ name }}
          </VBtn>
        </VList>
      </VCol>
    </VRow>
  </VContainer>
</template>
