<script setup lang="ts">
import { ThemeSwitch } from '~/widgets';
</script>

<template>
  <VApp>
    <VAppBar density='compact' border="4">
      <VAppBarNavIcon to="/" class="mr-2" />
      <ThemeSwitch />
      <VBtn to="/templates" class="mr-2">简历模板</VBtn>
      <VBtn to="/vip" class="mr-2">VIP会员</VBtn>
    </VAppBar>
    <VMain>
      <slot />
    </VMain>
  </VApp>
</template>
