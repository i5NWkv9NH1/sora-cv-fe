<script setup lang="ts">
const dialog = ref(false)
const avatarUrl = ref('2.png')

function handleUpdate(e: any) {
  console.log(e)
}
</script>

<template>
  <AvatarUploadDialog v-model="dialog" :src="avatarUrl" :change="handleUpdate" />
  <VContainer class="pdf">
    <VBtn @click="dialog = !dialog">
      PDF DOWNLOAD
    </VBtn>
  </VContainer>
</template>
