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
      title: "Liked vidoes - VidFlow",
    };
  },
  components: {
    Unauthorize,
  },
  data() {
    return {
      icon: "mdi-thumb-up",
      heading: "Enjoy your favorite videos",
      caption: "Sign in to access videos that you’ve liked",
    };
  },
};
</script>