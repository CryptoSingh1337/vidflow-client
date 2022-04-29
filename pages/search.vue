<template>
  <div>
    <v-container v-if="videos.length > 0" fluid>
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="12" md="10" lg="8">
          <SearchResultCard
            :key="i"
            v-for="(video, i) in videos"
            :video="video"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container
      v-else
      class="d-flex mt-16 pt-16 align-center justify-center flex-column"
    >
      <v-icon
        class="mb-5"
        :color="$vuetify.theme.dark ? '' : '#000000'"
        :size="90"
        >mdi-close-circle</v-icon
      >
      <div class="mx-auto text-h4 text-center font-weight-bold">
        No video found with title: {{ this.$route.query.q }}
      </div>
    </v-container>
    <v-card v-intersect.quiet="infiniteScroll"></v-card>
  </div>
</template>

<script>
import SearchResultCard from "@/components/Search/SearchResultCard.vue";

export default {
  head() {
    return {
      title: "Search - VidFlow",
    };
  },
  components: {
    SearchResultCard,
  },
  data() {
    return {
      videos: [],
      page: 1
    };
  },
  methods: {
    fetchVideos() {
      this.page = 1;
      this.$axios
        .get(`/video/search?q=${this.$route.query.q}&page=0`)
        .then((res) => res.data)
        .then((data) => (this.videos = data))
        .catch((e) => console.log(e));
    },
    infiniteScroll(entries, observer, isIntersecting) {
      setTimeout(() => {
        this.$axios.get(`/video/search?q=${this.$route.query.q}&page=${this.page}`)
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
  created() {
    this.fetchVideos();
  },
  watch: {
    $route() {
      this.fetchVideos();
    },
  },
};
</script>