<template>
  <Unauthorize
    v-if="!$auth.loggedIn"
    :icon="icon"
    :heading="heading"
    :caption="caption"
  />
  <v-container
    v-else
    class="d-flex mt-16 pt-16 align-center justify-center flex-column"
  >
    <v-icon
      class="mb-5"
      :color="$vuetify.theme.dark ? '' : '#000000'"
      :size="90"
      >mdi-information</v-icon
    >
    <div class="mx-auto text-h3 text-center font-weight-bold">
      This page yet to be implemented
    </div>
  </v-container>
</template>

<script>
import Unauthorize from "@/components/UnauthorizedUser/Unauthorize.vue";

export default {
  head() {
    return {
      title: "Shorts - VidFlow",
    };
  },
  components: {
    Unauthorize,
  },
  data() {
    return {
      icon: "mdi-youtube-subscription",
      heading: "Don't miss new videos",
      caption: "Sign in to see updates from your favorite channels",
    };
  },
};
</script>