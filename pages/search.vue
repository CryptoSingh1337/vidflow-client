<template>
  <div>
    <h3>Search</h3>
    <div>{{ route.query }}</div>
  </div>
</template>

<script lang='ts' setup>
const route = useRoute()

definePageMeta({ auth: false })
</script>
