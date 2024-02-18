<!--
  TODO: 添加响应式
 -->
<script setup lang="ts">
import { CircleStencil, Cropper, type CropperResult } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

interface Props {
  modelValue?: boolean
  src?: string
  change?: (src: string) => void
  persistent?: boolean
}
const props = (defineProps<Props>())
const emits = defineEmits(['update:modelValue'])
const dialog = ref(props.modelValue)
const copySrc = ref(props.src)
watch(() => props.modelValue, () => dialog.value = props.modelValue)
watch(() => props.src, () => copySrc.value = props.src)
watch(dialog, () => {
  // * 如果取消更换
  // * 替换为原来的图片
  copySrc.value = props.src
  emits('update:modelValue', dialog.value)
})

const fileEl = ref()
const cropperEl = ref()
const fileType = ref('')
function handleOpenImage() {
  // * 打开图片选择
  if (fileEl.value)
    fileEl.value.click()
}
function handleSelectImage(files: File[]) {
  if (files || files[0]) {
    URL.revokeObjectURL(copySrc.value!)
    const blob = URL.createObjectURL(files[0])
    fileType.value = files[0].type
    copySrc.value = blob
  }
}

function handleCrooperResult() {
  const result = cropperEl.value.getResult() as CropperResult
  if (result.canvas) {
    const blob = result.canvas.toDataURL(fileType.value)
    // selectedImage.value.src = blob
    copySrc.value = blob
    // !! update data
    //* ... upload with api
    //* after reset
    dialog.value = false
    props.change && props.change(blob)
  }
}
function handleCropperChange(e: CropperResult) {
  if (e.canvas) {
    const blob = e.canvas.toDataURL(fileType.value)
    // console.log(blob)
    // TODO: upload
  }
}
</script>

<template>
  <VDialog v-model="dialog" transition="slide-y-transition" fullscreen :persistent="props.persistent || false">
    <VFileInput class="d-none" ref="fileEl" @update:model-value="handleSelectImage" />
    <VContainer class="fill-height">
      <VRow justify="center" class="fill-width">
        <VCol cols="12" lg="6" md="8" sm="8">
          <VCard>
            <VCardTitle>
              <div class="d-flex align-center">
                <VIcon start>
                  mdi-message-image-outline
                </VIcon>
                <div>修改头像</div>
                <VSpacer />
                <VBtn @click="dialog = false" variant="text" icon>
                  <VIcon>mdi-close</VIcon>
                </VBtn>
              </div>
            </VCardTitle>
            <VCardText>
              <KeepAlive>
                <Cropper
                  class="cropper" ref="cropperEl" :src="copySrc" :stencil-component="CircleStencil"
                  @change="handleCropperChange" style="max-height: 400px; min-height: 400px;"
                />
              </KeepAlive>
            </VCardText>

            <VCardActions>
              <VBtn @click="handleOpenImage">
                <span>选择图片</span>
              </VBtn>
              <VSpacer />
              <VBtn @click="handleCrooperResult" color="primary" elevation="0" active>
                确定
              </VBtn>
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VDialog>
</template>
