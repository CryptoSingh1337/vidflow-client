<template>
  <div class="text-h6 font-weight-bold d-block" style="line-height: 1.35">
    {{ video.title }}
    <v-row no-gutters class="align-center subtitle-2 grey--text">
      <v-col cols="12" sm="4" class="my-3">
        <span class="align-self-center"
          >{{ video.views | numberfy }} views •
          {{ $moment(video.createdAt).format("D, MMM YYYY") }}</span
        >
      </v-col>
      <v-col cols="12" sm="8" class="d-flex justify-sm-end">
        <span class="d-flex">
          <v-btn-toggle class="mb-0" borderless dense>
            <v-btn
              class="mx-1"
              plain
              :disabled="!$auth.loggedIn"
              v-model="like"
              @click.prevent="handleLike"
              ><v-icon class="pr-1">{{
                like ? "mdi-thumb-up" : "mdi-thumb-up-outline"
              }}</v-icon
              >{{ likes | formatLikes }}</v-btn
            >
            <v-btn class="mx-1" plain :disabled="true" v-model="dislike"
              ><v-icon class="pr-1">{{
                disliked ? "mdi-thumb-down" : "mdi-thumb-down-outline"
              }}</v-icon
              >{{ video.dislikes | formatLikes }}</v-btn
            >
          </v-btn-toggle>
          <v-btn class="mx-1 px-0" plain @click="copy"
            ><v-icon>mdi-share-outline</v-icon>SHARE</v-btn
          >
        </span>
      </v-col>
    </v-row>
    <v-divider class="my-2"></v-divider>
    <v-row class="justify-space-between" no-gutters>
      <v-col cols="8" sm="6" md="5" lg="5">
        <v-card class="transparent" flat>
          <v-list-item three-line class="pa-0">
            <NuxtLink
              class="'pa-0 channel-link"
              :to="`/channel/${video.userId}`"
            >
              <v-list-item-avatar size="50"
                ><v-img
                  :src="`https://avatars.dicebear.com/api/bottts/${video.channelName}.svg`"
                ></v-img></v-list-item-avatar
            ></NuxtLink>
            <v-list-item-content class="align-self-auto">
              <NuxtLink
                :class="[
                  'channel-link text-decoration-none',
                  $vuetify.theme.dark ? 'white--text' : 'black--text',
                ]"
                :to="`/channel/${video.userId}`"
              >
                <v-list-item-title class="font-weight-medium mb-1">{{
                  video.channelName
                }}</v-list-item-title>
              </NuxtLink>
              <v-list-item-subtitle
                >{{
                  subscribers | formatLikes
                }}
                subscribers</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        cols="4"
        sm="6"
        md="4"
        lg="4"
        class="d-flex align-center justify-end"
      >
        <SubscribeButton
          :same="same"
          :subscribed="subscribed"
          :channelName="video.channelName"
          :id="video.userId"
        />
      </v-col>
      <v-col cols="12" md="12">
        <div class="subtitle-1" style="line-height: 1.2">
          {{ truncate ? truncateText(video.description) : video.description }}
        </div>
        <div class="btn caption my-2 font-weight-bold" @click="show">
          {{ showText }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SubscribeButton from "@/components/SubscribeButton.vue";

export default {
  name: "VideoFooter",
  components: {
    SubscribeButton,
  },
  props: {
    video: Object,
    same: Boolean,
    subscribed: Boolean,
    subscribers: Number,
    liked: Boolean,
    disliked: Boolean,
  },
  data() {
    return {
      like: this.liked,
      dislike: this.disliked,
      likes: this.video.likes,
      truncate: true,
      showText: "Show More",
    };
  },
  methods: {
    truncateText(description) {
      return description.substring(0, this.$vuetify.breakpoint.xs ? 150 : 300);
    },
    show() {
      if (this.showText === "Show More") {
        this.truncate = false;
        this.showText = "Show Less";
      } else if (this.showText === "Show Less") {
        this.truncate = true;
        this.showText = "Show More";
      }
    },
    copy() {
      navigator.clipboard.writeText(document.URL);
      this.$store.commit("showAlert", {
        alertType: "info",
        alertIcon: "mdi-information-outline",
        alertText: "Copied to clipboard",
      });
      setTimeout(() => {
        this.$store.commit("toggleAlert");
      }, 2000);
    },
    handleLike() {
      this.like = !this.like;
      if (this.$auth.loggedIn) {
        this.$axios.post(
          `/user/userId/${this.$auth.user.id}/video/like/${this.video.id}?isLiked=${this.like}`
        );
        if (this.like) this.likes += 1;
        else if (!this.like && this.likes > 0) this.likes -= 1;
      }
    },
  },
  created() {
    this.$axios
      .get(`/user/userId/${this.$auth.user.id}/video/${this.video.id}/liked`)
      .then((response) => response.status)
      .then((status) => (this.like = status === 200 ? true : false))
      .catch((e) => {});
  },
  filters: {
    numberfy: (views) => views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    formatLikes: (likes) => {
      if (likes < 999) return likes;
      else if (likes >= 1000 && likes < 1000000)
        return Math.floor(likes / 1000) + "K";
      else if (likes >= 1000000 && likes < 1000000000)
        return Math.floor(likes / 1000000) + "M";
    },
  },
};
</script>
<style scoped>
.btn:hover {
  cursor: pointer;
}
.v-btn-toggle {
  background-color: inherit !important;
}
.outline {
  border: 1px solid grey;
}
.channel-link:hover {
  cursor: pointer;
}
</style>