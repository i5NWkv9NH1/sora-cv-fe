<script setup lang="tsx">
import { ThemeSwitch } from '~/widgets';
</script>

<template>
  <VApp>
    <VAppBar>
      <ThemeSwitch />
    </VAppBar>
    <VMain>
      <slot />
    </VMain>
  </VApp>
</template>
