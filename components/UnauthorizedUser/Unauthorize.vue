<template>
  <v-container class="d-flex mt-16 align-center justify-center flex-column">
    <v-icon :size="$vuetify.breakpoint.mdAndUp ? 115 : 100">{{ icon }}</v-icon>
    <h2 class="mt-5 mb-1 text-sm-h6 text-md-h5 font-weight-medium">
      {{ heading }}
    </h2>
    <p class="text-center">
      {{ caption }}
    </p>
    <v-btn color="primary" outlined to="/login" nuxt
      ><v-icon>mdi-account</v-icon>Sign in</v-btn
    >
  </v-container>
</template>

<script>
export default {
  props: {
    icon: String,
    heading: String,
    caption: String,
  },
};
</script>