<template>
  <div>
    {{ route.params.id }}
  </div>
</template>

<script lang='ts' setup>
const route = useRoute()

useHead({
  title: 'Your Channel - VidFlow'
})
</script>
