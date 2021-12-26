<template>
  <v-container fluid>
    <v-row v-if="$fetchState.pending" class="ma-3" no-gutters>
      <v-col
        :key="i"
        v-for="i in 8"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="mx-xs-auto"
      >
        <v-skeleton-loader
          class="pa-2 rounded-0"
          min-width="100%"
          type="image, list-item-avatar-three-line"
          :loading="true"
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
        class="mx-xs-auto"
      >
        <client-only>
          <VideoCard :video="video" />
        </client-only>
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
  async fetch() {
    const response = await this.$axios.get("/video?page=0");
    this.videos = response.data;
  },
};
</script>
<style>
.v-skeleton-loader__list-item-avatar-three-line {
  padding: 0 !important;
}
</style>