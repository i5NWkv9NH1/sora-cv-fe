<script setup lang="ts">
import { usePreferencesStore } from '~/stores';
import { ThemeSwitch, UserProfileMenu } from '~/widgets'

const list = ref([
  {
    id: 1, routes: [
      { name: '我的简历', path: '/creator', icon: 'mdi-view-list-outline' },
      { name: '模板中心', path: '/creator/templates', icon: 'mdi-database-outline' },
      { name: '收藏夹', path: '/creator/favorites', icon: 'mdi-heart-outline' },
      { name: '回收站', path: '/creator/recycle', icon: 'mdi-trash-can-outline' },
    ]
  },
  {
    id: 2, routes: [
      { name: '订单中心', path: '/creator/orders', icon: 'mdi-cart-minus' },
      { name: '个人设置', path: '/creator/profile', icon: 'mdi-cog-outline' },
    ]
  }
])

const { alert, density } = storeToRefs(usePreferencesStore())
</script>

<template>
  <VApp>
    <VSnackbar v-model="alert.status" :text="alert.message" :timeout="alert.delay" :location="alert.location" />
    <VAppBar :density="density">
      <ThemeSwitch />
      <VSpacer />
      <UserProfileMenu />
    </VAppBar>
    <VNavigationDrawer>
      <template #append>
        <VList density="compact" nav>
          <VListItem :prepend-icon="`mdi-lightbulb-question-outline`" title="帮助中心" to="/" exact />
        </VList>
      </template>
      <template v-for="item in list" :key="item.id">
        <VList density="compact" nav>
          <VListItem v-for="route in item.routes" :key="route.name" :to="route.path" :prepend-icon="route.icon" exact>
            <VListItemTitle>{{ route.name }}</VListItemTitle>
          </VListItem>
        </VList>
        <VDivider />
      </template>

    </VNavigationDrawer>
    <VMain>
      <slot />
    </VMain>
  </VApp>
</template>
