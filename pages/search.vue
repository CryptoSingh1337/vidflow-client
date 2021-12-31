<template>
  <v-container fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" md="10" lg="8">
        <client-only>
          <SearchResultCard
            :key="i"
            v-for="(video, i) in videos"
            :video="video"
          />
        </client-only>
      </v-col>
    </v-row>
  </v-container>
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
      videos: null,
    };
  },
  async fetch() {
    const res = await this.$axios.get(
      `/video/search?q=${this.$route.query.q}&page=${0}`
    );
    this.videos = await res.data;
  },
};
</script>