<template>
  <v-card
    class="ma-2 rounded-0"
    :color="$vuetify.theme.dark ? '#121212' : ''"
    max-width="100%"
    :to="`/watch/${video.id}`"
    flat
    nuxt
  >
    <v-img
      :src="video.thumbnail"
      alt="thumbnail"
      :aspect-ratio="16 / 9"
    ></v-img>
    <div
      class="pa-0 pt-2 subtitle-1 font-weight-bold"
      v-text="`${video.title.substring(0, 60)}...`"
      style="line-height: normal"
    ></div>
    <v-row no-gutters>
      <v-col cols="2" class="mr-2">
        <v-list-item :to="`/channel/${video.channelName}`" class="pa-0" nuxt>
          <v-list-item-avatar width="40" height="40"
            ><v-img
              :src="`https://avatars.dicebear.com/api/bottts/${video.channelName}.svg`"
            ></v-img
          ></v-list-item-avatar>
        </v-list-item>
      </v-col>
      <v-col class="d-flex align-center flex-row">
        <v-card-subtitle class="pa-0 grey--text">
          <div class="font-weight-bold">{{ video.channelName }}</div>
          <span class="d-flex"
            >{{ video.views | formatViews }} views •
            {{ $moment(video.createdAt).format("D, MMM YYYY") }}</span
          >
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "SearchCardResultXS",
  props: {
    video: Object,
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