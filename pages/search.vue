<template>
  <v-container fluid>
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
</template>

<script>
import { mapState } from "vuex";
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
  computed: {
    ...mapState(["videos"]),
  },
};
</script>