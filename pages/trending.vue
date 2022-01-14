<template>
  <v-container fluid>
    <h3>Trending</h3>
    <v-container fluid>
      <v-row class="ma-3" no-gutters>
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
  </v-container>
</template>

<script>
import VideoCard from "@/components/Home/VideoCard.vue";

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
      videos: [],
    };
  },
  async asyncData({ $axios }) {
    const response = await $axios.get("/video/trending?page=0");
    const videos = response.data;
    return { videos };
  },
};
</script>