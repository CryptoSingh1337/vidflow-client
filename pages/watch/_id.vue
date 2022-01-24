<template>
  <Loader v-if="$fetchState.pending" />
  <div v-else>
    <div class="d-flex justify-center black">
      <video
        id="video"
        class="my-10"
        :src="video.videoUrl"
        :poster="video.thumbnail"
        controls
        :width="$vuetify.breakpoint.smAndDown ? '100%' : '60%'"
        :height="$vuetify.breakpoint.smAndDown ? '100%' : '50%'"
      ></video>
    </div>
    <v-row class="px-lg-5" no-gutters>
      <v-col class="px-5 pt-5 pa-sm-5" cols="12" sm="12" md="7" lg="8">
        <VideoFooter
          :same="same"
          :subscribers="subscribers"
          :subscribed="subscribed"
          :video="video"
          :liked="liked"
          :disliked="disliked"
        />
        <v-divider></v-divider>
        <Comments :comments="video.comments" />
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
        <SideBarCard :videoId="$route.params.id" :data="sideBarVideos" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
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
    Loader,
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
      same: false,
      subscribed: false,
      subscribers: 0,
      liked: false,
      disliked: false,
    };
  },
  async fetch() {
    const videoId = this.$route.params.id;
    let response = await this.$axios.get(`/video/${videoId}`);
    const video = await response.data;

    response = await this.$axios.get(`/video/trending?page=${0}`);
    const sideBarVideos = await response.data;

    const userId = video.userId;

    response = await this.$axios.get(
      `/user/userId/${userId}/subscribers/count`
    );
    const subscribers = await response.data;

    let subscribed = false;
    let same = false;
    let liked = false;
    if (this.$auth.loggedIn) {
      if (this.$auth.user.id !== userId) {
        try {
          response = await this.$axios.get(
            `/user/userId/${this.$auth.user.id}/subscribed/${userId}`
          );
          subscribed = (await response.status) === 200 ? true : false;
        } catch (e) {}
      } else {
        subscribed = false;
        same = true;
      }
      try {
        response = await this.$axios.get(
          `/user/userId/${this.$auth.user.id}/video/${videoId}/liked`
        );
        liked = (await response.status) === 200 ? true : false;
      } catch (e) {}
    }
    this.video = video;
    this.sideBarVideos = sideBarVideos;
    this.subscribers = subscribers;
    this.subscribed = subscribed;
    this.same = same;
    this.liked = liked;
    // return { subscribers, video, sideBarVideos, subscribed, same };
  },
  fetchDelay: 500,
  methods: {
    handleClick() {
      console.log("Show more");
    },
  },
  mounted() {
    this.$axios.get(`/video/views/${this.$route.params.id}`);
    if (this.$auth.loggedIn)
      this.$axios.post(
        `/user/userId/${this.$auth.user.id}/video/${this.$route.params.id}`
      );
  },
};
</script>

<style scoped>
video {
  aspect-ratio: 16/9;
}
</style>
