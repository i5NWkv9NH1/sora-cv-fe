<script setup lang="ts">
import { ThemeSwitch } from '~/widgets';
</script>

<template>
  <VApp>
    <VAppBar>
      <ThemeSwitch />
      <VBtn to="/templates">简历模板</VBtn>
    </VAppBar>
    <VMain>
      <slot />
    </VMain>
  </VApp>
</template>
