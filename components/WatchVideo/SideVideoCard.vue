<template>
  <NuxtLink :to="'/watch/' + video.id">
    <v-list-item link class="px-0 px-sm-5">
      <v-list-item-avatar
        tile
        :width="$vuetify.breakpoint.xs ? '100' : '168'"
        :height="$vuetify.breakpoint.xs ? '56.25' : '94'"
        ><v-img
          aspect-ratio="16/9"
          :src="video.thumbnail"
          alt="thumbnail"
        ></v-img
      ></v-list-item-avatar>
      <v-list-item-content>
        <div class="body-2">
          {{
            ($vuetify.breakpoint.xs
              ? video.title.substring(0, 60)
              : video.title.substring(0, 100)) + "..."
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
  </NuxtLink>
</template>

<script>
export default {
  name: "SideVideoCard",
  props: {
    video: Object
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
