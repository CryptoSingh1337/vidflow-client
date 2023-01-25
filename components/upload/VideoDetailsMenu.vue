<template>
  <v-layout full-height class="align-start">
    <v-container fluid>
      <h2 class="font-weight-bold text-center">
        Add Video Metadata
      </h2>
      <v-row class="mt-5" no-gutters justify="center">
        <v-col cols="12" lg="6" class="mb-10 mb-lg-0">
          <v-form v-model="valid" class="rounded pa-4">
            <v-alert v-model="alert" class="mb-3" variant="outlined" density="compact" type="error">
              {{ alertText }}
            </v-alert>
            <v-text-field
              v-model="title"
              label="Title *"
              variant="filled"
              :rules="[requiredRule, titleRule]"
              counter
              maxlength="100"
            />
            <v-textarea
              v-model="description"
              label="Description *"
              variant="filled"
              :rules="[requiredRule, descriptionRule]"
              counter
              maxlength="500"
            />
            <v-select
              v-model="videoStatus"
              label="Video Status *"
              variant="filled"
              :rules="[requiredRule]"
              :items="videoStatusEnum"
            />
            <v-container class="pa-0">
              <h4 class="mb-2">
                Tags
              </h4>
              <v-row align="center" justify="start" no-gutters>
                <v-chip v-for="(t, index) in tags" :key="index" closable class="mx-1 mb-3 mt-1" @click:close="tags.splice(index, 1)">
                  {{ t }}
                </v-chip>
                <v-col cols="12" class="pa-0">
                  <v-text-field
                    v-model="tag"
                    label="Add Tag"
                    variant="filled"
                    :disabled="tags.length >= 5"
                    @keyup.enter.prevent="addTag"
                    @keyup.tab.prevent="addTag"
                  />
                </v-col>
              </v-row>
            </v-container>
            <v-file-input
              v-model="thumbnail"
              show-size
              counter
              accept="image/*"
              label="Upload thumbnail"
              prepend-icon="mdi:mdi-image"
              :rules="[requiredFileRule, thumbnailSizeRule, thumbnailTypeRule]"
            />
            <v-container class="px-0">
              <v-btn
                class="mr-2"
                :loading="uploading"
                :disabled="!valid"
                color="primary"
                @click.prevent="uploadVideoAndThumbnail"
              >
                Save
              </v-btn>
              <v-btn class="mx-2" color="grey" @click.prevent="reset">
                Reset
              </v-btn>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script lang='ts' setup>
import { requiredRule, requiredFileRule, titleRule, descriptionRule, thumbnailSizeRule, thumbnailTypeRule } from '@/utils/rules'
import { AuthenticatedUser, ErrorResponse, UploadVideoResponse } from 'utils/model'

const { $auth } = useNuxtApp()
const { backendBaseUrl } = useRuntimeConfig().public

const alert = ref(false)
const valid = ref(false)
const alertText = ref('')
const title = ref('')
const description = ref('')
const videoStatus = ref('')
const videoStatusEnum = ref(['PRIVATE', 'UNLISTED', 'PUBLIC'])
const tag = ref('')
const tags = ref<string[]>([])
const thumbnail = ref<File[]>([])
const videoFile = useFile().videoFile.value[0]
const uploading = ref(false)

function addTag () {
  if (tag.value.trim() !== '') {
    tags.value.push(tag.value.trim())
  }
  tag.value = ''
}

function validatePayload () {
  let error = ''
  if (!videoFile) {
    error = 'Please upload the video first'
  } else {
    const file = thumbnail.value[0]
    if (!file || (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg')) {
      error = 'Unsupported thumbnail format'
    }
  }
  if (error.length > 0) {
    alertText.value = error
    alert.value = true
    return false
  }
  return true
}

async function uploadVideoAndThumbnail () {
  if ($auth.status.value !== 'authenticated') {
    navigateTo('/login')
  } else {
    const isValidPayload = validatePayload()
    const user = $auth.data.value?.user as AuthenticatedUser

    if (isValidPayload) {
      uploading.value = true

      const metadata = {
        title: title.value,
        description: description.value,
        tags: tags.value.length > 0 ? tags.value : null,
        channelName: user.channelName,
        username: user.username,
        videoStatus: videoStatus.value
      }

      const payload = new FormData()
      payload.append('video', videoFile)
      payload.append('thumbnail', thumbnail.value[0])
      payload.append('metadata', JSON.stringify(metadata))

      await useFetch('/video/upload/new', {
        baseURL: backendBaseUrl,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        },
        body: payload,
        onResponse ({ response }) {
          uploading.value = false
          if (response.status === 200) {
            const uploadVideoResponse = response._data as UploadVideoResponse
            navigateTo(`/watch/${uploadVideoResponse.videoId}`)
          }
        },
        onResponseError ({ response }) {
          uploading.value = false
          alert.value = true
          const errorResponse = response._data as ErrorResponse
          alertText.value = JSON.stringify(errorResponse.error)
        }
      })
    }
  }
}

function reset () {
  title.value = ''
  description.value = ''
  tags.value.splice(0)
  videoStatus.value = ''
  thumbnail.value.splice(0)
}
</script>
