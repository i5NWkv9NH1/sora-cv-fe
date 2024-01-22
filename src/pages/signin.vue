<script setup lang="tsx">
import { VBtn, VCol, VForm, VIcon, VImg, VRow, VSheet, VTextField } from 'vuetify/lib/components/index.mjs'

const { sign: { qrCode } } = useData()
const { state } = storeToRefs(useUserStore())

definePageMeta({
  layout: 'auth',
  // middleware: [
  //   (to, from) => {
  //     const store = useUserStore()
  //     if (!store.state.token) {
  //       return navigateTo('/creator')
  //     }
  //   }
  // ]
})

useSeoMeta({ title: '登录' })

// * 获取微信登录扫码图片
async function fetchWechatQRCode() {
  console.log('wechat qrcode...')
}
// * 发送短信验证码
async function fetchSMS() {
  // * 未输入手机号
  const { items } = await formEl.value
  const isPhoneValid = items[0].isValid
  if (!isPhoneValid)
    return false

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

// * 点击登录
async function handleSign(e: Event) {
  e.preventDefault()
  const { isValid } = await formEl.value
  if (!isValid)
    return false

  // * update token
  state.value.token = '1'
  // * redirect to '/creator' or ref
  navigateTo('/creator')
}

// * 1是微信扫码登录，默认登陆方式
const current = ref(1)
// * 60秒限制发送短信验证码
const timer = ref(60)
// * 表单绑定的东西
const isSendSMS = ref(false)
const formEl = ref()
const form = reactive({
  phone: {
    value: '',
    rule: [
      (v: string) => !!v || 'no input',
      (v: string) => v.length >= 11 || 'must be big than 11',
      (v: string) => v.length < 12 || 'must be less than 12',
    ],
    placeholder: '请输入手机号码',
  },
  verifyCode: {
    value: '',
    rules: [
      (v: string) => v.length >= 6 || 'must be big than 6',
      (v: string) => v.length < 7 || 'must be less than 7',
    ],
    placeholder: '验证码',
  },
})

// * 手机扫码登录
function WeChatQRCode() {
  return (
    <VSheet elevation={4} class={[`fill-width pa-4`, `d-flex flex-column gap-4 align-center text-center`]}>
      <div class="text-h5 font-weight-bolder">
        使用微信扫码快捷登录
      </div>
      <div class="pa-4 border-4 position-relative">
        <VImg src={qrCode} width={250} height={250} />
      </div>
      <VBtn
        variant="text"
        // @ts-expect-error
        onClick={() => current.value = 2}
      >
        <span>使用手机验证码登录</span>
        <VIcon end>mdi-chevron-right</VIcon>
      </VBtn>
    </VSheet>
  )
}

// * 手机验证码登录
function PhoneSignin() {
  return (
    // * use flex colunm gap
    <VSheet elevation={4} class={[`fill-width  pa-4`, `d-flex flex-column gap-4 justify-space-evenly`]} minHeight={400}>
      <div class="text-h5 font-weight-bolder text-center">
        使用手机快捷登录
      </div>

      {/* // * use flex colunm */}
      <VForm class={[`mx-auto`, `d-flex flex-column gap-4`]} onSubmit={handleSign} ref={formEl}>
        <VTextField
          v-model={form.phone.value}
          rules={form.phone.rule}
          placeholder={form.phone.placeholder}
          variant="outlined"
          type="number"
          hideSpinButtons
          autofocus
          hideDetails
        />
        <VTextField
          v-model={form.verifyCode.value}
          placeholder={form.verifyCode.placeholder}
          rules={form.verifyCode.rules}
          variant="outlined"
          type="number"
          hideSpinButtons
          hideDetails
          v-slots={{
            'append-inner': () => (
              <VBtn
                disabled={isSendSMS.value}
                variant="text"
                // @ts-expect-error
                onClick={fetchSMS}
                block
              >
                {isSendSMS.value
                  ? (
                  <span>{timer.value}</span>
                    )
                  : (
                  <span>发送验证码</span>
                    )}
              </VBtn>
            ),
          }}

        />
        <VBtn
          class="mt-4"
          variant="elevated"
          color="primary" // @ts-expect-error

          type="submit"
          block
        >
          登录
        </VBtn>
      </VForm>

      <VBtn
        // @ts-expect-error
        onClick={() => current.value = 1}
        variant="text"
      >
        <VIcon start>mdi-chevron-left</VIcon>
        <span>使用微信扫码快捷登录</span>
      </VBtn>
    </VSheet>
  )
}

// * 切换
function SignMethodsWrapper() {
  switch (current.value) {
    case 1:
      return <WeChatQRCode />
    case 2:
      return <PhoneSignin />
    default: <WeChatQRCode />
  }
}
</script>

<template>
  <VContainer class="fill-height" fluid>
    <VRow class="fill-height fill-width" justify="center" align="center" no-gutters>
      <VCol cols="10" lg="6" md="8" sm="10">
        <VSlideXTransition>
          <SignMethodsWrapper />
        </VSlideXTransition>
        <!-- <div>登录即代表同意我们的</div>
        <div class="d-flex">
          <VBtn to="/" variant="text" color="primary">《服务协议》</VBtn>
          <VBtn to="/" variant="text" color="primary">《用户隐私协议》</VBtn>
        </div> -->
      </VCol>
    </VRow>
  </VContainer>
</template>
