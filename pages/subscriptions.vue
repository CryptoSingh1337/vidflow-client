<template>
  <Unauthorize
    v-if="!$auth.loggedIn"
    :icon="icon"
    :heading="heading"
    :caption="caption"
  />
</template>

<script>
import Unauthorize from "@/components/UnauthorizedUser/Unauthorize.vue";

export default {
  head() {
    return {
      title: "Subscriptions - VidFlow",
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