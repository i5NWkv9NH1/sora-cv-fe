<!--
  TODO：添加用户菜单组件
 -->

<script setup lang="ts">
import { useData } from '~/composables/useData'

const { footer, logo } = useData()
const { density } = useSettings()
</script>

<template>
  <VApp>
    <VAppBar :density="density">
      <VBtn to="/templates">
        简历模板
      </VBtn>
      <VBtn to="/vip">
        VIP会员
      </VBtn>
    </VAppBar>
    <VMain>
      <slot />
    </VMain>
    <VFooter app>
      <VContainer>
        <VRow align="start">
          <!-- * logo  -->
          <VCol>
            <VSheet color="transparent">
              <VImg :lazy-src="logo" width="200" height="50" />
            </VSheet>
          </VCol>

          <!-- * route -->
          <VCol>
            <VRow justify="space-between" no-gutters>
              <VCol v-for="item in footer" :key="item.id">
                <div class="text-subtitle-1">
                  {{ item.title }}
                </div>
                <VBtn v-for="route in item.children" :key="route.id" :to="route.path" :text="route.name" />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VContainer>
    </VFooter>
  </VApp>
</template>
