<template>
  <v-container class="fill-height flex-column justify-center" fluid>
    <v-alert
      :class="[$vuetify.breakpoint.mdAndDown ? 'width-md' : 'width-lg']"
      :value="alert"
      outlined
      dense
      type="error"
      >{{ alertText }}</v-alert
    >
    <h3>Upload Video</h3>
    <v-icon size="100">mdi-video-plus</v-icon>
    <v-form
      v-model="valid"
      :class="[$vuetify.breakpoint.mdAndDown ? 'width-md' : 'width-lg']"
    >
      <v-file-input
        v-model="video"
        :rules="[rules.required, rules.video]"
        solo
        outlined
        prepend-icon=""
        label="Upload your video file"
        show-size
        counter
        accept="video/*"
      ></v-file-input>
      <v-btn
        class="mx-auto"
        color="primary"
        @click.prevent="handleVideoUpload"
        :disabled="!valid"
        >Upload</v-btn
      >
    </v-form>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  middleware: "auth",
  head() {
    return {
      title: "Upload - VidFlow",
    };
  },
  data() {
    return {
      valid: false,
      alert: false,
      alertText: "",
      video: null,
      rules: {
        required: (value) => !!value || "Required.",
        video: (value) =>
          !value ||
          value.size < 100000000 ||
          "Video size must be less than 100 MB.",
      },
    };
  },
  methods: {
    ...mapMutations(["setUploadVideo"]),
    showAlert(text) {
      this.alertText = text;
      this.alert = true;
      setTimeout(() => (this.alert = false), 5000);
    },
    handleVideoUpload() {
      const videoType = this.video.type;
      if (
        videoType === "video/mp4" ||
        videoType === "video/webm" ||
        videoType === "video/ogg"
      ) {
        console.log(this.video);
        this.setUploadVideo(this.video);
        this.$router.push({ path: "/save_video_details" });
      } else {
        this.showAlert("Unsupported video format");
      }
    },
  },
};
</script>
<style scoped>
.width-lg {
  width: 25% !important;
  max-width: 25% !important;
}

.width-md {
  width: 75% !important;
  max-width: 75% !important;
}
</style>