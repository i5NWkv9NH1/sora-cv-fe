<script setup lang="ts">
import Draggle from 'vuedraggable'
import { } from '~/mocks'

const softwareDialog = ref(false)
const professionalDialog = ref(false)
const softwareName = ref('软件技能')
const professionalName = ref('专业技能')

const newSoftware = ref('')
const softwares = ref<string[]>([
  'Adobe',
])

const isEditing = ref(false)

const items = ref([
  { id: '1', name: '' },
  { id: '1', name: '' },
])
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

function handleGenerate() {
  const exist = softwares.value.find(item => item === newSoftware.value)
  if (exist) {
    // * 当前已存在该标签
    // * Hint 输入框
    return
  }
  softwares.value.push(newSoftware.value)
  newSoftware.value = ''
}
function handleRemoveSoftware(item: string) {
  const index = softwares.value.indexOf(item)
  if (index !== -1)
    softwares.value.splice(index, 1)
}

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
  <VContainer
    class="fill-height py-0"
    fluid
  >
    <ModifiyModuleNameDialog
      v-model:modelValue="softwareDialog"
      v-model:name="softwareName"
      :items="[]"
    />
    <VRow
      class="fill-width"
      no-gutters
    >
      <VCol
        cols="12"
        lg="12"
        md="12"
        sm="12"
      >
        <VList>
          <VListSubheader class="title">
            列出你在学校中参与的实践项目、个人项目、或工作中参与的项目。
          </VListSubheader>
          <VListSubheader>技能书写指南</VListSubheader>
          <VListSubheader
            @click="softwareDialog = true"
            class="cursor-pointer"
          >
            <span>{{ softwareName }}</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>

          <VListItem>
            <VTextField
              v-model="newSoftware"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="请输入软件名称，按回车生成标签"
              @keyup.enter="handleGenerate"
            />
          </VListItem>
          <VListItem>
            <VChip
              v-for="item in softwares"
              :key="item"
              :text="item"
              class="mr-2 mb-2"
              @click="handleRemoveSoftware(item)"
            >
              <span>{{ item }}</span>
              <VIcon end>
                mdi-close
              </VIcon>
            </VChip>
          </VListItem>
        </VList>
      </VCol>
    </VRow>

    <VRow
      class="fill-width"
      no-gutters
    >
      <VCol
        cols="12"
        lg="12"
        md="12"
        sm="12"
      >
        <VList
          class="py-0"
          density="compact"
          lines="one"
        >
          <ModifiyModuleNameDialog
            v-model:modelValue="professionalDialog"
            v-model:name="professionalName"
            :items="[]"
          />
          <VListSubheader
            @click="professionalDialog = true"
            class="cursor-pointer"
          >
            <span>{{ professionalName }}</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>

          <Draggle
            key="draggable"
            v-model="items"
            item-key="id"
            v-bind="dragOptions"
            @choose="handleSelect"
            @unchoose="handleUnSelect"
          >
            <template #item="{ element, index }: { element: any; index: number }">
              <VListItem
                variant="outlined"
                rounded="lg"
                class="mt-4 cursor-move"
                :active="activeItem === element"
              >
                <template #prepend>
                  <VIcon>mdi-sort-variant</VIcon>
                </template>
                <VListItemTitle>校园A - 本科</VListItemTitle>
                <template #append>
                  <VBtn
                    variant="text"
                    class="mr-2"
                    color="primary"
                    icon
                  >
                    <VIcon>mdi-pencil-outline</VIcon>
                  </VBtn>
                  <VBtn
                    variant="text"
                    color="warning"
                    icon
                  >
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
      <VCol
        cols="12"
        lg="12"
        md="12"
        sm="12"
      >
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
                    <VTextField
                      density="compact"
                      variant="outlined"
                      hide-details
                    />
                  </div>
                </VCol>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      你的角色
                    </div>
                    <VTextField
                      density="compact"
                      variant="outlined"
                      hide-details
                    />
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
                    <VTextField
                      density="compact"
                      variant="outlined"
                      hide-details
                    />
                  </div>
                </VCol>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      所在城市
                    </div>
                    <VTextField
                      density="compact"
                      variant="outlined"
                      hide-details
                    />
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
                  <VBtn
                    color="primary"
                    @click="handleSave"
                    block
                  >
                    保存
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VSheet>
        </template>
        <template v-else>
          <VBtn
            @click="isEditing = true"
            class="my-4"
            block
            color="primary"
          >
            添加新的{{ professionalName }}
          </VBtn>
        </template>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style  lang="scss">
.title>.v-list-subheader__text {
  white-space: normal;
}
</style>
