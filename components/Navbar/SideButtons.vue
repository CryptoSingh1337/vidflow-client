<template>
  <router-link to="/upload">
    <v-btn icon :small="$vuetify.breakpoint.xs">
      <v-icon>mdi-video-plus-outline</v-icon>
    </v-btn>
  </router-link>
</template>

<script>
export default {
  name: "SideButtons"
};
</script>
