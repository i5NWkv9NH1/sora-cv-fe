<script setup lang="ts">
import { ThemeSwitch, UserProfileMenu } from '~/widgets';


</script>

<template>
  <VApp>
    <VAppBar>
      <VBtn variant="plain" to="/creator">
        <VIcon size="24" start>mdi-chevron-left</VIcon>
        <span>返回我的简历</span>
      </VBtn>
      <VSpacer />
      <ThemeSwitch />
      <UserProfileMenu />
    </VAppBar>
    <VMain>
      <slot />
    </VMain>
  </VApp>
</template>
