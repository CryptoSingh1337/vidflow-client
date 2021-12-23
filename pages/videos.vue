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
      title: "Your vidoes - VidFlow",
    };
  },
  components: {
    Unauthorize,
  },
  data() {
    return {
      icon: "mdi-video",
      heading: "Keep your eyes on your vidoes stats",
      caption: "Sign in to see your videos stats",
    };
  },
};
</script>