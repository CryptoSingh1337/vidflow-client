<template>
  <div class="text-h6 font-weight-bold d-block" style="line-height: 1.35">
    {{ video.title }}
    <div class="d-flex caption">
      <span class="align-self-center"
        >{{ video.views | numberfy }} • {{ new Date() }}</span
      >
      <span class="ml-auto">
        <v-btn class="mx-1" icon><v-icon>mdi-thumb-up-outline</v-icon></v-btn>
        <v-btn class="mx-1" icon><v-icon>mdi-thumb-down-outline</v-icon></v-btn>
        <v-dialog v-model="dialog" width="25%">
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
    </div>
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
      dialog: false,
    };
  },
  filters: {
    numberfy: (views) => views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  },
};
</script>
