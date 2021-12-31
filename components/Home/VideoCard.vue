<template>
  <v-card
    class="ma-2 rounded-0"
    :color="$vuetify.theme.dark ? '#121212' : ''"
    max-width="100%"
    :to="`/watch/${video.id}`"
    flat
    :ripple="false"
    nuxt
  >
    <v-img
      :src="video.thumbnail"
      alt="thumbnail"
      :aspect-ratio="16 / 9"
    ></v-img>
    <div
      class="pa-0 pt-2 subtitle-1 font-weight-bold"
      v-text="truncateText(video.title)"
      style="line-height: normal"
    ></div>
    <v-row no-gutters>
      <NuxtLink :to="`/channel/${video.channelName}`" class="pa-0 channel-link">
        <v-list-item-avatar width="40" height="40"
          ><v-img
            :src="`https://avatars.dicebear.com/api/bottts/${video.channelName}.svg`"
          ></v-img
        ></v-list-item-avatar>
      </NuxtLink>
      <v-col class="d-flex align-center flex-row">
        <v-card-subtitle class="pa-0 grey--text">
          <div class="font-weight-bold">{{ video.channelName }}</div>
          <span
            >{{ video.views | formatViews }} views •
            {{ $moment(video.createdAt).fromNow() }}</span
          >
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "VideoCard",
  props: {
    video: Object,
  },
  methods: {
    truncateText(title) {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "md":
        case "lg":
        case "xl": {
          if (this.isGreaterThanSize(title, 80))
            return title.substring(0, 65) + "...";
          return title;
        }
        case "sm": {
          if (this.isGreaterThanSize(title, 90))
            return title.substring(0, 90) + "...";
          return title;
        }
      }
    },
    isGreaterThanSize(title, size) {
      return title.length > size;
    },
  },
  filters: {
    formatViews: function (views) {
      if (views < 999) return views;
      else if (views >= 1000 && views < 1000000)
        return (views / 1000).toFixed(2) + "K";
      else if (views >= 1000000 && views < 1000000000)
        return (views / 1000000).toFixed(2) + "M";
      else return (views / 1000000000).toFixed(2) + "B";
    },
  },
};
</script>

<style scoped>
.channel-link:hover {
  cursor: pointer;
}
</style>