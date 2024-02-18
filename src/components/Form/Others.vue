<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import { v4 } from 'uuid'
import { removeItem } from '~/helpers'
import Draggle from 'vuedraggable'

const dialog = ref(false)
const customDialog = ref(false)
const name = ref('')
const dialogType = ref<'health' | 'language' | 'award' | 'hobby' | 'portfolio'>('health')

const { resume } = storeToRefs(useResumeStore())
const form = resume.value.form.others

const isOpenForm = ref(false)
const type = ref<'create' | 'edit'>('create')

function handleUpdateName(name: string) {
  form[dialogType.value].moduleName = name
}
function handleHealth() {
  dialogType.value = 'health'
  dialog.value = true
}
function handleLanguage() {
  dialogType.value = 'language'
  dialog.value = true
}
function handleAward() {
  dialogType.value = 'award'
  dialog.value = true
}
function handleHobby() {
  dialogType.value = 'hobby'
  dialog.value = true
}
function handlePortfolio() {
  dialogType.value = 'portfolio'
  dialog.value = true
}

// * 健康状况
const health = ref('')
const language = ref('')
const languageItem = computed(() => {
  return { id: v4(), name: language.value }
})
function generateLanguage() {
  if (isEmpty(language.value))
    return
  if (form.language.items.find(item => item.name === language.value))
    return
  form.language.items.push({ ...languageItem.value })
  language.value = ''
}
function removeLanguage(item: any) {
  form.language.items = removeItem(form.language.items, item)
  language.value = ''
}
const award = ref('')
const awardItem = computed(() => {
  return { id: v4(), name: award.value }
})
function generateAward() {
  if (isEmpty(award.value))
    return
  if (form.award.items.find(item => item.name === award.value))
    return
  form.award.items.push({ ...awardItem.value })
  award.value = ''
}
function removeAward(item: any) {
  form.award.items = removeItem(form.award.items, item)
  award.value = ''
}
const hobby = ref('')
const portfolio = ref('')

// * 编辑和新增的表单数据
const defaultState = computed(() => { return { id: v4(), name: '', description: `` } })
const item = reactive<any>({})
function resetForm() {
  Object.assign(item, { ...defaultState.value })
}
function editCustom(_: any) {
  type.value = 'edit'
  item.id = _.id
  item.name = _.name
  item.description = _.description
  isOpenForm.value = true
}
function removeCustom(item: any) {
  form.custom.items = removeItem(form.custom.items, item)
  isOpenForm.value = false
  resetForm()
}
function handleSave() {
  const _item = form.custom.items.find(_ => _.id === item.id)
  switch (type.value) {
    case 'create':
      form.custom.items.push({ ...item })
      resetForm()
      isOpenForm.value = false
      return
    case 'edit':
      if (!_item)
        return
      _item.name = item.name
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
  activeItem.value = form.custom.items[oldIndex].id
}
function handleUnSelect(e: any) {
  activeItem.value = null
}
</script>

<template>
  <ModifiyModuleNameDialog
    v-model:modelValue="dialog"
    v-model:name="name"
    @update:name="handleUpdateName"
    :items="[]"
    show-actions
  />
  <ModifiyModuleNameDialog
    v-model:modelValue="customDialog"
    v-model:name="name"
    @update:name="handleUpdateName"
    :items="[]"
    show-actions
  />
  <VContainer
    class="fill-height py-0"
    fluid
  >
    <!-- * 健康状况 -->
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
        <VList class="bg-transparent">
          <VListSubheader
            @click="handleHealth"
            class="cursor-pointer"
          >
            <span>{{ form.health.moduleName }}</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>

          <VListItem rounded="lg">
            <VTextField
              v-model="health"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="请输入"
            />
          </VListItem>
        </VList>
      </VCol>
    </VRow>

    <!-- * 语言水平 -->
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
        <VList class="bg-transparent">
          <VListSubheader
            @click="handleLanguage"
            class="cursor-pointer"
          >
            <span>{{ form.language.moduleName }}</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>

          <VListItem>
            <VTextField
              v-model="language"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="请输入"
              @keyup.enter="generateLanguage"
            />
          </VListItem>
          <VListItem>
            <VChip
              v-for="item in form.language.items"
              :key="item.id"
              :text="item.name"
              class="mr-2 mb-2"
              @click="removeLanguage(item)"
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

    <!-- * 证书/课程 -->
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
        <VList class="bg-transparent">
          <VListSubheader
            @click="handleLanguage"
            class="cursor-pointer"
          >
            <span>{{ form.award.moduleName }}</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>

          <VListItem>
            <VTextField
              v-model="award"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="请输入"
              @keyup.enter="generateAward"
            />
          </VListItem>
          <VListItem>
            <VChip
              v-for="item in form.award.items"
              :key="item.id"
              :text="item.name"
              class="mr-2 mb-2"
              @click="removeAward(item)"
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

    <!-- * 兴趣爱好 -->
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
        <VList class="bg-transparent">
          <VListSubheader
            @click="handleHobby"
            class="cursor-pointer"
          >
            <span>{{ form.hobby.moduleName }}</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>

          <VListItem rounded="lg">
            <VTextField
              v-model="hobby"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="请输入"
            />
          </VListItem>
        </VList>
      </VCol>
    </VRow>

    <!-- * 作品集 -->
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
        <VList class="bg-transparent">
          <VListSubheader
            @click="handlePortfolio"
            class="cursor-pointer"
          >
            <span>{{ form.portfolio.moduleName }}</span>
            <VIcon end>
              mdi-square-edit-outline
            </VIcon>
          </VListSubheader>

          <VListItem rounded="lg">
            <VTextField
              v-model="portfolio"
              density="compact"
              variant="outlined"
              hide-details
              placeholder="请输入"
            />
          </VListItem>
        </VList>
      </VCol>
    </VRow>

    <!-- * 自定义模块 -->
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
          lines="two"
          class="bg-transparent"
        >
          <VListSubheader>
            自定义
          </VListSubheader>

          <Draggle
            key="draggable"
            v-model="form.custom.items"
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
                <VListItemSubtitle>
                  {{ element.description }}
                </VListItemSubtitle>
                <template #append>
                  <VBtn
                    variant="text"
                    class="mr-2"
                    @click="editCustom(element)"
                    color="primary"
                    icon
                  >
                    <VIcon>mdi-pencil-outline</VIcon>
                  </VBtn>
                  <VBtn
                    variant="text"
                    color="warning"
                    @click.stop="removeCustom(element)"
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
                      名称标题
                    </div>
                    <VTextField
                      v-model="item.name"
                      density="compact"
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
              isOpenForm = true
            }"
            class="my-4"
            block
            color="primary"
          >
            添加新的自定义模块
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
