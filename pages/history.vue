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
      title: "History - VidFlow",
    };
  },
  components: {
    Unauthorize,
  },
  data() {
    return {
      icon: "mdi-history",
      heading: "Keep track of what you watch",
      caption: "Watch history isn't viewable when signed out.",
    };
  },
};
</script>