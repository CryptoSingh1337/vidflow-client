
<template>
  <v-container class="d-flex mt-16 align-center justify-center flex-column">
    <v-icon :size="$vuetify.display.mdAndUp ? 115 : 100">
      {{ props.icon }}
    </v-icon>
    <h2 class="mt-5 mb-1 text-sm-h6 text-md-h5 font-weight-medium">
      {{ props.heading }}
    </h2>
    <p class="text-center">
      {{ props.caption }}
    </p>
    <v-btn color="primary" class="mt-3" variant="outlined" to="/login" prepend-icon="mdi-account">
      Sign in
    </v-btn>
  </v-container>
</template>

<script lang="ts" setup>
const props = defineProps<{
    icon: string,
    heading: string,
    caption: string
  }>()
</script>
