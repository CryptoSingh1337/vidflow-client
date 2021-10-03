<template>
  <div>
    <div class="d-flex justify-center black">
      <video
        id="video"
        class="my-10"
        src="@/assets/INTRO.mp4"
        poster="https://source.unsplash.com/1920x1080/?technology"
        controls
        :width="
          this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
            ? '100%'
            : '60%'
        "
        :height="
          this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
            ? '100%'
            : '50%'
        "
      ></video>
    </div>
    <v-row no-gutters>
      <v-col class="pa-5" cols="12" sm="12" md="6" lg="8">
        <VideoFooter :video="video" />
        <Comments />
        <v-btn
          class="mt-4 hidden-md-and-up"
          color="primary"
          block
          outlined
          @click="handleClick"
          >SHOW MORE</v-btn
        >
      </v-col>
      <v-col class="pa-5" cols="12" sm="12" md="6" lg="4">
        <SideBarCard :data="videos" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Comments from "@/components/WatchVideo/Comments.vue";
import SideBarCard from "@/components/WatchVideo/SideBarCard.vue";
import VideoFooter from "@/components/WatchVideo/VideoFooter.vue";

export default {
  name: "Id",
  components: {
    Comments,
    SideBarCard,
    VideoFooter
  },
  computed: {
    ...mapState(["videos"]),
    video() {
      return this.$store.getters.getVideoById(this.$route.params.id);
    }
  },
  methods: {
    handleClick() {
      console.log("Show more");
    }
  }
};
</script>

<style scoped>
video {
  aspect-ratio: 16/9;
}
</style>
