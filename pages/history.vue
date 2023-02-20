<template>
  <UnauthorizeUser v-if="$auth.status.value === 'unauthenticated'" icon="mdi-history" heading="Keep track of what you watch" caption="Watch history isn't viewable when signed out." />
  <div v-else>
    History
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false })
</script>
