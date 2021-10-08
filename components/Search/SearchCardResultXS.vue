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
        <v-list-item :to="video.channelLink" class="pa-0" nuxt>
          <v-list-item-avatar width="40" height="40"
            ><v-img src="https://randomuser.me/api/portraits/men/4.jpg"></v-img
          ></v-list-item-avatar>
        </v-list-item>
      </v-col>
      <v-col class="d-flex align-center flex-row">
        <v-card-subtitle class="pa-0 grey--text">
          <div class="font-weight-bold">{{ video.channelName }}</div>
          <span>{{ video.views }} • {{ video.time }}</span>
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
};
</script>