<script setup lang="ts">
import { useTheme } from 'vuetify/lib/framework.mjs'

interface Props {
  isSelected?: boolean
  toggle?: () => void
  item?: any
}
const props = withDefaults(defineProps<Props>(), {
  isSelected: true,
  toggle: () => { },
  item: () => { },
})

const isEditing = ref(false)
const isDownloading = ref(false)

const { user } = useData()

useTheme().global.name.value = 'light'
</script>

<template>
  <VList lines="three">
    <!-- <VListItem :variant="isSelected ? `tonal` : `outlined`"> -->
    <VListItem>
      <template #prepend>
        <VTooltip location="bottom center">
          <template
            #activator="arg"
            :activator-props="{ item: props.item, toggle: props.toggle }"
          >
            <!-- * 选择状态下 更改图标  -->
            <!-- ! 不解构 arg，有同命名的 props  -->
            <VBtn
              v-bind="arg.props"
              :active="props.isSelected"
              :disabled="isEditing || isDownloading"
              variant="text"
              @click="toggle"
              class="mr-4"
              icon
            >
              <VIcon>
                {{ props.isSelected ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline' }}
              </VIcon>
            </VBtn>
          </template>
          <span>选择该简历</span>
        </VTooltip>
        <VAvatar :image="user.avatarUrl" />
      </template>
      <VListItemTitle>
        我的简历
      </VListItemTitle>
      <VListItemSubtitle>
        备注：一些备注
      </VListItemSubtitle>
      <VListItemSubtitle>
        修改时间：2020年11月20日
      </VListItemSubtitle>
      <template #append>
        <VCardActions>
          <VTooltip location="bottom center">
            <template
              #activator="arg"
              :activator-props="{ item: props.item, toggle: props.toggle }"
            >
              <!-- * 选择状态下 更改图标  -->
              <!-- ! 不解构 arg，有同命名的 props  -->
              <VBtn
                v-bind="arg.props"
                :active="isDownloading"
                :disabled="isEditing || isSelected"
                icon
              >
                <VIcon>
                  mdi-download-circle-outline
                </VIcon>
              </VBtn>
            </template>
            <span>下载该简历</span>
          </VTooltip>
          <VTooltip location="bottom center">
            <template
              #activator="arg"
              :activator-props="{ item: props.item, toggle: props.toggle }"
            >
              <!-- * 选择状态下 更改图标  -->
              <!-- ! 不解构 arg，有同命名的 props  -->
              <VBtn
                v-bind="arg.props"
                :active="isDownloading"
                :disabled="isEditing || isSelected"
                color="error"
                icon
              >
                <VIcon>
                  mdi-trash-can
                </VIcon>
              </VBtn>
            </template>
            <span>删除该简历</span>
          </VTooltip>
        </VCardActions>
      </template>
    </VListItem>
  </VList>
  <VDivider />
</template>
