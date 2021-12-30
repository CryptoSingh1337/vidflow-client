<template>
  <v-container class="fill-height align-start">
    <v-container fluid>
      <h2 class="font-weight-bold text-center">Add Video Metadata</h2>
      <v-row class="mt-5" no-gutters justify="center">
        <v-col cols="12" lg="6" class="mb-10 mb-lg-0">
          <v-form v-model="valid" class="mr-lg-16 rounded pa-4">
            <v-alert :value="alert" outlined dense type="error">{{
              alertText
            }}</v-alert>
            <v-text-field
              label="Title *"
              v-model="title"
              :rules="[rules.required, rules.title]"
              counter="100"
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
          (value && value.length <= 100) ||
          "Title must be less than 100 characters.",
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
    checkThumbnail() {
      if (!this.thumbnail) return true;
      if (
        this.thumbnail &&
        (this.thumbnail.type === "image/png" ||
          this.thumbnail.type === "image/jpeg" ||
          this.thumbnail.type === "image/jpg")
      )
        return true;
      return false;
    },
    checkVideo() {
      if (!this.uploadVideo) {
        this.showAlert("Please upload the video first");
        return false;
      }
      return true;
    },
    handleSave() {
      const isVideoValid = this.checkVideo();
      const isThumbnailValid = this.checkThumbnail();
      if (!isVideoValid) this.showAlert("Please upload the video first");
      else if (!isThumbnailValid)
        this.showAlert("Unsupported thumbnail format");
      else if (isVideoValid && isThumbnailValid) {
        this.uploading = true;
        let formData = new FormData();
        let videoId = "";
        formData.append("video", this.uploadVideo);
        formData.append("thumbnail", this.thumbnail);
        this.$axios
          .post("/video/upload", formData)
          .then((res) => res.data)
          .then((data) => {
            this.videoId = data.videoId;
            const videoMetadata = {
              title: this.title,
              description: this.description,
              thumbnail: data.thumbnailUrl,
              videoUrl: data.videoUrl,
              tags: this.tags.length > 0 ? this.tags : null,
              channelName: this.$auth.user.channelName,
              username: this.$auth.user.username,
              videoStatus: this.videoStatus,
            };
            this.$axios
              .post(`/video/${data.videoId}/video-metadata`, videoMetadata)
              .then(() => this.$router.push({ path: `/watch/${this.videoId}` }))
              .catch((e) => console.log(e));
          })
          .catch((e) => {
            this.uploading = false;
            this.showAlert(
              "Something went wrong while uploading. Please try again later."
            );
            console.log(e);
          });
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
form {
  border: solid 1px gray;
}
</style>