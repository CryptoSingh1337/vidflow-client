<template>
  <Unauthorize
    v-if="!$auth.loggedIn"
    :icon="icon"
    :heading="heading"
    :caption="caption"
  />
  <Loader v-else-if="$fetchState.pending" />
  <v-container
    class="fill-height justify-center"
    v-else-if="videos.length === 0"
  >
    <h3 class="mt-5 text-md-h5 font-weight-medium">No videos found</h3>
  </v-container>
  <v-container v-else-if="$vuetify.breakpoint.mdAndUp">
    <h3 class="text-h5 font-weight-bold mb-5">Your Videos</h3>
    <VideoList :videos="videos" />
    <div class="text-center mt-5">
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
  </v-container>
  <v-container v-else>
    <v-row no-gutters>
      <v-col cols="12" sm="6" :key="i" v-for="(video, i) in videos">
        <VideoCard :video="video" />
      </v-col>
    </v-row>
    <div class="text-center mt-5">
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
  </v-container>
</template>

<script>
import Unauthorize from "@/components/UnauthorizedUser/Unauthorize.vue";
import Loader from "@/components/Loader.vue";
import VideoList from "@/components/Video/VideoList.vue";

export default {
  head() {
    return {
      title: "Your videos - VidFlow",
    };
  },
  components: {
    Unauthorize,
    Loader,
    VideoList,
  },
  data() {
    return {
      icon: "mdi-video",
      heading: "Keep your eyes on your vidoes stats",
      caption: "Sign in to see your videos stats",
      page: 1,
      videos: [],
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    calculateRatio(likes, dislikes) {
      return ((likes / (likes + dislikes)) * 100).toFixed(2);
    },
  },
  async fetch() {
    if (this.$auth.loggedIn) {
      const response = await this.$axios.get(
        `/video/user/${this.$auth.user.id}/all?page=${this.page}`
      );
      const videos = await response.data;
      this.videos = videos;
    }
  },
};
</script>