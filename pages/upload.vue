<template>
  <UploadVideoMenu v-if="!videoFile[0]" />
  <UploadVideoDetailsMenu v-else />
</template>

<script lang='ts' setup>
const { videoFile, clearFile } = useFile()

useHead({
  title: 'Upload - VidFlow'
})

onBeforeUnmount(() => {
  clearFile()
})
</script>
