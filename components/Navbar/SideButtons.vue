<template>
  <NuxtLink to="/upload">
    <v-btn icon :small="$vuetify.breakpoint.xs">
      <v-icon>mdi-video-plus-outline</v-icon>
    </v-btn>
  </NuxtLink>
</template>

<script>
export default {
  name: "SideButtons"
};
</script>
