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
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                ></v-img
              ></v-list-item-avatar>
              <v-list-item-content class="align-self-auto">
                <v-list-item-title class="headline mb-1">{{
                  $route.params.name
                }}</v-list-item-title>
                <v-list-item-subtitle>1.06M subscribers </v-list-item-subtitle>
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
          <v-btn
            :class="['white--text', $vuetify.breakpoint.xs ? 'pa-3 ml-4' : '']"
            :x-small="$vuetify.breakpoint.xs"
            tile
            :color="subscribed ? 'grey' : 'red'"
            depressed
            v-model="subscribed"
            @click="subscribed = !subscribed"
            >{{ subscribed ? "Subscribed" : "Subscribe" }}</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <v-card flat class="transparent">
      <v-tabs v-model="tab" background-color="transparent" centered>
        <v-tab :key="i" v-for="(item, i) in tabs">{{ item }}</v-tab>
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
                <v-col cols="12" sm="6" md="4" lg="3" :key="i" v-for="i in 10">
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
              <v-card-title>Your Uploads</v-card-title>
              <v-row class="ma-3" no-gutters>
                <v-col cols="12" sm="6" md="4" lg="3" :key="i" v-for="i in 10">
                  <VideoCard :video="video" />
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

export default {
  head() {
    return {
      title: `${this.$route.params.name} - VidFlow`,
    };
  },
  components: {
    VideoCard,
  },
  data() {
    return {
      subscribed: false,
      tabs: ["Home", "Vidoes"],
      tab: null,
      loading: true,
      video: {
        id: "1234567890",
        thumbnail: "https://source.unsplash.com/1280x720/?technology",
        title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non viverra augue. Ut et dolor.",
        channelName: "CryptoSingh",
        views: 1234567,
        createdAt: new Date(),
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
};
</script>