import type { Coordinates } from 'vue-advanced-cropper'
import {
  CircleStencil,
  Cropper,
  type CropperResult
} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import {
  VAvatar,
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VCol,
  VContainer,
  VDialog,
  VFabTransition,
  VFileInput,
  VForm,
  VHover,
  VIcon,
  VImg,
  VOverlay,
  VRow,
  VSheet,
  VSkeletonLoader,
  VSlideYTransition,
  VSpacer,
  VTextField,
  VTooltip
} from 'vuetify/components'
import { usePreferencesStore, useUserStore } from '~/stores'

export default defineComponent({
  setup() {
    useSeoMeta({ title: '个人设置' })
    const store = useUserStore()
    const preferences = usePreferencesStore()

    const avatarUploadDialog = ref(false)
    const loading = ref(false)

    const cropperEl = ref()
    const fileEl = ref()

    const selectedImage = ref({
      src: store.state.avatarUrl,
      type: ''
    })

    function getImage(files: File[]) {
      console.log(cropperEl.value)
      if (files?.[0]) {
        URL.revokeObjectURL(selectedImage.value.src)

        const blob = URL.createObjectURL(files[0])

        selectedImage.value.src = blob
        selectedImage.value.type = files[0].type
      }
    }
    //? preview
    function handleChange(result: CropperResult) {
      // if (result.canvas) {
      //   const blob = result.canvas.toDataURL(selectedImage.value.type)
      //   // selectedImage.value.src = blob
      //   store.state.avatarUrl = blob
      // }
    }
    async function getCropResult() {
      const result = cropperEl.value.getResult() as CropperResult
      if (result.canvas) {
        const blob = result.canvas.toDataURL(selectedImage.value.type)
        // selectedImage.value.src = blob
        store.state.avatarUrl = blob
        //*... upload with api
        //* after reset
        selectedImage.value.src = store.state.avatarUrl
        avatarUploadDialog.value = false
      }

      preferences.alert.status = true
      preferences.alert.message = 'Upload successfully'
    }
    async function updateProfile() {}
    async function fetchProfile() {}
    async function updateBidingWechat() {
      store.state.wechat = !store.state.wechat
      preferences.toggleAlert()
    }
    async function updateBidingPhone() {
      store.state.phone = !store.state.phone
    }

    function CropWrapper() {
      return (
        <>
          {/*@ts-ignore*/}
          <>
            {loading.value ? (
              <VSkeletonLoader type={'image'} />
            ) : (
              <Cropper
                class={'cropper'}
                ref={cropperEl}
                src={selectedImage.value.src}
                stencilComponent={CircleStencil}
                onChange={handleChange}
                style={{ maxHeight: '600px' }}
                // maxHeight={400}
                // aspectRatios={'1/1'}
              />
            )}
            {/*@ts-ignore*/}
          </>
        </>
      )
    }

    function AvatarUploadDialog() {
      return (
        //@ts-ignore
        <LazyClientOnly>
          <VDialog v-model={avatarUploadDialog.value}>
            <VRow justify={'center'}>
              <VCol cols={12} lg={4} md={6} sm={8}>
                <VCard>
                  <VCardTitle>修改头像</VCardTitle>
                  <VCardText>
                    <CropWrapper />
                  </VCardText>

                  <VCardActions>
                    <VBtn
                      variant={'elevated'}
                      //@ts-ignore
                      onClick={() => {
                        //? toggle file
                        fileEl.value.click()
                      }}
                    >
                      <span>选择图片</span>
                      <VFileInput
                        class={'d-none'}
                        onUpdate:modelValue={getImage}
                        ref={fileEl}
                      />
                    </VBtn>
                    <VBtn
                      //@ts-ignore
                      onClick={getCropResult}
                      variant={'elevated'}
                    >
                      <span>确定</span>
                    </VBtn>

                    <VSpacer />
                    <VBtn
                      //@ts-ignore
                      onClick={() => {
                        avatarUploadDialog.value = false
                      }}
                      color={'warning'}
                      variant={'tonal'}
                    >
                      关闭
                    </VBtn>
                  </VCardActions>
                </VCard>
              </VCol>
            </VRow>
          </VDialog>
          {/*@ts-ignore*/}
        </LazyClientOnly>
      )
    }

    function Avatar() {
      return (
        <VHover
          v-slots={{
            default: ({ isHovering, props }) => (
              <VAvatar {...props} size={124}>
                <VImg src={store.state.avatarUrl}>
                  <VOverlay
                    v-model={isHovering}
                    transition={'slide-y-transition'}
                    eager
                    contained
                    location={'center center'}
                    width={'100%'}
                    height={'100%'}
                  >
                    <VBtn
                      width={'100%'}
                      height={'100%'}
                      //@ts-ignore
                      onClick={() => {
                        avatarUploadDialog.value = true
                      }}
                    >
                      <span>编辑头像</span>
                    </VBtn>
                  </VOverlay>
                </VImg>
              </VAvatar>
            )
          }}
        />
      )
    }

    function FormWrapper() {
      return (
        <VForm class={'d-flex flex-column'} style={{ gap: '.5rem' }}>
          <div class={'d-flex align-end'} style={{ gap: '1rem' }}>
            <Avatar />
            <VBtn
              //@ts-ignore
              onClick={() => {
                avatarUploadDialog.value = true
              }}
            >
              <VIcon start>mdi-pencil-outline</VIcon>
              <span>修改</span>
            </VBtn>
          </div>

          <div class={'mt-4'}>
            <div class='text-subtitle-2 text-medium-emphasis'>用户ID</div>
            <VTextField
              v-model={store.state.username}
              density={'compact'}
              variant={'outlined'}
              singleLine
              label={'维护中... 暂时无法更改'}
              disabled
            />
          </div>
          <div>
            <div class='text-subtitle-2 text-medium-emphasis'>昵称</div>
            <VTextField
              v-model={store.state.name}
              density={'compact'}
              variant={'outlined'}
            />
          </div>
          <div>
            <div class='text-subtitle-2 text-medium-emphasis'>微信绑定</div>
            <div class={'d-flex align-center justify-space-between'}>
              {store.state.wechat ? (
                <span class={'text-success'}>已绑定</span>
              ) : (
                <span class={'text-warning'}>未绑定</span>
              )}
              {store.state.wechat ? (
                <VBtn
                  variant={'tonal'}
                  //@ts-ignore
                  onClick={updateBidingWechat}
                >
                  解除绑定
                </VBtn>
              ) : (
                <VBtn
                  //@ts-ignore
                  onClick={updateBidingWechat}
                  variant={'text'}
                >
                  绑定微信
                </VBtn>
              )}
            </div>
          </div>
          <div>
            <div class='text-subtitle-2 text-medium-emphasis'>手机号码绑定</div>
            <VTextField
              v-model={store.state.phoneNumebr}
              density={'compact'}
              variant={'outlined'}
              disabled={!store.state.phone}
              hideSpinButtons
              hideDetails
            />

            <div class={'d-flex align-center justify-space-between mt-2'}>
              {store.state.phone ? (
                <span class={'text-success'}>已绑定</span>
              ) : (
                <span class={'text-warning'}>未绑定</span>
              )}
              {store.state.phone ? (
                <VBtn
                  variant={'tonal'}
                  //@ts-ignore
                  onClick={updateBidingPhone}
                >
                  解除绑定
                </VBtn>
              ) : (
                <VBtn
                  //@ts-ignore
                  onClick={updateBidingPhone}
                  variant={'text'}
                >
                  绑定手机号码
                </VBtn>
              )}
            </div>
          </div>

          <div>
            <VBtn
              block
              //@ts-ignore
              onClick={updateProfile}
            >
              <VIcon start>mdi-content-save-outline</VIcon>
              <span>保存</span>
            </VBtn>
          </div>
        </VForm>
      )
    }

    return () => (
      <>
        <AvatarUploadDialog />
        <VContainer>
          <VRow>
            <VCol>
              <div class={'text-h4'}>个人设置</div>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols={10} lg={4} md={6} sm={8}>
              <FormWrapper />
            </VCol>
          </VRow>
        </VContainer>
      </>
    )
  }
})
