import {
  VBtn,
  VCol,
  VContainer,
  VForm,
  VIcon,
  VImg,
  VRow,
  VSheet,
  VSlideXTransition,
  VTextField
} from 'vuetify/lib/components/index.mjs'
import { useTheme } from 'vuetify/lib/framework.mjs'
import { UIStateError } from '~/widgets'

export default defineComponent({
  setup() {
    definePageMeta({
      layout: 'auth',
      middleware: [
        (to, from) => {
          const store = useUserStore()
          if (store.state.token) {
            return navigateTo({ path: '/creator' })
          }
        }
      ]
    })
    useSeoMeta({ title: '登录' })
    useTheme().global.name.value = 'dark'

    const store = useUserStore()

    const image = ref(
      'https://www.nicecv.cn/api/web/uploads/20230722150520f541c9245.jpg'
    )
    const qrcode = ref(
      'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQGj8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyUV9TSDhPVC1lakcxSkpuQXhCMXEAAgQx16RlAwQ8AAAA'
    )
    const current = ref(1)
    const timer = ref(5)
    const isSendSMS = ref(false)
    const form = reactive({
      phone: {
        value: '',
        rule: [
          (v: string) => !!v || 'no input',
          (v: string) => v.length >= 11 || 'must be big than 11',
          (v: string) => v.length < 12 || 'must be less than 12'
        ],
        placeholder: '请输入手机号码'
      },
      verifyCode: {
        value: '',
        rules: [
          (v: string) => v.length >= 6 || 'must be big than 6',
          (v: string) => v.length < 7 || 'must be less than 7'
        ],
        placeholder: '验证码'
      }
    })
    // const disabledSigninBtn = computed(() => {
    //   if (!!form.phone.value && !!form.verifyCode.value) {
    //     if (
    //       form.phone.value.length === 11 &&
    //       form.verifyCode.value.length === 6
    //     ) {
    //       return false
    //     }
    //     return true
    //   }
    //   return true
    // })
    const disabledSigninBtn = computed(
      () =>
        !(form.phone.value.length === 11 && form.verifyCode.value.length === 6)
    )

    async function handleSendSMS() {
      isSendSMS.value = true
      timer.value = 60
      const countDown = setInterval(() => {
        timer.value--
        if (timer.value <= 0) {
          clearInterval(countDown)
          isSendSMS.value = false
        }
      }, 1000)
    }
    async function handleSignin() {
      const body = {
        phone: form.phone.value,
        verifyCode: form.verifyCode.value
      }

      store.state.token = 'token'

      await navigateTo({ path: '/creator' })
    }

    function WeChatQRCode() {
      return (
        <VSheet class={'d-flex flex-column justify-center pa-8'}>
          <div class='text-h6 font-weight-bold text-warning'>
            使用微信扫码快捷登录
          </div>
          <div class={'pa-4 border-4 position-relative'}>
            <VImg src={qrcode.value} />
          </div>
          <div class={''}>
            <VBtn
              variant={'text'}
              //@ts-ignore
              onClick={() => {
                current.value = 1
              }}
            >
              <span>使用手机验证码登录</span>
              <VIcon end>mdi-chevron-right</VIcon>
            </VBtn>
          </div>
        </VSheet>
      )
    }

    function PhoneSignin() {
      return (
        <VRow style={{ flex: 'none', width: '100%' }} justify={'center'}>
          <VCol cols={10} lg={8} md={10} sm={10} class={'pa-0'}>
            <VSheet class={'d-flex flex-column justify-center pa-8 my-4'}>
              <div class='text-h6 font-weight-bold text-warning'>
                使用手机验证码登录
              </div>
              <VForm class={'pa-4 border-4'}>
                <VTextField
                  v-model={form.phone.value}
                  rules={form.phone.rule}
                  placeholder={form.phone.placeholder}
                  variant={'outlined'}
                  type={'number'}
                  hideSpinButtons
                  autofocus
                  hideDetails
                />
                <VTextField
                  v-model={form.verifyCode.value}
                  placeholder={form.verifyCode.placeholder}
                  rules={form.verifyCode.rules}
                  variant={'outlined'}
                  class={'mt-4'}
                  type={'number'}
                  hideSpinButtons
                  v-slots={{
                    'append-inner': () => (
                      <VBtn
                        disabled={isSendSMS.value}
                        //@ts-ignore
                        onClick={handleSendSMS}
                        // onClick={() => {
                        //   isSendSMS.value = true
                        // }}
                        block
                      >
                        {isSendSMS.value ? (
                          <span>{timer.value}</span>
                        ) : (
                          <span>发送验证码</span>
                        )}
                      </VBtn>
                    )
                  }}
                  hideDetails
                />
                <VBtn
                  class={'mt-4'}
                  variant={'elevated'}
                  //@ts-ignore
                  onClick={handleSignin}
                  disabled={disabledSigninBtn.value}
                  block
                >
                  登录
                </VBtn>
              </VForm>
              <div class={''}>
                <VBtn
                  variant={'text'}
                  //@ts-ignore
                  onClick={() => {
                    current.value = 0
                  }}
                >
                  <span>微信验证码登录</span>
                  <VIcon end>mdi-chevron-right</VIcon>
                </VBtn>
              </div>
            </VSheet>
          </VCol>
        </VRow>
      )
    }

    function SignMethodsWrapper() {
      switch (current.value) {
        case 0:
          return <WeChatQRCode />
        case 1:
          return <PhoneSignin />
        default:
          return <UIStateError />
      }
    }

    return () => (
      <VContainer class={'pa-0 fill-height'} fluid>
        <VRow class={'fill-height'}>
          <VCol class={'hidden-xs pa-0'} lg={6} md={6} sm={4}>
            <VImg
              // class={'fill-height'}
              // width={'100%'}
              src={image.value}
              height={'100vh'}
              cover
              // cover
            />
          </VCol>
          <VCol cols={12} lg={6} md={6} sm={8}>
            <div
              class='d-flex flex-column align-center justify-center fill-height text-center'
              style={{ gap: '1rem' }}
            >
              <div class='text-h4 font-weight-bold'>欢迎登录 NiceCV</div>
              <div class='text-caption'>
                轻松在线制作您的精美个人简历，更好的介绍您自己
              </div>
              <VSlideXTransition>
                <SignMethodsWrapper />
              </VSlideXTransition>
              <div class={'text-caption'}>
                <span>登录即代表同意我们的</span>
                {/*@ts-ignore*/}
                <NuxtLink to={'/'} class={'text-decoration-none'}>
                  《服务协议》
                  {/*@ts-ignore*/}
                </NuxtLink>
                {/*@ts-ignore*/}
                <NuxtLink to={'/'} class={'text-decoration-none'}>
                  《用户隐私协议》
                  {/*@ts-ignore*/}
                </NuxtLink>
              </div>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    )
  }
})
