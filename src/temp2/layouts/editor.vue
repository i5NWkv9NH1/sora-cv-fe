<script setup lang="ts">
import { ThemeSwitch, UserProfileMenu } from '~/widgets'

const { size, sizeMode, density, drawer, densityMode, theme, themeMode, flat } = storeToRefs(usePreferencesStore())
const { editor } = storeToRefs(useDataStore())
const { toggleDrawer } = usePreferencesStore()
</script>

<template>
  <VApp>
    <VAppBar :density="density" :flat="flat">
      <VBtn variant="plain" to="/creator">
        <VIcon size="24" start>
          mdi-chevron-left
        </VIcon>
        <span>返回我的简历</span>
      </VBtn>
      <VSpacer />
      <!-- <ResumeNameTextField /> -->
      <div class="mx-4 flex-4">
        <VTextField
          v-model="editor.resume.name" density="compact" variant="solo" append-inner-icon="mdi-pencil-outline"
          hide-details single-line flat
        />
      </div>
      <VSpacer />
      <VBtn to="/">
        帮助
      </VBtn>
      <VBtn to="/">
        分享
      </VBtn>
      <ThemeSwitch />
      <UserProfileMenu />
      <VBtn @click="toggleDrawer" icon>
        <VIcon>mdi-cog</VIcon>
      </VBtn>
    </VAppBar>

    <VNavigationDrawer v-model="drawer" location="right" width="350" :rounded="false" temporary>
      <VToolbar>
        <VToolbarTitle>偏好设置</VToolbarTitle>
        <template #append>
          <VBtn @click="toggleDrawer" variant="elevated" rounded="xl" elevation="0" icon>
            <VIcon>mdi-close</VIcon>
          </VBtn>
        </template>
      </VToolbar>
      <VDivider />
      <VContainer>
        <div>
          <div class="mb-3">
            <VLabel class="mb-2 font-weight-medium">
              主题设置
            </VLabel>
            <VMessages messages="自定义主题是明亮还是黑暗的主题，或者两者的结合" active />
          </div>
          <VRadioGroup v-model="theme">
            <VRadio
              v-for="item in themeMode" :key="item.value" :value="item.value"
              true-icon="mdi-check-circle-outline" :color="theme === item.value ? 'primary' : 'default'"
            >
              <template #label>
                <VIcon start>
                  {{ item.icon || 'mdi-heart' }}
                </VIcon>
                {{ item.label }}
              </template>
            </VRadio>
          </VRadioGroup>
          <div class="mb-3">
            <VLabel class="mb-2 font-weight-medium">
              密度设置
            </VLabel>
            <VMessages messages="自定义主题是明亮还是黑暗的主题，或者两者的结合" active />
          </div>
          <VRadioGroup v-model="density">
            <VRadio
              v-for="(item) in densityMode" :key="item.label" :value="item.value" true-icon="mdi-check"
              :color="item.value === density ? 'primary' : 'default'" :label="item.label"
            />
          </VRadioGroup>
          <div class="mb-3">
            <VLabel class="mb-2 font-weight-medium">
              尺寸设置
            </VLabel>
            <VMessages messages="自定义主题是明亮还是黑暗的主题，或者两者的结合" active />
          </div>
          <VRadioGroup v-model="size">
            <VRadio
              v-for="(item) in sizeMode" :key="item.label" :value="item.value"
              true-icon="mdi-check-circle-outline" :color="item.value === size ? 'primary' : 'default'"
              :label="item.label"
            />
          </VRadioGroup>
          <VSwitch
            v-model="flat" label="启动阴影效果" inset true-icon="mdi-check" false-icon="mdi-close" color="primary"
            hint="启动!" persistent-hint
          />
        </div>
      </VContainer>
      <template #append>
        <div>
          <VDivider />
          <div class="text-medium-emphasis text-caption py-2 px-3 d-flex align-center">
            <div class="d-inline-flex align-center">
              <VIcon start>
                mdi-tag-outline
              </VIcon>
              最新发行版
            </div>
            <VBtn to="/" variant="text" class="px-2 ms-auto text-none" density="compact" rounded="lg">
              v3.4.10
              <VIcon end>
                mdi-heart
              </VIcon>
            </VBtn>
          </div>
        </div>
      </template>
    </VNavigationDrawer>
    <VMain>
      <slot />
    </VMain>
  </VApp>
</template>
