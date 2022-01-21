<template>
  <v-data-table
    class=""
    :headers="headers"
    :items="videos"
    hide-default-footer
    calculate-widths
  >
    <template v-slot:item.video="{ item }">
      <NuxtLink
        :to="`/watch/${item.id}`"
        class="d-flex py-2 text-decoration-none"
      >
        <client-only>
          <v-img :src="item.thumbnail" max-width="150" max-height="85"></v-img>
        </client-only>
        <div>
          <div
            :class="[
              'caption font-weight-bold ml-2 mb-1',
              $vuetify.theme.dark ? 'white--text' : 'black--text',
            ]"
          >
            {{ item.title | minify }}
          </div>
          <div class="caption ml-2 grey--text">
            {{ item.description | minifyDescription }}
          </div>
        </div>
      </NuxtLink>
    </template>
    <template v-slot:item.visibility="{ item }">
      <v-icon
        class="mr-2"
        :color="item.videoStatus === 'PUBLIC' ? 'green' : 'grey'"
        >mdi-eye</v-icon
      >
      {{ item.videoStatus | capitalize }}
    </template>
    <template v-slot:item.createdAt="{ item }">
      {{ $moment(item.createdAt).format("D, MMM YYYY") }}
    </template>
    <template v-slot:item.views="{ item }">
      {{ item.views | numberfy }}
    </template>
    <template v-slot:item.ratio="{ item }">
      <div>
        {{ `${calculateRatio(item.likes, item.dislikes)}%` }}
      </div>
      <div>{{ item.likes | numberfy }} likes</div>
      <v-progress-linear
        v-if="calculateRatio(item.likes, item.dislikes) > 0"
        color="grey"
        :value="calculateRatio(item.likes, item.dislikes)"
        rounded
      ></v-progress-linear>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    videos: Array,
  },
  methods: {
    calculateRatio(likes, dislikes) {
      if (likes === 0) return 0;
      return ((likes / (likes + dislikes)) * 100).toFixed(2);
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "Video",
          align: "start",
          sortable: false,
          value: "video",
          width: this.$vuetify.breakpoint.smAndDown ? "450px" : "600px",
        },
        {
          text: "Visibility",
          align: "center",
          sortable: false,
          value: "visibility",
        },
        {
          text: "Date",
          align: "start",
          sortable: false,
          value: "createdAt",
        },
        {
          text: "Views",
          align: "start",
          sortable: false,
          value: "views",
        },
        {
          text: "Likes (vs. dislikes)",
          align: "center",
          width: "200px",
          sortable: false,
          value: "ratio",
        },
      ];
    },
  },
  filters: {
    minify: (text) => {
      if (text.length < 85) return text;
      return `${text.substring(0, 85)}...`;
    },
    minifyDescription: (text) => {
      if (text.length < 160) return text;
      return `${text.substring(0, 160)}...`;
    },
    capitalize: (text) => {
      return `${text.substring(0, 1)}${text.substring(1).toLowerCase()}`;
    },
    numberfy: (views) => views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  },
};
</script>

<style>
</style>