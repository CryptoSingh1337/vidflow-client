<template>
  <v-btn
    :class="['white--text', $vuetify.breakpoint.xs ? 'pa-3 ml-4' : '']"
    :x-small="$vuetify.breakpoint.xs"
    tile
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
    userId: String,
  },
  data() {
    return {
      subscribed: false,
    };
  },
  methods: {
    handleSubscribe() {
      this.subscribed = !this.subscribed;
      this.$axios
        .post(
          `/user/userId/${this.userId}/subscribers?increase=${this.subscribed}`
        )
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style>
</style>