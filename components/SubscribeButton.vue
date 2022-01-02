<template>
  <v-btn
    :class="['white--text', $vuetify.breakpoint.xs ? 'pa-3 ml-4' : '']"
    :x-small="$vuetify.breakpoint.xs"
    tile
    :disabled="$auth.user ? $auth.user.id === id : false"
    :color="subscribed ? 'grey' : 'red'"
    depressed
    v-model="subscribed"
    @click="handleSubscribe"
    >{{ subscribed ? "Subscribed" : "Subscribe" }}</v-btn
  >
</template>

<script>
export default {
  props: {
    id: String,
    channelName: String,
  },
  data() {
    return {
      subscribed: false,
    };
  },
  created() {
    if (this.$auth.loggedIn)
      this.$axios
        .get(`/user/userId/${this.$auth.user.id}/subscribed/${this.id}`)
        .then((res) => {
          if (res.status === 200) {
            this.subscribed = true;
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
        this.subscribed = !this.subscribed;
        this.$axios
          .post(
            `/user/userId/${this.$auth.user.id}/subscribers?subscribeToUserId=${this.id}&increase=${this.subscribed}`
          )
          .catch((e) => console.log(e));
        const channel = {
          id: this.id,
          channelName: this.channelName,
        };
        if (this.subscribed) {
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