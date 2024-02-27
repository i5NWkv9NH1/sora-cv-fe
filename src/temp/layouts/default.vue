<script setup lang="ts">
import { ThemeSwitch } from '~/widgets';

const state = reactive({
  footer: [
    {
      title: '产品',
      children: [
        { title: '简历模板', path: '/templates' },
        { title: 'AI 工具', path: '/ai' }
      ]
    },
    {
      title: '文章',
      children: [
        { title: '求职攻略', path: '/templates' },
        { title: '面试经验', path: '/ai' },
        { title: '建立指南', path: '/ai' }
      ]
    },
    {
      title: '关于我们',
      children: [
        { title: '产品介绍', path: '/templates' },
        { title: '服务协议', path: '/ai' },
        { title: '隐私条款', path: '/ai' }
      ]
    },
    {
      title: '服务',
      children: [
        { title: '帮助中心', path: '/templates' },
        { title: '常见问题', path: '/ai' },
        { title: '成为VIP会员', path: '/ai' }
      ]
    },
    {
      title: '联系我们',
      children: [
        { title: '微信号：Bravesnail', path: '' },
        { title: '公众号：奈斯简历NiceCV', path: '' },
        { title: '小红书：奈斯简历', path: '' }
      ]
    }
  ]
})
</script>

<template>
  <VApp>
    <VAppBar>
      <VAppBarNavIcon to="/" class="mr-2" />
      <ThemeSwitch />
      <VBtn to="/templates" class="mr-2">简历模板</VBtn>
      <VBtn to="/vip" class="mr-2">VIP会员</VBtn>
    </VAppBar>
    <VMain>
      <slot />
    </VMain>
    <VFooter color="#1f2937" class="mt-8">
      <VContainer>
        <VRow align="start">
          <VCol cols="12" lg="2" md="2">
            <VSheet color="transparent">
              <VImg src="https://www.nicecv.cn/api/web/uploads/202312231607230d6e51965.png" width="120" height="50" />
            </VSheet>
          </VCol>
          <VCol cols="12" lg="10" md="10">
            <VRow justify="space-between" no-gutters>
              <VCol cols="6" lg="2" md="3" sm="3" v-for="item in state.footer" :key="item.title">
                <div class="text-subtitle-1">{{ item.title }}</div>
                <div class="text-caption text-blue-grey-darken-4" v-for="route in item.children" :key="route.title">
                  <VHover>
                    <template v-slot:default="{ isHovering, props }">
                      <NuxtLink :to="route.path && route.path"
                        :class="['text-decoration-none', isHovering ? 'text-info' : 'text-blue-grey-darken-1']"
                        v-bind="props">
                        {{ route.title }}</NuxtLink>
                    </template>
                  </VHover>
                </div>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow no-gutters>
          <div class="text-caption mt-8">Copyright © 2024 nicecv.cn. All Rights Reserved. 服务协议 用户隐私协议 闽ICP备20009973号</div>
        </VRow>
      </VContainer>
    </VFooter>
  </VApp>
</template>
