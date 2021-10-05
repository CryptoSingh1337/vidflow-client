<template>
  <v-container fluid>
    <v-row v-if="loading" class="ma-3" no-gutters>
      <v-col
        :key="i"
        v-for="i in 12"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="mx-xs-auto"
      >
        <v-skeleton-loader
          class="mx-auto my-3 px-2 rounded-0"
          :min-width="$vuetify.breakpoint.xs ? 312 : 350"
          :max-width="$vuetify.breakpoint.xs ? 312 : 350"
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
