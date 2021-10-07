<template>
  <v-container fluid>
    <v-row v-if="loading" class="ma-3" no-gutters>
      <v-col
        :key="i"
        v-for="i in $vuetify.breakpoint.xl
          ? 18
          : $vuetify.breakpoint.smAndDown
          ? 6
          : 12"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
        class="mx-xs-auto"
      >
        <v-skeleton-loader
          class="pa-2 rounded-0"
          min-width="100%"
          type="image, list-item-avatar-three-line"
          :loading="loading"
        >
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else class="ma-3" no-gutters>
      <v-col
        :key="video.id"
        v-for="video in videos"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
        class="mx-xs-auto"
      >
        <VideoCard :video="video" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import data from "@/assets/data/videos";
import VideoCard from "@/components/Home/VideoCard.vue";

export default {
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
<style>
.v-skeleton-loader__list-item-avatar-three-line {
  padding: 0 !important;
}
</style>