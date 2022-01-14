<template>
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
        <VideoCard :width="'90%'" :video="video" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoCard from "@/components/Home/VideoCard.vue";

export default {
  components: {
    VideoCard,
  },
  data() {
    return {
      videos: [],
    };
  },
  async asyncData({ $axios }) {
    const response = await $axios.get("/video?page=0");
    const videos = await response.data;
    return { videos };
  },
};
</script>
<style>
.v-skeleton-loader__list-item-avatar-three-line {
  padding: 0 !important;
}
</style>