<template>
  <div class="text-h6 font-weight-bold d-block" style="line-height: 1.35">
    {{ video.title }}
    <v-row no-gutters class="align-center subtitle-2 grey--text">
      <v-col cols="12" sm="4" class="my-3">
        <span class="align-self-center"
          >{{ video.longViews | numberfy }} • 4 Oct, 2021</span
        >
      </v-col>
      <v-col cols="12" sm="8" class="d-flex justify-sm-end">
        <span class="d-flex">
          <v-btn-toggle class="mb-0" borderless dense>
            <v-btn class="mx-1" plain v-model="liked" @click="liked = !liked"
              ><v-icon class="pr-1">{{
                liked ? "mdi-thumb-up" : "mdi-thumb-up-outline"
              }}</v-icon
              >12K</v-btn
            >
            <v-btn
              class="mx-1"
              plain
              v-model="disliked"
              @click="disliked = !disliked"
              ><v-icon class="pr-1">{{
                disliked ? "mdi-thumb-down" : "mdi-thumb-down-outline"
              }}</v-icon
              >1K</v-btn
            >
          </v-btn-toggle>
          <v-dialog v-model="dialog" max-width="350">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-1 px-0"
                plain
                @click="dialog = !dialog"
                v-on="on"
                v-bind="attrs"
                ><v-icon>mdi-share-outline</v-icon>SHARE</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="text-h5"> About </v-card-title>
              <v-card-text
                >This application is developed by Saransh Kumar</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-2" text @click="dialog = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </span>
      </v-col>
    </v-row>
    <v-divider class="my-2"></v-divider>
    <v-row class="justify-space-between" no-gutters>
      <v-col cols="8" sm="6" md="5" lg="5">
        <v-card class="transparent" flat>
          <v-list-item three-line class="pa-0">
            <v-list-item-avatar size="50"
              ><v-img
                src="https://randomuser.me/api/portraits/men/1.jpg"
              ></v-img
            ></v-list-item-avatar>
            <v-list-item-content class="align-self-auto">
              <v-list-item-title class="font-weight-medium mb-1"
                >Channel Name</v-list-item-title
              >
              <v-list-item-subtitle>1.2M subscribers </v-list-item-subtitle>
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
        <v-btn
          :class="['white--text', $vuetify.breakpoint.xs ? 'pa-3' : '']"
          :x-small="$vuetify.breakpoint.xs"
          tile
          :color="subscribed ? 'grey' : 'red'"
          depressed
          v-model="subscribed"
          @click="subscribed = !subscribed"
          >{{ subscribed ? "Subscribed" : "Subscribe" }}</v-btn
        >
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
export default {
  name: "VideoFooter",
  props: {
    video: Object,
  },
  data() {
    return {
      liked: false,
      disliked: false,
      subscribed: false,
      dialog: false,
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
  },
  filters: {
    numberfy: (views) => views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  },
};
</script>
<style scoped>
.btn:hover {
  cursor: pointer;
}
.no-backgound {
  background-color: none;
}
</style>