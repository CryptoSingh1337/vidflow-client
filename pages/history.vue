<template>
  <Unauthorize
    v-if="!$auth.loggedIn"
    :icon="icon"
    :heading="heading"
    :caption="caption"
  />
  <v-container v-else-if="$auth.loggedIn && history.length > 0" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" md="10" lg="8">
        <client-only>
          <SearchResultCard
            :key="i"
            v-for="(video, i) in history"
            :video="video"
          />
        </client-only>
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
      >mdi-information</v-icon
    >
    <div class="mx-auto text-h3 text-center font-weight-bold">
      Your watch history is empty!
    </div>
  </v-container>
</template>

<script>
import Unauthorize from "@/components/UnauthorizedUser/Unauthorize.vue";
import SearchResultCard from "@/components/Search/SearchResultCard.vue";

export default {
  head() {
    return {
      title: "History - VidFlow",
    };
  },
  components: {
    Unauthorize,
    SearchResultCard,
  },
  data() {
    return {
      icon: "mdi-history",
      heading: "Keep track of what you watch",
      caption: "Watch history isn't viewable when signed out.",
      history: [],
    };
  },
  async asyncData({ $auth, $axios }) {
    let history = [];
    if ($auth.loggedIn) {
      const response = await $axios.get(
        `/user/userId/${$auth.user.id}/watch/history?page=${0}`
      );
      history = await response.data;
    }
    return { history };
  },
};
</script>