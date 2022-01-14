<template>
  <div v-if="channels.length > 0">
    <v-list-item
      :key="i"
      v-for="(subscription, i) in channels"
      link
      nuxt
      :to="`/channel/${subscription.id}`"
      dense
    >
      <v-list-item-avatar
        ><v-img
          :src="`https://avatars.dicebear.com/api/bottts/${subscription.channelName}.svg`"
        ></v-img
      ></v-list-item-avatar>
      <v-list-item-title> {{ subscription.channelName }} </v-list-item-title>
    </v-list-item>
    <v-list-item class="ma-0" style="min-height: 10px !important"
      ><v-divider></v-divider
    ></v-list-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      channels: [],
    };
  },
  created() {
    if (this.$auth.loggedIn)
      this.$axios
        .get(`/user/userId/${this.$auth.user.id}/subscribed`)
        .then((res) => res.data)
        .then((data) => (this.channels = data))
        .catch((e) => console.log(e));

    this.$nuxt.$on("addSubscription", (channel) => {
      this.addSubscription(channel);
    });
    this.$nuxt.$on("removeSubscription", (channel) => {
      this.removeSubscription(channel);
    });
  },
  methods: {
    addSubscription(channel) {
      this.channels.push(channel);
    },
    removeSubscription(channel) {
      this.channels = this.channels.filter((c) => c.id !== channel.id);
    },
  },
};
</script>