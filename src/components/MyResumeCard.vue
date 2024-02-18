<script setup lang="ts">
import { delay } from '~/helpers'
import type { ViewStyle } from '~/mocks'

interface Props {
  item?: any
  toggle?: () => void
  isSelected?: boolean
  viewStyle?: ViewStyle
  onDelete: (id: string) => void
}
const props = defineProps<Props>()
// * 选择状态
// * 在选择状态下无法编辑
const isDownloading = ref(false)
// * 编辑名字状态
const isEditing = ref(false)
// * 表单
const formEl = ref()
const inputEl = ref()
const isRenameLoading = ref(false)
const focused = ref(true)
const title = ref(props.item.title)
const rules = ref([
  (v: string) => !!v || '名字不能为空',
])
// * dialogs
const imageDialog = ref(false)
const deleteDialog = ref(false)
const height = computed(() => props.viewStyle === 'Grid' ? '400' : 'unset')
// * 操作
async function handleClickOutside(e: Event) {
  if (isRenameLoading.value)
    return
  e.preventDefault()
  await save()
}
async function save() {
  if (!isEditing.value) {
    isEditing.value = true
    return
  }
  if (isRenameLoading.value)
    return

  if (!title.value) {
    console.log('empty')
    return
  }
  console.log('uploading....')
  isRenameLoading.value = true
  // * upload
  await delay(2000)
  isRenameLoading.value = false
  isEditing.value = false
}
async function download() {
  isDownloading.value = true
  await delay(1000)
  isDownloading.value = false
}
async function remove() { }
</script>

<template>
  <VCard
    class="rainbow"
    :variant="props.isSelected || isDownloading ? 'tonal' : 'elevated'"
  >
    <template v-if="props.isSelected || isEditing || isDownloading">
      <span class="top" /><span class="left" /><span class="right" /><span class="bottom" />
    </template>
    <!-- * 标题和表格 -->
    <VCardTitle>
      <VSlideYTransition mode="out-in">
        <!-- * 编辑状态下 -->
        <template v-if="isEditing">
          <VForm
            ref="formEl"
            @submit.prevent="save"
          >
            <VTextField
              v-model="title"
              :rules="rules"
              variant="outlined"
              clearable
              autofocus
              color="primary"
              density="compact"
              ref="inputEl"
              :loading="isRenameLoading"
              :disabled="isRenameLoading"
              hint="修改简历名字"
              persistent-hint
              v-click-outside="handleClickOutside"
            >
              <template #append-inner>
                <VBtn
                  variant="text"
                  @click="save"
                  :disabled="!title"
                  color="primary"
                >
                  保存
                </VBtn>
              </template>
            </VTextField>
          </VForm>
        </template>
        <!-- * 非编辑状态 -->
        <template v-else>
          <div class="d-flex align-center">
            {{ title }}
          </div>
        </template>
      </VSlideYTransition>
    </VCardTitle>

    <!-- * 封面和操作 -->
    <!-- * 两列 -->
    <VCardText>
      <VRow>
        <!-- * 封面 -->
        <VCol
          cols="12"
          lg="8"
          md="6"
        >
          <!-- * 点击图片打开 放大dialog -->
          <VImg
            :src="item.thumbnailUrl"
            transition="slide-y-transition"
            width="100%"
          />
        </VCol>
        <!-- * 操作列表 -->
        <VCol
          cols="12"
          lg="4"
          md="6"
        >
          <VBtn
            @click="save"
            :disabled="props.isSelected || !!!title || isRenameLoading || isDownloading"
            variant="text"
          >
            简历重命名
          </VBtn>
          <VBtn
            :to="`/editor?resumeId=${props.item.id}`"
            class="mt-2"
            variant="text"
          >
            编辑该简历
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>

    <!-- * 下载和选择 -->
    <VCardActions>
      <VTooltip location="bottom center">
        <template
          #activator="arg"
          :activator-props="{ item: props.item, toggle: props.toggle }"
        >
          <VBtn
            v-bind="arg.props"
            :active="props.isSelected"
            :disabled="isEditing || isDownloading"
            @click="toggle"
            icon
          >
            <VIcon>
              {{ props.isSelected ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline' }}
            </VIcon>
          </VBtn>
        </template>
        <span>选择该简历</span>
      </VTooltip>
      <VTooltip location="bottom center">
        <template
          #activator="arg"
          :activator-props="{ item: props.item, toggle: props.toggle }"
        >
          <VBtn
            v-bind="arg.props"
            :active="isDownloading"
            :disabled="isEditing || isSelected"
            @click="download"
            icon
          >
            <VIcon>
              mdi-download-circle-outline
            </VIcon>
          </VBtn>
        </template>
        <span>下载该简历</span>
      </VTooltip>
      <VTooltip location="bottom center">
        <template
          #activator="arg"
          :activator-props="{ item: props.item, toggle: props.toggle }"
        >
          <VBtn
            v-bind="arg.props"
            color="error"
            @click="props.onDelete(item.id)"
            icon
          >
            <VIcon>
              mdi-trash-can
            </VIcon>
          </VBtn>
        </template>
        <span>删除该简历</span>
      </VTooltip>
    </VCardActions>
  </VCard>
</template>
