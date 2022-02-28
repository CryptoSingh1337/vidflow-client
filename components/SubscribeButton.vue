<template>
  <v-btn
    :class="['white--text', $vuetify.breakpoint.xs ? 'pa-3 ml-4' : '']"
    :x-small="$vuetify.breakpoint.xs"
    tile
    :disabled="same"
    :color="subscribe ? 'grey' : 'red'"
    depressed
    v-model="subscribe"
    @click="handleSubscribe"
    >{{ subscribe ? "Subscribed" : "Subscribe" }}</v-btn
  >
</template>

<script>
export default {
  props: {
    id: String,
    channelName: String,
    subscribed: Boolean,
    same: Boolean,
  },
  data() {
    return {
      subscribe: this.subscribed,
    };
  },
  methods: {
    setAlert(type, icon, text) {
      this.$store.commit("showAlert", {
        alertType: type,
        alertIcon: icon,
        alertText: text,
      });
      setTimeout(() => this.$store.commit("toggleAlert"), 2000);
    },
    handleSubscribe() {
      if (this.$auth.loggedIn) {
        this.subscribe = !this.subscribe;
        this.$axios
          .post(
            `/user/id/${this.$auth.user.id}/subscribers?subscribeToUserId=${this.id}&increase=${this.subscribe}`
          )
          .catch((e) => console.log(e));
        const channel = {
          id: this.id,
          channelName: this.channelName,
        };
        if (this.subscribe) {
          this.$nuxt.$emit("addSubscription", channel);
        } else {
          this.$nuxt.$emit("removeSubscription", channel);
        }
      } else {
        this.setAlert(
          "error",
          "mdi-alert-circle",
          "You must login to subscribe a channel."
        );
      }
    },
  },
};
</script>