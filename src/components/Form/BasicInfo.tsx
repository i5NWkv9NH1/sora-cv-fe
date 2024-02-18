/* eslint-disable ts/prefer-ts-expect-error */
import { VAvatar, VBtn, VCol, VContainer, VForm, VIcon, VRow, VSelect, VTextField, VTextarea } from 'vuetify/components'
import { useDate } from 'vuetify'
import { AvatarUploadDialog, TextFieldDate } from '#components'

export default defineComponent({
  setup() {
    // * avatar dialog
    const avatarUploadDialog = ref(false)

    const { density } = useSettings()
    const { resume, genders, nations, maritals, dutys } = storeToRefs(useResumeStore())
    const form = resume.value.form.basicInfo

    const adapter = useDate()

    return () => (
      <VContainer fluid>
        <AvatarUploadDialog v-model={avatarUploadDialog.value} src={form.avatarUrl} change={(src: string) => form.avatarUrl = src} />

        <VForm>
          {/*  * 两行两列、头像 */}

          <VRow>
            <VCol cols={12} lg={6} md={6} sm={6}>
              {/* 第一行 第一列 姓名、英文名 */}
              <VRow>
                <VCol cols={12} lg={6}>
                  <div>
                    <label class="text-subtitle-2">姓名</label>
                    <VTextField
                      v-model={form.name}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="Jannarin"
                      // clearable
                      hideDetails
                    />
                  </div>
                </VCol>
                <VCol cols={12} lg={6}>
                  <div>
                    <label class="text-subtitle-2">英文名</label>
                    <VTextField
                      v-model={form.enName}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="Jannarin"
                      // clearable
                      hideDetails
                    />
                  </div>
                </VCol>
              </VRow>

              {/* 第二行第一列 职位 */}

              <VRow>
                <VCol cols={12}>
                  <div>
                    <label class="text-subtitle-2">当前职位</label>
                    <VTextField
                      v-model={form.currentJob}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="首席执行官"
                      // clearable
                      hideDetails
                    />
                  </div>
                </VCol>
              </VRow>
            </VCol>

            {/* 第一第二行 列 */}

            <VCol cols={12} lg={6} md={6} sm={6}>
              <VRow align="end">
                {/* <VCol cols={6} lg={12} md={12}> */}
                <VCol cols={12}>
                  {/* TODO: add default avatar */}
                  {form.avatarUrl ? (
                    <VAvatar
                      image={form.avatarUrl}
                      size="100%"
                      density={density.value}
                      // @ts-ignore
                      onClick={() => { avatarUploadDialog.value = true }}
                    />
                  ) : (
                    <VAvatar
                      size={128}
                      color="primary"
                      density={density.value}
                      // @ts-ignore
                      onClick={() => { avatarUploadDialog.value = true }}
                    />
                  )}
                </VCol>

                {/* TODO: responsive button */}
                <VCol cols={6} lg={7}>
                  <div
                    class="d-flex justify-start align-start gap-4"
                  >
                    <VBtn
                      // @ts-ignore
                      onClick={() => { avatarUploadDialog.value = true }}
                      color="teal"
                    >
                      <VIcon>mdi-pencil</VIcon>
                      <span>上传</span>
                    </VBtn>
                    <VBtn
                      // @ts-ignore
                      onClick={() => { form.avatarUrl = '' }}
                      color="error"
                      variant="tonal"
                    >
                      <VIcon>mdi-trash-can</VIcon>
                      <span>删除</span>
                    </VBtn>
                  </div>
                </VCol>
              </VRow>

              <VRow noGutters>
                <VCol cols={12}>
                  <VBtn
                    to="/"
                    // @ts-ignore
                    target="_blank"
                    color="warning"
                    variant="plain"
                    class="mt-2 pa-0"
                    size="small"
                  >
                    <VIcon start>mdi-alert</VIcon>
                    <span>简历照片应该是什么样？</span>
                  </VBtn>
                </VCol>
              </VRow>

            </VCol>
          </VRow>

          {/* // * 电话、性别 */}
          <VRow>
            <VCol cols={12} lg={6} md={6} sm={6}>
              <div>
                <label class="text-subtitle-2">电话</label>
                <VTextField
                  v-model={form.phone}
                  variant="outlined"
                  density={density.value}
                  rounded={false}
                  clearIcon="mdi-close-circle-outline"
                  placeholder="Jannarin"
                  // clearable
                  hideDetails
                />
              </div>
            </VCol>
            <VCol cols={12} lg={6} md={6} sm={6}>
              <VRow>
                <VCol cols={12} lg={12}>
                  <div>
                    <label class="text-subtitle-2">邮箱</label>
                    <VTextField
                      v-model={form.email}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="Jannarin@mail.com"
                      // clearable
                      hideDetails
                    />
                  </div>
                </VCol>
              </VRow>
            </VCol>
          </VRow>

          {/* // * 出生日期、性别 */}
          <VRow>
            <VCol cols={12} lg={6} md={6} sm={6}>
              <div>
                <label class="text-subtitle-2">出生日期</label>
                <TextFieldDate
                  v-model={form.birthday}
                />
              </div>
            </VCol>
            <VCol cols={12} lg={6} md={6} sm={6}>
              <VRow>
                <VCol cols={12} lg={12}>
                  <div>
                    <label class="text-subtitle-2">性别</label>
                    <VSelect
                      v-model={form.gender}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="性别"
                      itemValue="value"
                      itemTitle="label"
                      items={genders.value}
                      class="text-subtitle-1"
                      eager
                      // clearable
                      hideDetails
                      // v-slots={{
                      //   item({ props, item }) {
                      //     return (
                      //       <VList density={density.value} nav>
                      //         <VListItem
                      //           title={item.title}
                      //           value={item.value}
                      //           {...props}
                      //         />
                      //       </VList>
                      //     )
                      //   },
                      // }}
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
                    <label class="text-subtitle-2">民族</label>
                    <VSelect
                      v-model={form.nation}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="性别"
                      itemValue="value"
                      itemTitle="nation"
                      items={nations.value}
                      // clearable
                      eager
                      hideDetails
                      // v-slots={{
                      //   item({ props, item }) {
                      //     return (
                      //       <VList density={density.value} nav>
                      //         <VListItem
                      //           title={item.title}
                      //           value={item.value}
                      //           {...props}
                      //         />
                      //       </VList>
                      //     )
                      //   },
                      // }}
                    />
                  </div>
                </VCol>
              </VRow>
            </VCol>
            <VCol cols={12} lg={6}>
              <VRow>
                <VCol cols={12} lg={6}>
                  <div>
                    <label class="text-subtitle-2">身高（cm）</label>
                    <VTextField
                      v-model={form.height}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="身高厘米"
                      type="number"
                      // clearable
                      hideDetails
                      hideSpinButtons
                    />
                  </div>
                </VCol>
                <VCol cols={12} lg={6}>
                  <div>
                    <label class="text-subtitle-2">体重（cm）</label>
                    <VTextField
                      v-model={form.weight}
                      variant="outlined"
                      density={density.value}
                      type="number"
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="体重"
                      // clearable
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
                    <label class="text-subtitle-2">婚姻状况</label>
                    <VSelect
                      v-model={form.marital}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      itemValue="value"
                      placeholder="婚姻状况"
                      itemTitle="label"
                      items={maritals.value}
                      // clearable
                      eager
                      hideDetails
                      // v-slots={{
                      //   item({ props, item }) {
                      //     return (
                      //       <VList density={density.value} nav>
                      //         <VListItem
                      //           title={item.title}
                      //           value={item.value}
                      //           {...props}
                      //         />
                      //       </VList>
                      //     )
                      //   },
                      // }}
                    />
                  </div>
                </VCol>
              </VRow>
            </VCol>
            <VCol cols={12} lg={6}>
              <VRow>
                <VCol cols={12}>
                  <div>
                    <label class="text-subtitle-2">
                      现居城市
                      <span class="text-error">（待更新）</span>
                    </label>
                    <VTextField
                      v-model={form.currentCity}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="现居城市（待更新）"
                      // clearable
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
                    <label class="text-subtitle-2">
                      微信号（Wechat）
                    </label>
                    <VTextField
                      v-model={form.wechat}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="微信号"
                      // clearable
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
                    <label class="text-subtitle-2">Linkedin</label>
                    <VTextField
                      v-model={form.linkein}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="Linkedin"
                      // clearable
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
                <label class="text-subtitle-2">自我评价</label>
                <VTextarea
                  v-model={form.description}
                  placeholder="热情开朗，性格外向，具有亲和力，个性积极主动，有良好的沟通技巧工作认真负责，勤奋好学上进，能吃苦能抗压，能独立完成一个项目。"
                  variant="outlined"
                  density="compact"
                  hideDetails
                  hideSpinButtons
                  // clearable
                  clearIcon="mdi-close-circle-outline"
                />
              </div>
            </VCol>
          </VRow>

          {/* // * 当前状态、意向城市 */}
          <VRow>
            <VCol cols="12" lg="6">
              <VRow>
                <VCol cols={12}>
                  <div>
                    <label class="text-subtitle-2">当前状态</label>
                    <VSelect
                      v-model={form.duty}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="当前状态"
                      itemValue="value"
                      itemTitle="label"
                      items={dutys.value}
                      // clearable
                      eager
                      hideDetails
                      // v-slots={{
                      //   item({ props, item }) {
                      //     return (
                      //       <VList density={density.value} nav>
                      //         <VListItem
                      //           title={item.title}
                      //           value={item.value}
                      //           {...props}
                      //         />
                      //       </VList>
                      //     )
                      //   },
                      // }}
                    />
                  </div>
                </VCol>
              </VRow>
            </VCol>
            <VCol cols="12" lg="6">
              <VRow>
                <VCol cols={12}>
                  <div>
                    <label class="text-subtitle-2">
                      意向城市
                      <span class="text-error">（待更新）</span>
                    </label>
                    <VTextField
                      v-model={form.purposeCity}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="意向城市（待更新）"
                      // clearable
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
            {/* <VCol cols="12" lg="6">
              <VRow>
                <VCol cols={12}>

                </VCol>
              </VRow>
            </VCol> */}
            <VCol cols="12" lg="6">
              <VRow align="end" class="position-relative">
                <VCol>
                  <div>
                    <label class="text-subtitle-2">期望薪资</label>
                    <VTextField
                      v-model={form.purposeMinSalary}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="最低薪资"
                      type="number"
                      // clearable
                      hideDetails
                      hideSpinButtons
                    />
                  </div>
                </VCol>
                <VCol>
                  <div>
                    <VTextField
                      v-model={form.purposeMaxSalary}
                      variant="outlined"
                      density={density.value}
                      rounded={false}
                      clearIcon="mdi-close-circle-outline"
                      placeholder="最高薪资"
                      type="number"
                      // clearable
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
    )
  },
})
