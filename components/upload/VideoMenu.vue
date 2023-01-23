<template>
  <v-layout full-height class="flex-column align-center justify-center">
    <div class="d-flex flex-column align-center width">
      <v-alert v-model="alert" :class="[$vuetify.display.mdAndDown ? 'width-md' : 'width-lg', 'mb-10']" variant="outlined" density="compact" type="error">
        {{ alertText }}
      </v-alert>
      <h3>Upload Video</h3>
      <v-icon class="my-4" size="100" icon="mdi:mdi-video-plus" />
      <v-form v-model="valid" :class="[$vuetify.display.mdAndDown ? 'width-md' : 'width-lg']">
        <v-file-input
          v-model="videoFile"
          :rules="[requiredRule, videoFileSizeRule, videoFileTypeRule]"
          prepend-icon="mdi:mdi-video"
          variant="outlined"
          label="Upload your video file"
          show-size
          counter
          accept="video/*"
        />
        <v-btn class="my-2 mx-auto" color="primary" prepend-icon="mdi:mdi-cloud-upload" :disabled="!valid" @click.prevent="handleVideoUpload">
          Upload
        </v-btn>
      </v-form>
    </div>
  </v-layout>
</template>

<script lang='ts' setup>
import { requiredRule, videoFileSizeRule, videoFileTypeRule } from '@/utils/rules'

const alert = ref(false)
const valid = ref(false)
const alertText = ref('')
const videoFile = ref<File[]>([])
const { setFile } = useFile()

function handleVideoUpload () {
  const videoType = videoFile.value[0].type
  if (videoType === 'video/mp4' || videoType === 'video/webm' || videoType === 'video/ogg') {
    setFile(videoFile.value[0])
  } else {
    alertText.value = 'Unsupported video format'
    alert.value = true
  }
}
</script>

<style scoped>
.width {
  width: 100% !important;
}
.width-lg {
  width: 25% !important;
  max-width: 25% !important;
}
.width-md {
  width: 75% !important;
  max-width: 75% !important;
}
</style>
