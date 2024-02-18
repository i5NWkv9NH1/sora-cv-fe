<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import { v4 } from 'uuid'
import Draggle from 'vuedraggable'
import { removeItem } from '~/helpers'

const softwareDialog = ref(false)
const professionalDialog = ref(false)

const { resume } = storeToRefs(useResumeStore())
const form = resume.value.form.skill

const isOpenForm = ref(false)
const type = ref<'create' | 'edit'>('create')

// * 软件
const software = ref('')
const softwareItem = computed(() => {
  return { id: v4(), name: software.value }
})
function generateSoftware() {
  if (isEmpty(software.value))
    return
  if (form.software.items.find(item => item.name === software.value))
    return
  form.software.items.push({ ...softwareItem.value })
  software.value = ''
}
function removeSoftware(item: any) {
  form.software.items = removeItem(form.software.items, item)
  software.value = ''
}

// * 技能
const defaultState = computed(() => { return { id: v4(), name: '', description: '' } })
const professionalItem = reactive<any>({})
function resetForm() {
  Object.assign(professionalItem, { ...defaultState.value })
}
function editProfessional(item: any) { }
function removeProfessional(item: any) { }
function handleSave() {
  const _item = form.professional.items.find(_ => _.id === professionalItem.id)
  switch (type.value) {
    case 'create':
      form.professional.items.push({ ...professionalItem })
      resetForm()
      isOpenForm.value = false
      return
    case 'edit':
      if (!_item)
        return
      _item.name = professionalItem.name
      _item.description = professionalItem.description
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
  activeItem.value = form.professional.items[oldIndex].id
}
function handleUnSelect(e: any) {
  activeItem.value = null
}
</script>

<template>
  <VContainer
    class="fill-height "
    fluid
  >
    <ModifiyModuleNameDialog
      v-model:modelValue="softwareDialog"
      v-model:name="form.software.moduleName"
      :items="[]"
      show-actions
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
        <VList class="bg-transparent ">
          <VListSubheader class="title">
            列出你的专业技能，不要仅仅罗列技术名词，而是通过主次分明的方式详细介绍技能的应用。
            <NuxtLink
              to="/"
              target="_blank"
              class="text-warning"
              :style="{ textDecorationLine: 'underline', textDecorationStyle: 'wavy' }"
            >
              技能书写指南
            </NuxtLink>
          </VListSubheader>
          <VListSubheader
            @click="softwareDialog = true"
            class="cursor-pointer"
          >
            <span>{{ form.software.moduleName }}</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>

          <VListItem>
            <VTextField
              v-model="software"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="请输入软件名称，按回车生成标签"
              @keyup.enter="generateSoftware"
            />
          </VListItem>
          <VListItem>
            <VChip
              v-for="item in form.software.items"
              :key="item.id"
              :text="item.name"
              class="mr-2 mb-2"
              @click="removeSoftware(item)"
            >
              <span>{{ item.name }}</span>
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
          lines="one"
          class="bg-transparent"
        >
          <ModifiyModuleNameDialog
            v-model:modelValue="professionalDialog"
            v-model:name="form.professional.moduleName"
            :items="[]"
            show-actions
          />
          <VListSubheader
            @click="professionalDialog = true"
            class="cursor-pointer"
          >
            <span>{{ form.professional.moduleName }}</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>

          <Draggle
            key="draggable"
            v-model="form.professional.items"
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
                class="bg-surface mt-4 cursor-move"
                :active="activeItem === element"
              >
                <template #prepend>
                  <VIcon>mdi-sort-variant</VIcon>
                </template>
                <VListItemTitle>
                  {{ element.name }}
                </VListItemTitle>
                <template #append>
                  <VBtn
                    variant="text"
                    class="mr-2"
                    @click="editProfessional(element)"
                    color="primary"
                    icon
                  >
                    <VIcon>mdi-pencil-outline</VIcon>
                  </VBtn>
                  <VBtn
                    variant="text"
                    color="warning"
                    @click.stop="removeProfessional(element)"
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
                <VCol>
                  <div>
                    <div class="text-subtitle-2">
                      技能名称
                    </div>
                    <VTextField
                      v-model="professionalItem.name"
                      density="compact"
                      placeholder="如：软件技能、手绘能力、开发能力、文案、排版等"
                      variant="outlined"
                      hide-details
                    />
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
                      v-model="professionalItem.descripition"
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
                    保存并收起
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
            添加新的{{ form.professional.moduleName }}
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
