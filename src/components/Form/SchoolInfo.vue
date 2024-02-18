<script setup lang="ts">
import Draggle from 'vuedraggable'

const dialog = ref(false)
const name = ref('校内实践')
const isEditing = ref(false)

const items = ref([])
// * 表单选择项目数据
// * 编辑和新增的表单数据
const form = {
}

const activeItem = ref()
const dragOptions = ref({
  animation: 400,
  group: 'draggable',
  disabled: false,
  ghostClass: 'ghost',
})

function handleSelect({ oldIndex }: { oldIndex: number }) {
  activeItem.value = items.value[oldIndex]
}
function handleUnSelect(e: any) {
  activeItem.value = null
}
function handleSave() {
  isEditing.value = false
  // * 添加项
}
</script>

<template>
  <VContainer class="fill-height" fluid>
    <VRow class="fill-width" no-gutters>
      <VCol cols="12" lg="12" md="12" sm="12">
        <VList class="py-0" density="compact" lines="three">
          <ModifiyModuleNameDialog v-model:modelValue="dialog" v-model:name="name" :items="[]" />
          <VListSubheader>列出你在学校中参与的实践项目、个人项目、或工作中参与的项目。</VListSubheader>
          <VListSubheader @click="dialog = true" class="cursor-pointer">
            <!-- <VBtn class="text-caption cursor-pointer" @click="dialog = true" variant="text">
              <span>{{ name }}</span>
              <VIcon end>mdi-square-edit-outline</VIcon>
            </VBtn> -->
            <span>{{ name }}</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>

          <Draggle
            key="draggable" v-model="items" item-key="id" v-bind="dragOptions" @choose="handleSelect"
            @unchoose="handleUnSelect"
          >
            <template #item="{ element, index }: { element: any; index: number }">
              <VListItem variant="outlined" rounded="lg" class="mt-4" :active="activeItem === element">
                <template #prepend>
                  <VIcon>mdi-sort-variant</VIcon>
                </template>
                <VListItemTitle>校园A - 本科</VListItemTitle>
                <VListItemSubtitle>厦门 - 2020/11/11 - 2023/11/11</VListItemSubtitle>
                <template #append>
                  <VBtn variant="text" class="mr-2" color="primary" icon>
                    <VIcon>mdi-pencil-outline</VIcon>
                  </VBtn>
                  <VBtn variant="text" color="warning" icon>
                    <VIcon>mdi-delete-outline</VIcon>
                  </VBtn>
                </template>
              </VListItem>
            </template>
          </Draggle>
        </VList>
      </VCol>
    </VRow>
    <VRow class="fill-width">
      <VCol cols="12" lg="12" md="12" sm="12">
        <!-- * 添加新的项 -->
        <template v-if="isEditing">
          <VSheet>
            <VForm>
              <!-- * -->
              <VRow>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      经历名称
                    </div>
                    <VTextField density="compact" variant="outlined" hide-details />
                  </div>
                </VCol>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      你的角色
                    </div>
                    <VTextField density="compact" variant="outlined" hide-details />
                  </div>
                </VCol>
              </VRow>

              <!-- * -->
              <VRow>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      所在部门
                    </div>
                    <VTextField density="compact" variant="outlined" hide-details />
                  </div>
                </VCol>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      所在城市
                    </div>
                    <VTextField density="compact" variant="outlined" hide-details />
                  </div>
                </VCol>
              </VRow>

              <VRow>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      在读时间（起始时间）
                    </div>
                    <TextFieldDate />
                  </div>
                </VCol>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      在读时间（结束时间）
                    </div>
                    <TextFieldDate />
                  </div>
                </VCol>
              </VRow>

              <VRow>
                <VCol cols="12">
                  <div>
                    <div class="text-subtitle-2">
                      经历描述（支持 Markdown）
                    </div>
                    <VTextarea
                      variant="outlined"
                      placeholder="校园经历"
                      rows="8"
                      clearable
                    />
                  </div>
                </VCol>
              </VRow>

              <VRow no-gutters>
                <VCol cols="6">
                  <VBtn color="primary" @click="handleSave" block>
                    保存
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VSheet>
        </template>
        <template v-else>
          <VBtn @click="isEditing = true" class="my-4" block color="primary">
            添加新的{{ name }}
          </VBtn>
        </template>
      </VCol>
    </VRow>
  </VContainer>
</template>
