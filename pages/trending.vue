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
      <v-card v-intersect.quiet="infiniteScroll"></v-card>
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
      page: 1,
    };
  },
  methods: {
    infiniteScroll(entries, observer, isIntersecting) {
      setTimeout(() => {
        this.$axios.get(`/video/trending?page=${this.page}`)
        .then(response => response.data)
        .then(video => {
          if (video.length > 0) {
            this.videos.push(...video)
            this.page += 1;
          }
        })
        .catch(e => console.log(e));
      }, 500);
    }
  },
  async asyncData({ $axios }) {
    const response = await $axios.get("/video/trending?page=0");
    const videos = response.data;
    return { videos };
  },
};
</script>