<template>
  <Loader v-if="$fetchState.pending" />
  <div v-else>
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
          <SubscribeButton
            :channelName="channelName"
            :id="$route.params.id"
            :subscribed="subscribed"
            :same="same"
          />
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
      <v-container :class="$vuetify.breakpoint.xs ? 'pa-0' : 'px-10'" fluid>
        <v-tabs-items v-model="tab">
          <v-tab-item
            class="pa-0"
            :style="{
              'background-color': $vuetify.theme.dark ? '#121212' : '',
            }"
          >
            <client-only>
              <v-card :color="$vuetify.theme.dark ? '#121212' : ''" flat>
                <v-card-title>Popular Uploads</v-card-title>
                <v-container
                  class="fill-height justify-center"
                  v-if="videos.length === 0"
                >
                  <h3 class="mt-5 text-md-h5 font-weight-medium">
                    No videos found
                  </h3>
                </v-container>
                <v-row v-else class="ma-3" no-gutters>
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
            </client-only>
          </v-tab-item>
          <v-tab-item
            :style="{
              'background-color': $vuetify.theme.dark ? '#121212' : '',
            }"
          >
            <client-only>
              <v-card :color="$vuetify.theme.dark ? '#121212' : ''" flat>
                <v-card-title>Uploads</v-card-title>
                <v-container
                  class="fill-height justify-center"
                  v-if="videos.length === 0"
                >
                  <h3 class="mt-5 text-md-h5 font-weight-medium">
                    No videos found
                  </h3>
                </v-container>
                <v-row v-else class="ma-3" no-gutters>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    class="mx-xs-auto"
                    :key="index"
                    v-for="(video, index) in videos"
                  >
                    <VideoCard :width="'90%'" :video="video" />
                  </v-col>
                </v-row>
              </v-card>
            </client-only>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import VideoCard from "@/components/Home/VideoCard.vue";
import SubscribeButton from "@/components/SubscribeButton.vue";

export default {
  head() {
    return {
      title: "Channel - VidFlow",
    };
  },
  components: {
    Loader,
    VideoCard,
    SubscribeButton,
  },
  data() {
    return {
      subscribed: false,
      error: null,
      tabs: ["Home", "Vidoes"],
      tab: null,
      channelName: "",
      subscribers: 0,
      videos: [],
      same: false,
    };
  },
  async fetch() {
    const userId = this.$route.params.id;
    let response = await this.$axios.get(`/video/user/${userId}?page=${0}`);
    const videos = await response.data;

    response = await this.$axios.get(`/user/userId/${userId}/channel`);
    const channelName = await response.data;

    response = await this.$axios.get(
      `/user/userId/${userId}/subscribers/count`
    );
    const subscribers = await response.data;

    let subscribed = false;
    let same = false;
    if (this.$auth.loggedIn) {
      if (this.$auth.user.id !== userId) {
        try {
          response = await this.$axios.get(
            `/user/userId/${this.$auth.user.id}/subscribed/${userId}`
          );
          subscribed = (await response.status) === 200 ? true : false;
        } catch (e) {}
      } else {
        subscribed = false;
        same = true;
      }
    }
    this.same = same;
    this.subscribed = subscribed;
    this.videos = videos;
    this.channelName = channelName;
    this.subscribers = subscribers;
  },
  methods: {
    handleTabClick(item) {},
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