<template>
  <div>
    <v-list-item
      :key="i"
      v-for="(subscription, i) in subscriptions"
      link
      nuxt
      :to="subscription.channelLink"
      dense
    >
      <v-list-item-avatar
        ><v-img :src="subscription.avatar"></v-img
      ></v-list-item-avatar>
      <v-list-item-title> {{ subscription.name }} </v-list-item-title>
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
      subscriptions: [
        {
          name: "CryptoSingh",
          avatar: "https://randomuser.me/api/portraits/men/5.jpg",
          channelLink: "/channel/Cryptosingh",
        },
        {
          name: "Dave2D",
          avatar: "https://randomuser.me/api/portraits/men/5.jpg",
          channelLink: "/channel/Dave2D",
        },
        {
          name: "Fireship",
          avatar: "https://randomuser.me/api/portraits/men/5.jpg",
          channelLink: "/channel/Fireship",
        },
        {
          name: "ElectoBOOM",
          avatar: "https://randomuser.me/api/portraits/men/5.jpg",
          channelLink: "/channel/ElectoBOOM",
        },
        {
          name: "Java Brains",
          avatar: "https://randomuser.me/api/portraits/men/5.jpg",
          channelLink: "/channel/Java Brains",
        },
        {
          name: "SomeOrdinaryGamer",
          avatar: "https://randomuser.me/api/portraits/men/5.jpg",
          channelLink: "/channel/SomeOrdinaryGamer",
        },
      ],
    };
  },
};
</script>

<style>
</style>