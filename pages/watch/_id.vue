<template>
  <div>
    <div v-if="$fetch.pending"></div>
    <div v-else class="d-flex justify-center black">
      <video
        id="video"
        class="my-10"
        src="@/assets/video.mp4"
        :poster="video.thumbnail"
        controls
        :width="$vuetify.breakpoint.smAndDown ? '100%' : '60%'"
        :height="$vuetify.breakpoint.smAndDown ? '100%' : '50%'"
      ></video>
    </div>
    <v-row class="px-lg-5" no-gutters>
      <v-col class="px-5 pt-5 pa-sm-5" cols="12" sm="12" md="7" lg="8">
        <VideoFooter v-if="initialized" :video="video" />
        <v-divider></v-divider>
        <Comments v-if="initialized" :comments="video.comments" />
        <v-btn
          class="mt-4 hidden-md-and-up"
          color="primary"
          block
          outlined
          @click="handleClick"
          >SHOW MORE</v-btn
        >
      </v-col>
      <v-col class="px-5 py-3 py-sm-0 py-md-5" cols="12" sm="12" md="5" lg="4">
        <SideBarCard :data="sideBarVideos" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Comments from "@/components/WatchVideo/Comments.vue";
import SideBarCard from "@/components/WatchVideo/SideBarCard.vue";
import VideoFooter from "@/components/WatchVideo/VideoFooter.vue";

export default {
  head() {
    return {
      title: "Watch - VidFlow",
    };
  },
  components: {
    Comments,
    SideBarCard,
    VideoFooter,
  },
  data() {
    return {
      video: {},
      sideBarVideos: [],
      sideVideoPage: 0,
      initialized: false,
    };
  },
  async fetch() {
    const response = await this.$axios.get(`/video/${this.$route.params.id}`);
    this.video = response.data;
    const sideVideos = await this.$axios.get(`/video/trending?page=0`);
    this.sideBarVideos = sideVideos.data;
    this.initialized = true;
  },
  methods: {
    handleClick() {
      console.log("Show more");
    },
  },
};
</script>

<style scoped>
video {
  aspect-ratio: 16/9;
}
</style>
