<script setup lang="ts">
import { v4 } from 'uuid'
import Draggle from 'vuedraggable'
import { removeItem } from '~/helpers'

const { resume, presetWorkNames } = storeToRefs(useResumeStore())
const form = resume.value.form.work

const dialog = ref(false)
const isOpenForm = ref(false)
const type = ref<'create' | 'edit'>('create')

// * 编辑和新增的表单数据
const defaultState = computed(() => { return { id: v4(), company: '', department: '', job: null, city: null, startDate: null, endDate: '', description: '' } })
const item = reactive<any>({})
function resetForm() {
  Object.assign(item, { ...defaultState.value })
}
function edit(_: any) {
  type.value = 'edit'
  item.id = _.id
  item.company = _.company
  item.department = _.department
  item.job = _.job
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
      _item.company = item.company
      _item.department = item.department
      _item.job = item.job
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
const activeItem = ref()
const dragOptions = ref({
  animation: 400,
  group: 'draggable',
  disabled: false,
  ghostClass: 'ghost',
})
function handleSelect({ oldIndex }: { oldIndex: number }) {
  activeItem.value = form.items[oldIndex]
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
            :items="presetWorkNames"
            show-actions
          />
          <VListSubheader class="title">
            列出你认为最重要最近几年的工作经历，最新放在最前面，突出工作以及项目中的亮点。
            <NuxtLink
              to="/"
              target="_blank"
              class="text-warning"
              :style="{ textDecorationLine: 'underline', textDecorationStyle: 'wavy' }"
            >
              经历书写指南
            </NuxtLink>
          </VListSubheader>
          <VListSubheader
            @click="dialog = true"
            class="cursor-pointer"
          >
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
                  <VIcon>mdi-sort-variant</VIcon>
                </template>
                <VListItemTitle>{{ element.company }}</VListItemTitle>
                <VListItemSubtitle>{{ element.department }}</VListItemSubtitle>
                <VListItemSubtitle>
                  {{ element.startDate.replaceAll('-', '/') }} - {{ element.endDate.replaceAll('-', '/') }}
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
                      公司名称
                    </div>
                    <VTextField
                      v-model="item.company"
                      density="compact"
                      variant="outlined"
                      hide-details
                    />
                  </div>
                </VCol>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      职位名称
                    </div>
                    <VTextField
                      v-model="item.job"
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
                      v-model="item.description"
                      variant="outlined"
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
