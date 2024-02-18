<script setup lang="ts">
import { v4 } from 'uuid'
import Draggle from 'vuedraggable'
import { removeItem } from '~/helpers'
import { type Education, mockDegrees, mockEducationalBackgrounds, mockModifyEducationNamePresets, mockSchoolings } from '~/mocks'

const { form } = useData()

const dialog = ref(false)
const isEditing = ref(false)

const name = ref('教育经历')
const names = ref(mockModifyEducationNamePresets)
// * 表单选择项目数据
const educationalBackgrounds = ref(mockEducationalBackgrounds)
const schollings = ref(mockSchoolings)
const degrees = ref(mockDegrees)
// * 编辑和新增的表单数据
const initState: Education = { id: v4(), school: '', major: '', educationalBackgrounds: null, degree: null, schooling: null, college: '', city: '', startDate: null, endDate: null, description: `` }
const item = reactive<Education>({ ...initState })
function resetForm() {
  Object.assign(item, { ...initState })
}
const activeItem = ref<string | null>()
const dragOptions = ref({
  animation: 400,
  group: 'draggable',
  disabled: false,
  ghostClass: 'ghost',
})
function handleSelect({ oldIndex }: { oldIndex: number }) {
  activeItem.value = form.educations[oldIndex].id
}
function handleUnSelect(e: any) {
  activeItem.value = null
}
function handleSave() {
  // * 添加项
  // TODO: 添加验证
  form.educations.push({ ...item })
  resetForm()
  isEditing.value = false
}
function remove(item: Education) {
  form.educations = removeItem<Education>(form.educations, item)
}
function edit(item: Education) {
}
watch(form, () => console.log(form.educations), { deep: true })
</script>

<template>
  <VContainer class="fill-height" fluid>
    <VRow class="fill-width" no-gutters>
      <VCol cols="12" lg="12" md="12" sm="12">
        <VList class="py-0">
          <ModifiyModuleNameDialog v-model:modelValue="dialog" v-model:name="name" :items="names" />
          <VListSubheader>列出你的教育经历，并不是所有经历都要写入，而需要选取该过程中的亮点</VListSubheader>
          <VListSubheader @click="dialog = true" class="cursor-pointer">
            <span>{{ name }}</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>

          <Draggle
            key="draggable" v-model="form.educations" item-key="id" v-bind="dragOptions" @choose="handleSelect"
            @unchoose="handleUnSelect"
          >
            <template #item="{ element, index }: { element: Education; index: number }">
              <VScrollYReverseTransition>
                <VListItem lines="three" variant="outlined" rounded="lg" class="mt-4" :active="activeItem === element.id">
                  <template #prepend>
                    <VIcon>mdi-sort-variant</VIcon>
                  </template>
                  <VListItemTitle>{{ element.school }}</VListItemTitle>
                  <VListItemSubtitle>
                    {{ element.major }} - {{ element.startDate }} - {{ element.endDate }}
                  </VListItemSubtitle>
                  <template #append>
                    <VBtn variant="text" class="mr-2" color="primary" icon>
                      <VIcon>mdi-pencil-outline</VIcon>
                    </VBtn>
                    <VBtn variant="text" color="warning" @click.stop="remove(element)" icon>
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
                      学校
                    </div>
                    <VTextField v-model="item.school" density="compact" variant="outlined" hide-details />
                  </div>
                </VCol>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      城市
                    </div>
                    <VTextField v-model="item.city" density="compact" variant="outlined" hide-details />
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
                    <VTextField v-model="item.major" density="compact" variant="outlined" hide-details />
                  </div>
                </VCol>
                <VCol cols="6">
                  <div>
                    <div class="text-subtitle-2">
                      学院
                    </div>
                    <VTextField v-model="item.college" density="compact" variant="outlined" hide-details />
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
                      v-model="item.educationalBackgrounds"
                      :items="educationalBackgrounds" item-value="value" item-title="label" density="compact"
                      variant="outlined" hide-details
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
                      :items="degrees" item-value="value" item-title="label" density="compact" variant="outlined"
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
                      :items="schollings" item-value="value" item-title="label" density="compact"
                      variant="outlined" hide-details
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
                      placeholder="荣誉奖项：优秀毕业生（专业前3%）、一等奖学金（2022，2023）。 主修课程：视觉传达设计方法、视觉传达设计创意、视觉传达设计应用、视觉传达设计传播。" rows="8"
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
