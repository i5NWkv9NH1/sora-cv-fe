<!--
  TODO：优化UI
 -->

<script setup lang="ts">
import type { VIP as IVIP, PayType } from '~/types'
import { payTypesData, vipsData } from '~/data'
interface Props {
  // * dialog弹窗
  modelValue?: boolean
  // * 会员数据
  items?: IVIP[]
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  items: () => vipsData,
})
const emits = defineEmits(['update:modelValue'])
const dialog = ref(props.modelValue)
watch(() => props.modelValue, () => dialog.value = props.modelValue)
watch(dialog, value => emits('update:modelValue', value))

// *  月度、年度、终身
const selectedPlan = ref<number>(1)
// *  支付方式
const selectedPay = ref<number>(1)
const payTypes = ref<PayType[]>(payTypesData)
// *  优惠码
const promoCode = ref<string>('')
// *  返回计算优惠后的价格
const promoPrice = ref<number>(0.00)
const price = computed(() => 198.00)
// * 验证状态
const isValiding = ref(false)
const isPaying = ref(false)

// *  验证优惠码，获取价格
async function validatePromoCode() {
  isValiding.value = true
  promoPrice.value = 1
}
// *  获取支付图片
async function pay() {
  isPaying.value = true
}
</script>

<template>
  <VDialog v-model="dialog">
    <VContainer>
      <VCard :loading="isPaying">
        <VCardText>
          <VRow>
            <VCol cols="12" lg="5" md="5">
              <!-- * 介绍 -->
              <VSheet class="pa-4" color="secondary">
                <div class="d-flex flex-column justify-center text-center gap-2">
                  <div class="text-subtitle-2">
                    NiceCV PRO
                  </div>
                  <div class="text-h6 font-weight-bold">
                    升级为VIP会员
                  </div>
                  <div class="text-caption font-weight-bold">
                    <p>会员可无限制使用所有简历模板</p>
                    <p>更新您的简历 获得梦想的职位</p>
                  </div>
                </div>
              </VSheet>
              <!-- * 会员列表 -->
              <VList density="compact" nav>
                <VListItem
                  v-for="item in props.items" :key="item.id" :value="item.value"
                  :active="selectedPlan === item.value" @click="selectedPlan = item.value" class="my-4" color="primary"
                >
                  <VListItemTitle>
                    <VIcon start>
                      {{ selectedPlan === item.value ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank' }}
                    </VIcon>
                    {{ item.title }}
                  </VListItemTitle>
                  <template #append>
                    <div class="text-primary">
                      ￥{{ item.price }}
                      <span class="ml-2">
                        {{ item.payTime }}
                      </span>
                    </div>
                  </template>
                </VListItem>
              </VList>
            </VCol>
            <VCol cols="12" lg="7" md="7">
              <div class="d-flex flex-column gap-4">
                <!-- * 优惠码 -->
                <div>
                  <div class="text-body-1 font-weight-bold">
                    使用优惠码
                  </div>
                  <VTextField
                    v-model="promoCode" placeholder="输入优惠码或者引荐码，获得优惠价格" variant="outlined" density="compact"
                    class="mt-2" :loading="isValiding" :disabled="isValiding"
                  >
                    <template #append>
                      <VBtn variant="elevated" color="black" rounded="lg" @click="validatePromoCode">
                        确定
                      </VBtn>
                    </template>
                  </VTextField>
                </div>

                <!-- * 计算价格 -->
                <div class="d-flex flex-column gap-2">
                  <div class="text-body-1 font-weight-bold">
                    费用结算
                  </div>
                  <div class="d-flex justify-space-between">
                    <div class="text-caption">
                      会员原价：
                    </div>
                    <div class="text-caption">
                      ￥98.00
                    </div>
                  </div>
                  <div class="d-flex justify-space-between">
                    <div class="text-caption">
                      优惠：
                    </div>
                    <div class="text-caption">
                      ￥0.00
                    </div>
                  </div>
                  <VDivider />
                  <div class="d-flex justify-space-between mt-4">
                    <div class="font-weight-bold">
                      应付款：
                    </div>
                    <div class="text-h6 text-red font-weight-bold">
                      ￥{{ price }}
                    </div>
                  </div>
                </div>

                <!-- * 支付方式 -->
                <VRadioGroup v-model="selectedPay" inline>
                  <VRadio v-for="item in payTypes" :value="item.value" :color="item.color">
                    <template #label>
                      <img :src="item.icon" width="26" height="26" class="mr-2">
                      <span>{{ item.name }}</span>
                    </template>
                  </VRadio>
                </VRadioGroup>

                <!-- * 确认支付  -->
                <VBtn variant="elevated" color="primary" @click="pay" block>
                  支付
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VContainer>
  </VDialog>
</template>
