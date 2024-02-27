import { renderSlot } from 'vue'
import { VApp, VCol, VContainer, VImg, VMain, VRow } from 'vuetify/lib/components/index.mjs'
import { ThemeSwitch } from '~/widgets'

export default defineComponent({
  setup(_, { slots }) {
    const { sign: { thumbnailUrl } } = useData()

    return () => (
      <VApp>
        <VMain>
          {/* // * 设置100%高度，让内容垂直居中  */}
          <VContainer class="fill-width fill-height pa-0" fluid>
            <VRow class="fill-height" noGutters>
              <VCol class="hidden-xs pa-0 relative" lg={5} md={5} sm={4}>
                {/* 左侧封面图 */}
                <div class="position-absolute z-index-2">
                  <ThemeSwitch style={{ position: 'absolute', top: '1rem', left: '1rem' }} />
                </div>
                {/* // * 图片最高尺寸  */}
                <VImg src={thumbnailUrl} height="100vh" cover />
              </VCol>
              <VCol cols={12} lg={7} md={7} sm={8}>
                {/* 右侧登录 */}
                {renderSlot(slots, 'default')}
              </VCol>
            </VRow>
          </VContainer>
        </VMain>
      </VApp>
    )
  },
})
