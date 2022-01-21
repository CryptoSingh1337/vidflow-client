<template>
  <v-card
    class="ma-2 rounded-0"
    :color="$vuetify.theme.dark ? '#121212' : ''"
    :to="`/watch/${video.id}`"
    flat
    nuxt
    :ripple="false"
  >
    <v-img
      :src="video.thumbnail"
      alt="thumbnail"
      :aspect-ratio="16 / 9"
    ></v-img>
    <div
      class="my-4 subtitle-1 font-weight-bold"
      v-text="`${video.title.substring(0, 60)}...`"
      style="line-height: normal"
    ></div>
    <v-divider></v-divider>
    <v-card-title>Statistics</v-card-title>
    <v-card-text>
      <div class="d-flex justify-space-between">
        <span>Visibility</span>
        <span
          ><v-icon
            class="mr-2"
            :color="video.videoStatus === 'PUBLIC' ? 'green' : 'grey'"
            >mdi-eye</v-icon
          >
          {{ video.videoStatus | capitalize }}</span
        >
      </div>
      <div class="d-flex justify-space-between">
        <span>Date</span>
        <span>{{ $moment(video.createdAt).format("D, MMM YYYY") }}</span>
      </div>
      <div class="d-flex justify-space-between">
        <span>Views</span>
        <span>{{ video.views | numberfy }}</span>
      </div>
      <div class="d-flex justify-space-between mt-2">
        <span>Likes (vs. Dislikes)</span>
        <span>
          <div style="text-align: end">
            {{ `${calculateRatio(video.likes, video.dislikes)}%` }}
          </div>
          <div>{{ video.likes | numberfy }} likes</div>
          <v-progress-linear
            class="my-2"
            color="grey"
            :value="calculateRatio(video.likes, video.dislikes)"
            rounded
          ></v-progress-linear>
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    video: Object,
  },
  methods: {
    calculateRatio(likes, dislikes) {
      if (likes === 0) return 0;
      return ((likes / (likes + dislikes)) * 100).toFixed(2);
    },
  },
  filters: {
    capitalize: (text) => {
      return `${text.substring(0, 1)}${text.substring(1).toLowerCase()}`;
    },
    numberfy: (views) => views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  },
};
</script>