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
        <v-skeleton-loader
          class="my-3 px-2 rounded-0"
          max-width="350"
          type="image, list-item-avatar-three-line"
          :loading="loading"
        >
          <VideoCard :video="video" />
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import data from "~/assets/data/videos";
import VideoCard from "@/components/Home/VideoCard.vue";

export default {
  name: "Home",
  components: {
    VideoCard,
  },
  data() {
    return {
      videos: data,
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
};
</script>
