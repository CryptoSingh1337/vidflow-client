<template>
  <Unauthorize
    v-if="!$auth.loggedIn"
    :icon="icon"
    :heading="heading"
    :caption="caption"
  />
  <v-container v-else-if="$auth.loggedIn && liked.length > 0" fluid>
    <h3 class="text-h5 font-weight-bold mb-5">Liked videos</h3>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" md="10" lg="8">
        <client-only>
          <SearchResultCard
            :key="i"
            v-for="(video, i) in liked"
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
      No liked video in this playlist
    </div>
  </v-container>
</template>

<script>
import Unauthorize from "@/components/UnauthorizedUser/Unauthorize.vue";

export default {
  head() {
    return {
      title: "Liked vidoes - VidFlow",
    };
  },
  components: {
    Unauthorize,
  },
  data() {
    return {
      icon: "mdi-thumb-up",
      heading: "Enjoy your favorite videos",
      caption: "Sign in to access videos that you’ve liked",
      liked: [],
    };
  },
  async asyncData({ $auth, $axios }) {
    let liked = [];
    if ($auth.loggedIn) {
      const response = await $axios.get(
        `/user/userId/${$auth.user.id}/liked?page=${0}`
      );
      liked = await response.data;
    }
    return { liked };
  },
};
</script>