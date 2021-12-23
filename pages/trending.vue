<template>
  <v-container fluid>
    <h3>Trending</h3>
    <v-row class="ma-3 mt-1" no-gutters>
      <v-col
        :key="video.id"
        v-for="video in videos"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="mx-xs-auto"
      >
        <VideoCard :video="video" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoCard from "@/components/Home/VideoCard.vue";
import data from "@/assets/data/videos.js";

export default {
  head() {
    return {
      title: "Trending - VidFlow",
    };
  },
  components: {
    VideoCard,
  },
  data() {
    return {
      videos: data,
    };
  },
};
</script>