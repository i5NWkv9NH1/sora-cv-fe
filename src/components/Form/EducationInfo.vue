<script setup lang="ts">
import { v4 } from 'uuid'
import Draggle from 'vuedraggable'
import { removeItem } from '~/helpers'

const { resume, presetEducationNames, backgrounds, schollings, degrees } = storeToRefs(useResumeStore())
const form = resume.value.form.education

const dialog = ref(false)
const isOpenForm = ref(false)
const type = ref<'create' | 'edit'>('create')

// * 编辑和新增的表单数据
const defaultState = computed(() => { return { id: v4(), school: '', major: '', background: null, degree: null, schooling: null, college: '', city: '', startDate: null, endDate: null, description: `` } })
const item = reactive<any>({})
function resetForm() {
  Object.assign(item, { ...defaultState.value })
}
function edit(_: any) {
  type.value = 'edit'
  item.id = _.id
  item.school = _.school
  item.major = _.major
  item.background = _.background
  item.degree = _.degree
  item.schooling = _.schooling
  item.college = _.college
  item.college = _.college
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
      _item.school = item.school
      _item.major = item.major
      _item.background = item.background
      _item.degree = item.degree
      _item.schooling = item.schooling
      _item.college = item.college
      _item.college = item.college
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
            :items="presetEducationNames"
            show-actions
          />
          <VListSubheader class="title">
            <p>列出你的教育经历，并不是所有经历都要写入，而需要选取该过程中的亮点</p>
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
              <VScrollYReverseTransition>
                <VListItem
                  elevation="4"
                  lines="three"
                  rounded="lg"
                  class="bg-surface mt-4"
                  :active="activeItem === element.id"
                >
                  <template #prepend>
                    <VIcon>mdi-sort-variant</VIcon>
                  </template>
                  <VListItemTitle>{{ element.school }}</VListItemTitle>
                  <VListItemSubtitle>
                    {{ element.major }} | {{ backgrounds.find(item => item.value === element.background)?.label }}
                  </VListItemSubtitle>
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
              </VScrollYReverseTransition>
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
                      学校
                    </div>
                    <VTextField
                      v-model="item.school"
                      density="compact"
                      variant="outlined"
                      hide-details
                    />
                  </div>
                </VCol>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      城市
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

              <!-- * -->
              <VRow>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      专业
                    </div>
                    <VTextField
                      v-model="item.major"
                      density="compact"
                      variant="outlined"
                      hide-details
                    />
                  </div>
                </VCol>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      学院
                    </div>
                    <VTextField
                      v-model="item.college"
                      density="compact"
                      variant="outlined"
                      hide-details
                    />
                  </div>
                </VCol>
              </VRow>

              <!-- * -->
              <VRow>
                <VCol cols="4">
                  <div>
                    <div class="text-subtitle-2">
                      学历
                    </div>
                    <VSelect
                      v-model="item.background"
                      :items="backgrounds"
                      item-value="value"
                      item-title="label"
                      density="compact"
                      variant="outlined"
                      hide-details
                    />
                  </div>
                </VCol>
                <VCol cols="4">
                  <div>
                    <div class="text-subtitle-2">
                      学位
                    </div>
                    <VSelect
                      v-model="item.degree"
                      :items="degrees"
                      item-value="value"
                      item-title="label"
                      density="compact"
                      variant="outlined"
                      hide-details
                    />
                  </div>
                </VCol>
                <VCol cols="4">
                  <div>
                    <div class="text-subtitle-2">
                      学制
                    </div>
                    <VSelect
                      v-model="item.schooling"
                      :items="schollings"
                      item-value="value"
                      item-title="label"
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
                    <TextFieldDate v-model="item.startDate" />
                  </div>
                </VCol>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      在读时间（结束时间）
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
                      placeholder="荣誉奖项：优秀毕业生（专业前3%）、一等奖学金（2022，2023）。 主修课程：视觉传达设计方法、视觉传达设计创意、视觉传达设计应用、视觉传达设计传播。"
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
              isOpenForm = true;
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
