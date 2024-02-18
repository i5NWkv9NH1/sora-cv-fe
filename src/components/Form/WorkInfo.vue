<script setup lang="ts">
import Draggle from 'vuedraggable'
import { mockWorkItem } from '~/mocks'

const dialog = ref(false)
const name = ref('工作经历')
const isEditing = ref(false)

const items = ref(mockWorkItem)
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
          <ModifiyModuleNameDialog v-model:modelValue="dialog" v-model:name="name" />
          <VListSubheader>列出你认为最重要最近几年的工作经历，最新放在最前面，突出工作以及项目中的亮点。</VListSubheader>
          <VListSubheader @click="dialog = true" class="cursor-pointer">
            <span>{{ name }}</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>
          <VListSubheader>
            <NuxtLink to="/" class="text-primary">
              经历书写指南
            </NuxtLink>
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
                <VListItemTitle>厦门奈思科技有限公司 - ui设计实习生</VListItemTitle>
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
                      公司名称
                    </div>
                    <VTextField density="compact" variant="outlined" hide-details />
                  </div>
                </VCol>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      职位名称
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
                      placeholder="公司主营业务为线上电商，产品主要有陶瓷茶具与关联产品。本人负责线上产品视觉展示，首页和详情设计和修改。线下物料延展，部分节气海报绘制。"
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
