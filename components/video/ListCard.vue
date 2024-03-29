<template>
  <v-card class="ma-2 bg-transparent" :ripple="false">
    <v-img :src="video.thumbnail" alt="thumbnail" aspect-ratio="16/9" />
    <div class="my-4 text-subtitle-1 font-weight-bold" style="line-height: normal">
      {{ truncateText(_props.video.title, 60) }}
    </div>
    <v-divider />
    <v-card-title class="d-flex justify-space-between">
      <span>Statistics</span>
      <VideoSideMenu :id="_props.video.id" @edit-video="editVideo" @delete-video="deleteVideo" />
    </v-card-title>
    <v-card-text>
      <div class="d-flex justify-space-between">
        <span>Visibility</span>
        <span>
          <v-icon
            class="mr-2"
            :color="video.videoStatus === 'PUBLIC' ? 'green' : 'grey'"
            :icon="video.videoStatus === 'UNLISTED' ? 'mdi-link' : 'mdi-eye'"
          />
          {{ capitalize(_props.video.videoStatus ?? 'Status not found') }}</span>
      </div>
      <div class="d-flex justify-space-between">
        <span>Date</span>
        <span>{{ formatDate(new Date(_props.video.createdAt), "D, MMM YYYY") }}</span>
      </div>
      <div class="d-flex justify-space-between">
        <span>Views</span>
        <span>{{ formatNumberInInternationalSystem(_props.video.views) }}</span>
      </div>
      <div class="d-flex justify-space-between mt-2">
        <span>Likes (vs. Dislikes)</span>
        <span>
          <div class="text-end">
            {{ `${calculateRatio(_props.video.likes ?? 0, _props.video.dislikes ?? 0)}%` }}
          </div>
          <div>{{ formatNumberInInternationalSystem(_props.video.dislikes ?? 0) }} likes</div>
          <v-progress-linear
            class="my-2"
            color="grey"
            :model-value="calculateRatio(_props.video.likes ?? 0, _props.video.dislikes ?? 0)"
            rounded
          />
        </span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn :to="`/watch/${video.id}`">
        View
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts' setup>
import { formatDate } from '@vueuse/core'
import { Video } from 'utils/model'
import { truncateText, calculateRatio, capitalize, formatNumberInInternationalSystem } from '@/utils/functions'

const emit = defineEmits(['editVideo', 'deleteVideo'])

const _props = defineProps<{
  video: Video
}>()

function editVideo (id: string) {
  emit('editVideo', id)
}

function deleteVideo (id: string) {
  emit('deleteVideo', id)
}
</script>
