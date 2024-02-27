import {
  VAvatar,
  VBtn,
  VCard,
  VCardActions,
  VCardSubtitle,
  VCardText,
  VCardTitle,
  VCol,
  VContainer,
  VDialog,
  VForm,
  VIcon,
  VImg,
  VRow,
  VSlideYReverseTransition,
  VSlideYTransition,
  VSpacer,
  VTextField,
  VToolbar,
  VTooltip
} from 'vuetify/lib/components/index.mjs'
import { ClientOnly, LazyClientOnly } from '#components'

import { delay } from '~/helpers'
import type { ITemplate, IUIState } from '~/types'

export default defineComponent({
  setup() {
    useSeoMeta({ title: '我的简历文件' })
    const userStore = useUserStore()
    const dataStore = useDataStore()
    const { density, size } = storeToRefs(usePreferencesStore())
    const items = ref(dataStore.state.templateList)
    const viewStyle = ref<'grid' | 'list' | 'flow'>('grid')
    const uiState = ref<IUIState>('loading')
    const isSelectedAll = ref(false)
    const toolbarActions = ref([
      { id: 1, name: '选择', icon: 'mdi-select', action: () => { } },
      { id: 2, name: '网格', icon: 'mdi-select', action: () => { } },
      { id: 3, name: '列表', icon: 'mdi-select', action: () => { } }
    ])

    //* api
    // async function update() {}
    // async function fetchAll() {}
    // async function copy() {}
    // async function download() {}
    // async function remove() {}
    // function onSubmit(e: any) {
    //   console.log(e)
    // }

    //* components
    //#region components
    function GridCard({ item }: { item: ITemplate }) {
      //* status
      const editStatus = ref(false)
      const downloading = ref(false)
      const removing = ref(false)
      const removeProcess = ref(false)
      const removeProcessValue = ref(0)
      const removeProcessInternal = ref()
      const isSelected = ref(false)

      const imageZoomDialog = ref(false)
      const removeConfirm = ref(false)
      //* el
      const inputEl = ref()
      const formEl = ref()
      //* state
      const inputModelValue = ref(item.title)
      //* methods
      async function save() {
        //? v-if
        if (formEl.value) {
          const { valid, errors } = await formEl.value.validate()
          if (!valid) {
            //? 直接返回 - 不给OutSide - 不更新input状态
            return
          }
          //? 通过
          //? 更新数据 - ClickOutSide
          item.title = inputModelValue.value
          editStatus.value = false
          console.info('save..')
          return
        }
        //? 无法获取到El
        //? 还原数据
        inputModelValue.value = item.title
      }
      //? 点击dom外 - 发送请求 - 关闭编辑状态 - 打开提醒框
      async function onClickOutside(e: Event) {
        e.preventDefault()
        console.info('outside...')
        await save()
      }
      async function download() {
        downloading.value = true
        await delay(1000)
        downloading.value = false
      }
      async function copy() { }
      async function remove() {
        removeConfirm.value = false
        alert('remove')
      }

      function ImageZoomDialog() {
        return (
          <VDialog
            v-model={imageZoomDialog.value}
            transition={'slide-x-transition'}
            fullscreen
            closeOnContentClick
          >
            <VContainer class={'fill-height'} fluid>
              <VRow>
                <VCol>
                  <VImg src={item.thumbnailUrl} />
                </VCol>
              </VRow>
            </VContainer>
          </VDialog>
        )
      }

      function RemoveConfirm() {
        return (
          <VDialog
            v-model={removeConfirm.value}
            transition={'slide-y-transition'}
            contained
            eager
            persistent={removing.value}
            location={'bottom'}
            contentClass={'pa-4'}
            attach={true}
          >
            <VCard>
              <VCardTitle>删除模板</VCardTitle>
              <VCardText>
                <p>
                  删除后还可以在
                  <span class={'text-primary'}> 回收站 </span>
                  恢复
                </p>
              </VCardText>
              <VCardActions>
                <VBtn
                  //@ts-ignore
                  onClick={remove}
                  color={'error'}
                  variant={'tonal'}
                >
                  确认删除
                </VBtn>
                <VBtn
                  //@ts-ignore
                  onClick={() => {
                    removeConfirm.value = false
                  }}
                  variant={'text'}
                >
                  取消
                </VBtn>
              </VCardActions>
            </VCard>
          </VDialog>
        )
      }

      return (
        //! 单个 ClientOnly 无法使用指令
        //! 添加 Lazy 才能使用指令
        <LazyClientOnly>
          <VCard
            width={'100%'}
            loading={downloading.value}
            class={'position-relative myfile'}
            variant={isSelected.value ? 'tonal' : 'elevated'}
          >
            {/* border */}
            {(editStatus.value || isSelected.value) && (
              <>
                <span class='top' />
                <span class='right' />
                <span class='bottom' />
                <span class='left' />
              </>
            )}

            {/* Dialogs */}
            <ImageZoomDialog />
            <RemoveConfirm />

            {/* Content */}
            <VCardTitle>
              <VSlideYTransition mode={'out-in'}>
                {editStatus.value ? (
                  <VForm
                    ref={formEl}
                    onSubmit={async (e) => {
                      e.preventDefault()
                      await save()
                    }}
                    class={'mt-2'}
                  >
                    <VTextField
                      clearable
                      v-model={inputModelValue.value}
                      ref={inputEl}
                      rules={[(v: string) => !!v || '名字不能为空']}
                      variant={'outlined'}
                      density={'compact'}
                      v-click-outside={onClickOutside}
                      autofocus
                      validateOn={'lazy input'}
                      color={'primary'}
                      hint={'修改简历名字'}
                      v-slots={{
                        'append-inner': () => (
                          <VBtn
                            variant={'text'}
                            //@ts-ignore
                            //@ts-ignore
                            onClick={save}
                            disabled={!inputModelValue.value}
                          >
                            保存
                          </VBtn>
                        )
                      }}
                    />
                  </VForm>
                ) : (
                  <>
                    <div class={'d-flex align-center'}>
                      <span>{item.title}</span>
                    </div>
                  </>
                )}
              </VSlideYTransition>
            </VCardTitle>
            <VCardSubtitle>{item.subtitle}</VCardSubtitle>
            <VCardText>
              <VRow>
                <VCol cols={12} lg={8} md={6}>
                  <VImg
                    src={item.thumbnailUrl}
                    transition={'slide-y-transition'}
                    width={'100%'}
                    //@ts-ignore
                    onClick={() => {
                      imageZoomDialog.value = true
                    }}
                  />
                </VCol>
                <VCol cols={12} lg={4} md={6}>
                  <div
                    class='d-flex flex-column align-start gap-2'
                  >
                    <VBtn
                      variant={'text'}
                      color={'info'}
                      //@ts-ignore
                      to={{ path: '/editor', query: { templateId: item.id } }}
                      active={false}
                    >
                      编辑简历
                    </VBtn>
                    <VBtn
                      variant={'text'}
                      color={'info'}
                      disabled={!inputModelValue.value}
                      //@ts-ignore
                      onClick={() => {
                        editStatus.value = !editStatus.value
                      }}
                    >
                      简历重命名
                    </VBtn>
                    <VBtn variant={'text'} color={'info'}>
                      复制简历
                    </VBtn>
                    <VBtn
                      variant={'text'}
                      color={'warning'}
                      //@ts-ignore
                      onClick={() => {
                        removeConfirm.value = true
                      }}
                    >
                      <span>删除</span>
                    </VBtn>
                  </div>
                </VCol>
              </VRow>
            </VCardText>
            <VCardActions>
              <VTooltip
                location={'bottom center'}
                v-slots={{
                  default: () => <span>选择该文件</span>,
                  activator: ({ props }) => {
                    return (
                      <>
                        {isSelected.value ? (
                          <>
                            <VBtn
                              {...props} //@ts-ignore
                              onClick={() => {
                                isSelected.value = false
                              }}
                              active
                              icon
                            >
                              <VIcon>mdi-checkbox-marked-outline</VIcon>
                            </VBtn>
                          </>
                        ) : (
                          <>
                            <VBtn
                              {...props}
                              //@ts-ignore
                              onClick={() => {
                                isSelected.value = true
                              }}
                              icon
                            >
                              <VIcon>mdi-checkbox-blank-outline</VIcon>
                            </VBtn>
                          </>
                        )}
                      </>
                    )
                  }
                }}
              />
              <VTooltip
                location={'bottom center'}
                v-slots={{
                  default: () => <span>下载该文件</span>,
                  activator: ({ props }) => (
                    <VBtn
                      {...props}
                      //@ts-ignore
                      onClick={download}
                      disabled={downloading.value}
                      icon
                    >
                      <VIcon>mdi-download-circle-outline</VIcon>
                    </VBtn>
                  )
                }}
              />
            </VCardActions>
          </VCard>
        </LazyClientOnly>
      )
    }
    //#endregion

    //* widgets
    function ViewToolbar() {
      return (
        <VToolbar density={'compact'} color={'transparent'} class={'mb-4'}>
          <VBtn
            variant={'elevated'}
            color={'primary'}
            size={'large'}
            to={{ path: '/editor' }}
          >
            <VIcon start>mdi-plus</VIcon>
            <span>创建新的简历</span>
          </VBtn>
          <VSpacer />
          <VTooltip
            location={'bottom center'}
            v-slots={{
              default: () => <span>列表视图</span>,
              activator: ({ props }) => (
                <VBtn
                  {...props}
                  //@ts-ignore
                  onClick={() => {
                    viewStyle.value = 'list'
                  }}
                  active={viewStyle.value === 'list'}
                  icon
                >
                  <VIcon>mdi-format-list-bulleted</VIcon>
                </VBtn>
              )
            }}
          />
          <VTooltip
            location={'bottom center'}
            v-slots={{
              default: () => <span>网格视图</span>,
              activator: ({ props }) => (
                <VBtn
                  {...props}
                  //@ts-ignore
                  onClick={() => {
                    viewStyle.value = 'grid'
                  }}
                  active={viewStyle.value === 'grid'}
                  icon
                >
                  <VIcon>mdi-grid-large</VIcon>
                </VBtn>
              )
            }}
          />
        </VToolbar>
      )
    }
    //#region widgets
    function ActionToolbar() {
      return (
        <VToolbar density={'compact'} color={'transparent'} class={'mb-4'}>
          <VTooltip
            location={'bottom center'}
            v-slots={{
              default: () => <span>选择文件</span>,
              activator: ({ props }) => (
                <VBtn
                  {...props}
                  //@ts-ignore
                  icon
                >
                  <VIcon>mdi-checkbox-blank-outline</VIcon>
                </VBtn>
              )
            }}
          />
          <VTooltip
            location={'bottom center'}
            v-slots={{
              default: () => <span>删除文件</span>,
              activator: ({ props }) => (
                <VBtn
                  {...props}
                  //@ts-ignore
                  icon
                >
                  <VIcon>mdi-trash-can-outline</VIcon>
                </VBtn>
              )
            }}
          />
          <VSpacer />
        </VToolbar>
      )
    }
    function GridWrapper() {
      return (
        <VRow>
          {items.value.map((item) => (
            <VCol cols={12} lg={4} md={4} sm={6}>
              <GridCard item={item} />
            </VCol>
          ))}
        </VRow>
      )
    }
    function ListWrap() {
      return (
        <VRow>
          {items.value.map((item) => (
            <VCol cols={12}>
              <GridCard item={item} />
            </VCol>
          ))}
        </VRow>
      )
    }
    function ViewStyleWrapper() {
      switch (viewStyle.value) {
        case 'grid':
          return <GridWrapper />
        case 'list':
          return <ListWrap />
        default:
          return <></>
      }
    }
    //#endregion

    return () => (
      <VContainer fluid>
        <ViewToolbar />
        <ActionToolbar />
        <VSlideYReverseTransition>
          <ViewStyleWrapper />
        </VSlideYReverseTransition>
      </VContainer>
    )
  }
})
