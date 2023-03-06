<template>
  <UnauthorizeUser v-if="$auth.status.value === 'unauthenticated'" icon="mdi-video" heading="Keep your eyes on your vidoes stats" caption="Sign in to see your videos stats" />
  <div v-else-if="videos && videos.length > 0">
    <VideoOptionsEditDialog
      v-if="editDialog"
      :id="video.id"
      :open="editDialog"
      :title="video.title"
      :description="video.description"
      :video-status="video.videoStatus"
      :tags="video.tags"
      :thumbnail="video.thumbnail"
      @close="editDialog = false"
    />
    <VideoOptionsDeleteDialog v-if="deleteDialog" :id="deleteId" :open="deleteDialog" @close="deleteDialog = false" />
    <v-container>
      <div class="text-h6 font-weight-bold mb-5">
        Your videos
      </div>
      <VideoListTable v-if="$vuetify.display.mdAndUp" :videos="videos" @edit-video="openEditDialog" @delete-video="openDeleteDialog" />
      <v-row v-else no-gutters justify="center">
        <v-col v-for="(v, idx) in videos" :key="idx" cols="12" sm="6">
          <VideoListCard :video="v" @edit-video="openEditDialog" @delete-video="openDeleteDialog" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang='ts' setup>
import { Video } from 'utils/model'

definePageMeta({ auth: false })
useHead({
  title: 'Your videos - VidFlow'
})

const { data: videos } = await useFetch<Video[]>('/api/user/videos')
const video = ref({
  id: '',
  title: '',
  description: '',
  videoStatus: '',
  tags: [] as string[],
  thumbnail: ''
})
const deleteId = ref('')
const editDialog = ref(false)
const deleteDialog = ref(false)

function openEditDialog (id: string) {
  editDialog.value = true
  if (videos.value) {
    const selectedVideo = videos.value.find(video => video.id === id)
    if (selectedVideo) {
      video.value.id = selectedVideo.id
      video.value.title = selectedVideo.title
      video.value.description = selectedVideo.description ? selectedVideo.description : ''
      video.value.videoStatus = selectedVideo.videoStatus ? selectedVideo.videoStatus : ''
      video.value.tags = selectedVideo.tags ? selectedVideo.tags : []
      video.value.thumbnail = selectedVideo.thumbnail
    }
  }
}

function openDeleteDialog (id: string) {
  deleteDialog.value = true
  deleteId.value = id
}
</script>
