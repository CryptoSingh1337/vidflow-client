<template>
  <div>
    <v-parallax
      src="https://picsum.photos/1546/423?random"
      height="230"
    ></v-parallax>
    <v-container class="py-0">
      <v-row class="justify-space-between" no-gutters>
        <v-col cols="12" sm="5" md="5" lg="3" offset-md="1"
          ><v-card class="transparent" flat>
            <v-list-item three-line>
              <v-list-item-avatar size="80"
                ><v-img
                  :src="`https://avatars.dicebear.com/api/bottts/${channelName}.svg`"
                ></v-img
              ></v-list-item-avatar>
              <v-list-item-content class="align-self-auto">
                <v-list-item-title class="text-h5 font-weight-bold mb-1">{{
                  channelName
                }}</v-list-item-title>
                <v-list-item-subtitle
                  >{{ subscribers | numberfy }} subscribers
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card></v-col
        ><v-col
          class="d-flex align-center"
          cols="12"
          sm="4"
          md="4"
          lg="3"
          offset-sm="0"
        >
          <SubscribeButton :channelName="channelName" :id="$route.params.id" />
        </v-col>
      </v-row>
    </v-container>
    <v-card flat class="transparent">
      <v-tabs v-model="tab" background-color="transparent" centered>
        <v-tab
          :ripple="false"
          :key="i"
          v-for="(item, i) in tabs"
          @click.prevent="handleTabClick(item)"
          >{{ item }}</v-tab
        >
      </v-tabs>
      <v-container :class="[$vuetify.breakpoint.xs ? 'pa-0' : 'px-10']" fluid>
        <v-tabs-items v-model="tab">
          <v-tab-item
            class="pa-0"
            :style="{
              'background-color': $vuetify.theme.dark ? '#121212' : '',
            }"
          >
            <v-card :color="$vuetify.theme.dark ? '#121212' : ''" flat>
              <v-card-title>Popular Uploads</v-card-title>
              <v-row class="ma-3" no-gutters>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                  :key="index"
                  v-for="(video, index) in videos"
                >
                  <VideoCard :width="'90%'" :video="video" />
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
          <v-tab-item
            :style="{
              'background-color': $vuetify.theme.dark ? '#121212' : '',
            }"
          >
            <v-card :color="$vuetify.theme.dark ? '#121212' : ''" flat>
              <v-card-title>Uploads</v-card-title>
              <v-row class="ma-3" no-gutters>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                  :key="index"
                  v-for="(video, index) in videos"
                >
                  <VideoCard :width="'90%'" :video="video" />
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import VideoCard from "@/components/Home/VideoCard.vue";
import SubscribeButton from "@/components/SubscribeButton.vue";

export default {
  head() {
    return {
      title: "Channel - VidFlow",
    };
  },
  components: {
    VideoCard,
    SubscribeButton,
  },
  data() {
    return {
      subscribed: false,
      error: null,
      tabs: ["Home", "Vidoes"],
      tab: null,
      loading: true,
      channelName: "",
      subscribers: 0,
      videos: [],
    };
  },
  async fetch() {
    try {
      const res = await this.$axios.get(
        `/video/user/${this.$route.params.id}?page=${0}`
      );
      this.videos = await res.data;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    handleTabClick(item) {},
  },
  created() {
    this.$axios
      .get(`/user/userId/${this.$route.params.id}/channel`)
      .then((res) => res.data)
      .then((data) => {
        this.channelName = data;
        return data;
      })
      .then(() => {
        this.$axios
          .get(`/user/userId/${this.$route.params.id}/subscribers/count`)
          .then((res) => res.data)
          .then((data) => (this.subscribers = data))
          .catch((e) => console.log(e));
      })
      .catch((e) => {
        console.log(e);
      });
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
  filters: {
    numberfy: function (number) {
      if (number < 999) return number;
      else if (number >= 1000 && number < 1000000)
        return Math.floor(number / 1000) + "K";
      else if (number >= 1000000 && number < 1000000000)
        return Math.floor(number / 1000000) + "M";
      else return Math.floor(number / 1000000000) + "B";
    },
  },
};
</script>