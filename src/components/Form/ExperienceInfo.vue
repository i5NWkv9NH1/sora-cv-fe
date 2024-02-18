<script setup lang="ts">
import { v4 } from 'uuid'
import Draggle from 'vuedraggable'
import { removeItem } from '~/helpers'

const { resume } = storeToRefs(useResumeStore())
const form = resume.value.form.school

const dialog = ref(false)
const isOpenForm = ref(false)
const type = ref<'create' | 'edit'>('create')

// * 编辑和新增的表单数据
const defaultState = computed(() => { return { id: v4(), name: '', role: '', department: '', city: '', startDate: null, endDate: null, description: `` } })
const item = reactive<any>({})
function resetForm() {
  Object.assign(item, { ...defaultState.value })
}
function edit(_: any) {
  type.value = 'edit'

  item.id = _.id
  item.name = _.name
  item.role = _.role
  item.department = _.department
  item.city = _.city
  item.startDate = _.startDate
  item.endDate = _.endDate
  item.description = _.description
  isOpenForm.value = true
}
function remove(item: any) {
  form.items = removeItem(form.items, item)
  isOpenForm.value = false
  resetForm()
}
function handleSave() {
  const _item = form.items.find(_ => _.id === item.id)
  switch (type.value) {
    case 'create':
      form.items.push({ ...item })
      resetForm()
      isOpenForm.value = false
      return
    case 'edit':
      if (!_item)
        return
      _item.name = item.name
      _item.role = item.role
      _item.department = item.department
      _item.city = item.city
      _item.startDate = item.startDate
      _item.endDate = item.endDate
      _item.description = item.description
      isOpenForm.value = false
      resetForm()
      return
  }
}

// * draggle
const activeItem = ref<string | null>()
const dragOptions = ref({
  animation: 400,
  group: 'draggable',
  disabled: false,
  ghostClass: 'ghost',
})
function handleSelect({ oldIndex }: { oldIndex: number }) {
  activeItem.value = form.items[oldIndex].id
}
function handleUnSelect(e: any) {
  activeItem.value = null
}
</script>

<template>
  <VContainer
    class="fill-height"
    fluid
  >
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
          lines="three"
          class="bg-transparent"
        >
          <ModifiyModuleNameDialog
            v-model:modelValue="dialog"
            v-model:name="form.moduleName"
            :items="[]"
            show-actions
          />
          <VListSubheader class="title">
            列出你在学校 / 工作中参与的实践项目、个人项目、或工作中参与的项目。
          </VListSubheader>
          <VListSubheader
            @click="dialog = true"
            class="cursor-pointer"
          >
            <!-- <VBtn class="text-caption cursor-pointer" @click="dialog = true" variant="text">
              <span>{{ name }}</span>
              <VIcon end>mdi-square-edit-outline</VIcon>
            </VBtn> -->
            <span>{{ form.moduleName }}</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>

          <Draggle
            key="draggable"
            v-model="form.items"
            item-key="id"
            v-bind="dragOptions"
            @choose="handleSelect"
            @unchoose="handleUnSelect"
            class="pa-2"
          >
            <template #item="{ element, index }">
              <VListItem
                elevation="4"
                rounded="lg"
                class="bg-surface mt-4"
                :active="activeItem === element"
              >
                <template #prepend>
                  <VIcon class="cursor-pointer">
                    mdi-sort-variant
                  </VIcon>
                </template>
                <VListItemTitle>{{ element.name }}</VListItemTitle>
                <VListItemSubtitle>
                  {{ element.department }} - {{ element.role }}
                </VListItemSubtitle>
                <VListItemSubtitle>
                  {{ element.startDate.replaceAll('-', '/') }} - {{
                    element.endDate.replaceAll('-', '/') }}
                </VListItemSubtitle>
                <template #append>
                  <VBtn
                    variant="text"
                    class="mr-2"
                    color="primary"
                    @click="edit(element)"
                    icon
                  >
                    <VIcon>mdi-pencil-outline</VIcon>
                  </VBtn>
                  <VBtn
                    variant="text"
                    color="warning"
                    @click.stop="remove(element)"
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
        <template v-if="isOpenForm">
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
                      v-model="item.name"
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
                      v-model="item.role"
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
                      v-model="item.department"
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
                      v-model="item.city"
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
                      工作时间（起始时间）
                    </div>
                    <TextFieldDate v-model="item.startDate" />
                  </div>
                </VCol>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      工作时间（结束时间）
                    </div>
                    <TextFieldDate v-model="item.endDate" />
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
                      v-model="item.descripition"
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
            @click="() => {
              type = 'create'
              isOpenForm = true
            }"
            class="my-4"
            block
            color="primary"
          >
            添加新的{{ form.moduleName }}
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
