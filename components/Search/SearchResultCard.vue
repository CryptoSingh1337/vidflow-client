<template>
  <SearchCardResultXS v-if="$vuetify.breakpoint.xs" :video="video" />
  <NuxtLink v-else :to="`/watch/${video.id}`">
    <v-list-item :ripple="false" class="px-0 px-sm-5">
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
          <span class="d-flex caption grey--text"
            >{{ video.views | formatViews }} views •
            {{ $moment(video.createdAt).format("D, MMM YYYY") }}</span
          >
          <NuxtLink :to="`/channel/${video.userId}`">
            <div class="d-flex my-2" no-gutters>
              <span>
                <v-avatar size="30">
                  <img
                    :src="`https://avatars.dicebear.com/api/bottts/${video.channelName}.svg`"
                  />
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
          {{ `${video.description.substring(0, 250)}...` }}
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
  filters: {
    formatViews: function (views) {
      if (views < 999) return views;
      else if (views >= 1000 && views < 1000000)
        return (views / 1000).toFixed(2) + "K";
      else if (views >= 1000000 && views < 1000000000)
        return (views / 1000000).toFixed(2) + "M";
      else return (views / 1000000000).toFixed(2) + "B";
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>