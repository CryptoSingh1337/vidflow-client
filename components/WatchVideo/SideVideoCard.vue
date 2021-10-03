<template>
  <router-link :to="'/watch/' + video.id">
    <v-list-item link>
      <v-list-item-avatar tile width="168" height="94"
        ><v-img
          aspect-ratio="16/9"
          :src="video.thumbnail"
          alt="thumbnail"
        ></v-img
      ></v-list-item-avatar>
      <v-list-item-content>
        <div class="body-2">
          {{
            (this.$vuetify.breakpoint.sm
              ? video.title.substring(0, 100)
              : video.title.substring(0, 60)) + "..."
          }}
        </div>
        <div>
          <div class="font-weight-bold caption">{{ video.channelName }}</div>
          <span class="caption"
            >{{ video.time }} • {{ video.views }} views</span
          >
        </div>
      </v-list-item-content>
    </v-list-item>
  </router-link>
</template>

<script>
export default {
  name: "SideVideoCard",
  props: {
    video: Object,
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
