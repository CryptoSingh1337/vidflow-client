<template>
  <UnauthorizeUser v-if="$auth.status.value === 'unauthenticated'" icon="mdi-thumb-up" heading="Enjoy your favorite videos" caption="Sign in to access videos that you’ve liked" />
  <div v-else>
    Liked videos
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false })
</script>
