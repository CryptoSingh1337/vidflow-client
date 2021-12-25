<template>
  <v-container class="fill-height align-start">
    <v-container fluid>
      <h2 class="font-weight-bold">Add Video Metadata</h2>
      <v-row class="mt-5" no-gutters>
        <v-col cols="12" lg="6" class="mb-10 mb-lg-0">
          <v-form v-model="valid" class="mr-lg-16">
            <v-alert :value="alert" outlined dense type="error">{{
              alertText
            }}</v-alert>
            <v-text-field
              label="Title *"
              v-model="title"
              :rules="[rules.required, rules.title]"
              counter="70"
              filled
            ></v-text-field>
            <v-textarea
              label="Description *"
              v-model="description"
              :rules="[rules.required, rules.description]"
              counter="500"
              filled
            ></v-textarea>
            <v-select
              label="Video Status *"
              v-model="videoStatus"
              :rules="[rules.required]"
              :items="videoStatusEnum"
              filled
            ></v-select>
            <v-container class="pa-0">
              <h4 class="mb-4">Tags</h4>
              <v-row align="center" justify="start" no-gutters>
                <v-col
                  :key="index"
                  v-for="(tag, index) in tags"
                  class="shrink pb-4"
                >
                  <v-chip
                    close
                    @click:close="tags.splice(index, 1)"
                    class="mx-1"
                    >{{ tag }}</v-chip
                  >
                </v-col>
                <v-col cols="12" class="pa-0">
                  <v-text-field
                    label="Add Tag"
                    v-model="tag"
                    filled
                    :disabled="tags.length > 5"
                    @keyup.enter.prevent="addTag"
                    @keyup.tab.prevent="addTag"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-file-input
              show-size
              counter
              accept="image/*"
              label="Upload thumbnail"
              prepend-icon="mdi-image"
              :rules="[rules.thumbnail]"
              v-model="thumbnail"
              append-icon="mdi-upload"
              @click:append.prevent="handleThumbnailUpload"
            ></v-file-input>
            <v-container class="px-0">
              <v-btn
                class="mr-2"
                :loading="uploading"
                :disabled="!valid"
                color="primary"
                @click.prevent="handleSave"
                >Save</v-btn
              >
              <v-btn class="mx-2" color="grey" @click.prevent="handleReset"
                >Reset</v-btn
              >
            </v-container>
          </v-form>
        </v-col>
        <v-col cols="12" lg="6">
          <video
            src="@/assets/video.mp4"
            poster="https://source.unsplash.com/1920x1080/?technology"
            :width="$vuetify.breakpoint.mdAndDown ? '100%' : '85%'"
            :height="$vuetify.breakpoint.mdAndDown ? '100%' : '85%'"
            controls
            controlsList="nofullscreen nodownload"
          ></video>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

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
      alertText: "Something went wrong",
      title: "",
      description: "",
      rules: {
        required: (value) => !!value || "Required.",
        title: (value) =>
          (value && value.length <= 70) ||
          "Title must be less than 70 characters.",
        description: (value) =>
          (value && value.length <= 500 && value.length > 50) ||
          "Description must be between 50-500 characters.",
        thumbnail: (value) =>
          !value ||
          value.size < 10000000 ||
          "Thumbnail size must be less than 10 MB.",
      },
      videoStatusEnum: ["PRIVATE", "UNLISTED", "PUBLIC"],
      videoStatus: "",
      tags: [],
      tag: "",
      thumbnail: null,
      thumbnailLink: "",
      uploading: false,
      videoId: "",
    };
  },
  computed: {
    ...mapState(["origin", "uploadVideo"]),
  },
  methods: {
    showAlert(text) {
      this.alertText = text;
      this.alert = true;
      setTimeout(() => (this.alert = false), 5000);
    },
    addTag() {
      if (this.tag.trim() !== "") this.tags.push(this.tag.trim());
      this.tag = "";
    },
    handleThumbnailUpload() {
      if (!this.thumbnail) {
        this.showAlert("Please select the thumbnail.");
      } else if (
        this.thumbnail.type === "image/png" ||
        this.thumbnail.type === "image/jpeg" ||
        this.thumbnail.type === "image/jpg"
      ) {
        console.log(this.thumbnail);
        this.thumbnailLink =
          "https://source.unsplash.com/1920x1080/?technology";
      } else {
        this.showAlert("Unsupported thumbnail format.");
      }
    },
    handleUploadVideo() {
      if (!this.uploadVideo) {
        this.showAlert("Please upload the video first.");
        return false;
      }
      const status = 200;
      if (status === 200) {
        console.log(this.uploadVideo);
        this.videoId = 1;
        return true;
      }
      return false;
    },
    handleSave() {
      if (this.thumbnailLink === "") {
        this.showAlert("Please upload the thumbnail first.");
      } else {
        this.uploading = true;
        const result = this.handleUploadVideo();
        if (result) {
          const data = {
            title: this.title,
            description: this.description,
            videoStatus: this.videoStatus,
            tags: this.tags.length > 0 ? this.tags : null,
            thumbnail: this.thumbnailLink,
            userId: this.$auth.user.username,
          };
          console.log(data);
          this.uploading = false;
          this.$router.push({ path: `/watch/${this.videoId}` });
        } else {
          this.uploading = false;
          this.showAlert(
            "Something went wrong while uploading. Please try again later."
          );
        }
      }
    },
    handleReset() {
      this.title = "";
      this.description = "";
      this.videoStatus = "";
      this.tags = [];
      this.thumbnail = null;
    },
  },
};
</script>
<style scoped>
video {
  object-fit: cover;
}
</style>