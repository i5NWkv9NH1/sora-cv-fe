import { isEmpty } from 'lodash-es'
import {
  VAppBar,
  VAvatar,
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VCol,
  VContainer,
  VDialog,
  VDivider,
  VFabTransition,
  VFadeTransition,
  VForm,
  VIcon,
  VList,
  VListItem,
  VRow,
  VScrollXTransition,
  VSelect,
  VSheet,
  VSlideXReverseTransition,
  VSlideXTransition,
  VSpacer,
  VStepper,
  VTab,
  VTabs,
  VTextField,
  VTextarea,
  VToolbar,
  VWindow,
  VWindowItem
} from 'vuetify/lib/components/index.mjs'
import { templateListData } from '~/data'
import type { ITemplate, IUIState, PreviewOption, ResumeTab } from '~/types'
import { UIStateEmpty, UIStateError } from '~/widgets'
import { ResumeFormWrapper2, ResumePreview, } from '~/widgets/Resume'

type IQuery = {
  templateId: string | number
}

export default defineComponent({
  async setup() {
    definePageMeta({ layout: 'editor' })

    //#region store
    const data = useDataStore()
    const user = useUserStore()
    const setting = usePreferencesStore()
    const uiState = ref<IUIState>('ok')
    //#endregion

    //#region
    const current = ref<ITemplate>()
    //#endregion

    //* tab
    //#region tab
    const tab = ref<number>(1)
    const tabs = ref<ResumeTab[]>()
    //#endregion
    //* 表格数据
    //#region 表格数据
    const gender = ref()
    const nations = ref()
    const maritals = ref()
    const dutys = ref()
    //#endregion
    //TODO
    //#region store
    //TODO 移动到Store
    const density = ref<null | 'default' | 'comfortable' | 'compact'>('compact')
    //#endregion

    //* 右侧预览数据
    //#region 右侧预览数据
    const previewSize = ref<'A4' | 'PHONE'>('A4')
    const previewSizeOptions = ref<PreviewOption[]>()
    //#endregion

    //! HOOK
    //#region HOOK
    watchEffect(() => {
      if (current.value) {
        useSeoMeta({
          title: `${current.value.title} · ${current.value.subtitle}`
        })
      }
    })
    //#endregion

    //! widgets
    //#region
    //#endregion

    function ResumeFormWrapper() {
      return (
        <VSheet
          class={'resume-form'}
          style={{
            maxHeight: `calc(100vh - 64px )`,
            overflowY: 'scroll'
          }}
        >
          {/* <VTabs v-model={tab.value} density={'default'} showArrows>
            {tabs.value?.map((tab, index) => (
              <VTab value={tab.name} key={tab.id}>
                {tab.name}
              </VTab>
            ))}
          </VTabs> */}

          <VWindow v-model={tab.value}>
            <VWindowItem value={1}>
              <VContainer fluid>
                <VForm>
                  {/* 两行两列、头像 */}

                  <VRow>
                    <VCol cols={12} lg={6} md={6} sm={6}>
                      {/* 第一行 第一列 姓名、英文名 */}
                      <VRow>
                        <VCol cols={12} lg={6}>
                          <div>
                            <label class='text-subtitle-2'>姓名</label>
                            <VTextField
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'Jannarin'}
                              clearable
                              hideDetails
                            />
                          </div>
                        </VCol>
                        <VCol cols={12} lg={6}>
                          <div>
                            <label class='text-subtitle-2'>英文名</label>
                            <VTextField
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'Jannarin'}
                              clearable
                              hideDetails
                            />
                          </div>
                        </VCol>
                      </VRow>

                      {/* 第二行第一列 职位 */}

                      <VRow>
                        <VCol cols={12}>
                          <div>
                            <label class='text-subtitle-2'>当前职位</label>
                            <VTextField
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'Jannarin'}
                              clearable
                              hideDetails
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>

                    {/* 第一第二行 列 */}

                    <VCol cols={12} lg={6} md={6} sm={6}>
                      <VRow align={'end'}>
                        <VCol cols={12} lg={5}>
                          <VAvatar
                            image={user.state.avatarUrl}
                            // size={'100%'}
                            size={128}
                            density={density.value}
                          />
                        </VCol>
                        <VCol cols={12} lg={7}>
                          <div
                            class={'d-flex flex-wrap justify-start align-start'}
                            style={{ gap: '1rem' }}
                          >
                            <VBtn
                              //@ts-ignore
                              color={'teal'}
                            >
                              上传照片
                            </VBtn>
                            <VBtn
                              //@ts-ignore
                              color={'warning'}
                              variant={'tonal'}
                            >
                              删除照片
                            </VBtn>
                          </div>
                        </VCol>
                      </VRow>
                      <VRow noGutters>
                        <VCol cols={12}>
                          <VBtn
                            to={'/'}
                            //@ts-ignore
                            target='_blank'
                            color={'warning'}
                            variant={'plain'}
                            class={'mt-2 pa-0'}
                          >
                            简历照片应该是什么样？
                          </VBtn>
                        </VCol>
                      </VRow>
                    </VCol>
                  </VRow>

                  {/* 电话、性别 */}
                  <VRow>
                    <VCol cols={12} lg={6} md={6} sm={6}>
                      <div>
                        <label class='text-subtitle-2'>电话</label>
                        <VTextField
                          variant={'outlined'}
                          density={density.value}
                          rounded={false}
                          clearIcon={'mdi-close-circle-outline'}
                          placeholder={'Jannarin'}
                          clearable
                          hideDetails
                        />
                      </div>
                    </VCol>
                    <VCol cols={12} lg={6} md={6} sm={6}>
                      <VRow>
                        <VCol cols={12} lg={12}>
                          <div>
                            <label class='text-subtitle-2'>性别</label>
                            <VSelect
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'性别'}
                              itemValue={'value'}
                              itemTitle={'label'}
                              items={gender.value}
                              class={'text-subtitle-1'}
                              clearable
                              hideDetails
                              v-slots={{
                                item({ props, item }) {
                                  return (
                                    <VList density={density.value} nav>
                                      <VListItem
                                        title={item.title}
                                        value={item.value}
                                        {...props}
                                      />
                                    </VList>
                                  )
                                }
                              }}
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>
                  </VRow>

                  {/* 民族、身高  体重 */}
                  <VRow>
                    <VCol cols={12} lg={6}>
                      <VRow>
                        <VCol cols={12} lg={12}>
                          <div>
                            <label class='text-subtitle-2'>民族</label>
                            <VSelect
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'性别'}
                              itemValue={'code'}
                              itemTitle={'nation'}
                              items={nations.value}
                              clearable
                              hideDetails
                              v-slots={{
                                item({ props, item }) {
                                  return (
                                    <VList density={density.value} nav>
                                      <VListItem
                                        title={item.title}
                                        value={item.value}
                                        {...props}
                                      />
                                    </VList>
                                  )
                                }
                              }}
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>
                    <VCol cols={12} lg={6}>
                      <VRow>
                        <VCol cols={12} lg={6}>
                          <div>
                            <label class='text-subtitle-2'>身高（cm）</label>
                            <VTextField
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'身高厘米'}
                              type={'number'}
                              clearable
                              hideDetails
                              hideSpinButtons
                            />
                          </div>
                        </VCol>
                        <VCol cols={12} lg={6}>
                          <div>
                            <label class='text-subtitle-2'>体重（cm）</label>
                            <VTextField
                              variant={'outlined'}
                              density={density.value}
                              type={'number'}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'身高厘米'}
                              clearable
                              hideDetails
                              hideSpinButtons
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>
                  </VRow>

                  {/* 婚姻状况、现居城市 */}
                  <VRow>
                    <VCol cols={12} lg={6}>
                      <VRow>
                        <VCol cols={12}>
                          <div>
                            <label class='text-subtitle-2'>婚姻状况</label>
                            <VSelect
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              itemValue={'value'}
                              placeholder={'婚姻状况'}
                              itemTitle={'label'}
                              items={maritals.value}
                              clearable
                              hideDetails
                              v-slots={{
                                item({ props, item }) {
                                  return (
                                    <VList density={density.value} nav>
                                      <VListItem
                                        title={item.title}
                                        value={item.value}
                                        {...props}
                                      />
                                    </VList>
                                  )
                                }
                              }}
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>
                    <VCol cols={12} lg={6}>
                      <VRow>
                        <VCol cols={12}>
                          <div>
                            <label class='text-subtitle-2'>
                              现居城市
                              <span class='text-error'>（待更新）</span>
                            </label>
                            <VTextField
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'现居城市（待更新）'}
                              type={'number'}
                              clearable
                              hideDetails
                              hideSpinButtons
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>
                  </VRow>

                  {/* 社交帐号 */}
                  <VRow>
                    <VCol cols={12} lg={6}>
                      <VRow>
                        <VCol cols={12}>
                          <div>
                            <label class='text-subtitle-2'>
                              微信号（Wechat）
                            </label>
                            <VTextField
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'微信号'}
                              clearable
                              hideDetails
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>
                    <VCol cols={12} lg={6}>
                      <VRow>
                        <VCol cols={12}>
                          <div>
                            <label class='text-subtitle-2'>Linkedin</label>
                            <VTextField
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'Linkedin'}
                              clearable
                              hideDetails
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>
                  </VRow>

                  {/*  自我评价 */}
                  <VRow>
                    <VCol cols={12}>
                      <div>
                        <label class='text-subtitle-2'>自我评价</label>
                        <VTextarea
                          placeholder={
                            '热情开朗，性格外向，具有亲和力，个性积极主动，有良好的沟通技巧工作认真负责，勤奋好学上进，能吃苦能抗压，能独立完成一个项目。'
                          }
                          variant={'outlined'}
                          density={'compact'}
                          hideDetails
                          hideSpinButtons
                          clearable
                        />
                      </div>
                    </VCol>
                  </VRow>

                  {/* 当前状态、意向城市 */}
                  <VRow>
                    <VCol cols={'12'} lg={'6'}>
                      <VRow>
                        <VCol cols={12}>
                          <div>
                            <label class='text-subtitle-2'>当前状态</label>
                            <VSelect
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'当前状态'}
                              itemValue={'value'}
                              itemTitle={'label'}
                              items={dutys.value}
                              clearable
                              hideDetails
                              v-slots={{
                                item({ props, item }) {
                                  return (
                                    <VList density={density.value} nav>
                                      <VListItem
                                        title={item.title}
                                        value={item.value}
                                        {...props}
                                      />
                                    </VList>
                                  )
                                }
                              }}
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>
                    <VCol cols={'12'} lg={'6'}>
                      <VRow>
                        <VCol cols={12}>
                          <div>
                            <label class='text-subtitle-2'>
                              意向城市
                              <span class='text-error'>（待更新）</span>
                            </label>
                            <VTextField
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'意向城市（待更新）'}
                              type={'number'}
                              clearable
                              hideDetails
                              hideSpinButtons
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>
                  </VRow>

                  {/* 期望职位、期望薪资 */}
                  <VRow>
                    <VCol cols={'12'} lg={'6'}>
                      <VRow>
                        <VCol cols={12}>
                          <div>
                            <label class='text-subtitle-2'>期望城市</label>
                            <VSelect
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'期望城市'}
                              itemValue={'value'}
                              itemTitle={'label'}
                              items={dutys.value}
                              clearable
                              hideDetails
                              v-slots={{
                                item({ props, item }) {
                                  return (
                                    <VList density={density.value} nav>
                                      <VListItem
                                        title={item.title}
                                        value={item.value}
                                        {...props}
                                      />
                                    </VList>
                                  )
                                }
                              }}
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>
                    <VCol cols={'12'} lg={'6'}>
                      <VRow align={'end'} class={'position-relative'}>
                        <VCol>
                          <div>
                            <label class='text-subtitle-2'>期望薪资</label>
                            <VTextField
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'最低薪资'}
                              type={'number'}
                              clearable
                              hideDetails
                              hideSpinButtons
                            />
                          </div>
                        </VCol>
                        <VCol>
                          <div>
                            <VTextField
                              variant={'outlined'}
                              density={density.value}
                              rounded={false}
                              clearIcon={'mdi-close-circle-outline'}
                              placeholder={'最高薪资'}
                              type={'number'}
                              clearable
                              hideDetails
                              hideSpinButtons
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>
                  </VRow>
                </VForm>
              </VContainer>
            </VWindowItem>
            <VWindowItem value={2}>
              <div>教育经历</div>
            </VWindowItem>
            <VWindowItem value={3}>
              <div>实习经历</div>
            </VWindowItem>
            <VWindowItem value={4}>
              <div>校内实践</div>
            </VWindowItem>
            <VWindowItem value={5}>
              <div>专业技能</div>
            </VWindowItem>
            <VWindowItem value={6}>
              <div>其他</div>
            </VWindowItem>
          </VWindow>
        </VSheet>
      )
    }
    function ResumeA4Preview() {
      return (
        <VRow>
          <VCol cols={12}>
            <VCard>
              {Array.from({ length: 20 }).map((_) => (
                <h1>1</h1>
              ))}
            </VCard>
          </VCol>
        </VRow>
      )
    }
    function ResumePhonePreview() {
      return (
        <VRow justify={'center'}>
          <VCol cols={6}>
            <VCard>
              {Array.from({ length: 20 }).map((_) => (
                <h1>1</h1>
              ))}
            </VCard>
          </VCol>
        </VRow>
      )
    }
    function ResumePreviewSizeWrapper() {
      switch (previewSize.value) {
        case 'A4':
          return <ResumeA4Preview />
        case 'PHONE':
          return <ResumePhonePreview />
        default:
          return <ResumeA4Preview />
      }
    }
    function ResumePreviewWrapper() {
      return (
        <>
          <VToolbar density={density.value} border={1}>
            {previewSizeOptions.value?.map((btn) => (
              <VBtn
                key={btn.id}
                //@ts-ignore
                onClick={() => {
                  previewSize.value = btn.value
                }}
                active={previewSize.value === btn.value}
                class={'mr-2'}
                variant={previewSize.value === btn.value ? 'tonal' : 'flat'}
                size={'small'}
              >
                <VIcon start>{btn.icon}</VIcon>
                <span>{btn.label}</span>
              </VBtn>
            ))}
          </VToolbar>
          <VSheet
            style={{
              maxHeight: `calc(100vh - 64px - 48px)`,
              overflowX: 'scroll'
            }}
            rounded={0}
            class={'preview'}
          >
            <VContainer>
              <VSlideXTransition>
                <ResumePreviewSizeWrapper />
              </VSlideXTransition>
            </VContainer>
          </VSheet>
        </>
      )
    }

    function ResumeWrapper() {
      return (
        //*
        <VRow class={'fill-height'} noGutters>
          <VCol cols={12} lg={5} md={5}>
            {/* <ResumeFormWrapper /> */}
            <ResumeFormWrapper2 />
          </VCol>
          {/* <VCol class={'hidden-sm-and-down'}>
            <VDivider
              class={'fill-height'}
              vertical
              thickness={2}
              length={'100%'}
            />
          </VCol> */}
          <VCol cols={12} lg={7} md={7} class='hidden-xs'>
            {/* <ResumePreviewWrapper /> */}
            <ResumePreview />
          </VCol>
        </VRow>
      )
    }

    function UIStateWrapper() {
      switch (uiState.value) {
        case 'loading':
          return <div>loading...</div>
        case 'ok':
          return <ResumeWrapper />
        case 'empty':
          return <UIStateEmpty />
        case 'error':
          return <UIStateError />
        default:
          return <UIStateError />
      }
    }

    watchEffect(() => {
      const route = useRoute()
      const query = route.query as IQuery

      if (isEmpty(query)) {
        current.value = data.state.defaultTemplate
      } else {
        const item = data.state.templateList.find(
          (item) =>
            item.id === query.templateId || item.id === +query.templateId
        )
        current.value = item
      }
      console.log(current.value)
    })

    return () => (
      <VContainer class={'pa-0 fill-height'} fluid>
        <UIStateWrapper />
      </VContainer>
    )
  }
})
