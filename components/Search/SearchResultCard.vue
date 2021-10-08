<template>
  <NuxtLink :to="'/watch/' + video.id">
    <SearchCardResultXS v-if="$vuetify.breakpoint.xs" :video="video" />
    <v-list-item inactive v-else link class="px-0 px-sm-5">
      <v-list-item-avatar tile width="360" height="200"
        ><v-img
          aspect-ratio="16/9"
          :src="video.thumbnail"
          alt="thumbnail"
        ></v-img
      ></v-list-item-avatar>
      <v-list-item-content class="align-self-start">
        <div class="body-1">
          {{ video.title }}
        </div>
        <div>
          <span class="caption grey--text"
            >{{ video.time }} • {{ video.views }} views</span
          >
          <NuxtLink :to="video.channelLink">
            <div class="d-flex my-2" no-gutters>
              <span>
                <v-avatar size="30">
                  <img src="https://randomuser.me/api/portraits/men/3.jpg" />
                </v-avatar>
              </span>
              <span class="d-flex align-center">
                <div class="caption grey--text ml-2">
                  {{ video.channelName }}
                </div>
              </span>
            </div>
          </NuxtLink>
        </div>
        <div class="caption grey--text">
          {{ `${video.description.substring(0, 80)}...` }}
        </div>
      </v-list-item-content>
    </v-list-item>
  </NuxtLink>
</template>

<script>
import SearchCardResultXS from "@/components/Search/SearchCardResultXS.vue";

export default {
  name: "SearchResultCard",
  props: {
    video: Object,
  },
  components: {
    SearchCardResultXS,
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>