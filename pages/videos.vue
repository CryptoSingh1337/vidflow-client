<template>
  <UnauthorizeUser v-if="$auth.status.value === 'unauthenticated'" icon="mdi-video" heading="Keep your eyes on your vidoes stats" caption="Sign in to see your videos stats" />
  <div v-else>
    Your videos
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false })
useHead({
  title: 'Your videos - VidFlow'
})
</script>
