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
    <VideoOptionsDeleteConfirmationDialog v-if="deleteDialog" :id="deleteId" :open="deleteDialog" @close="deleteDialog = false" @delete="handleDelete" />
    <v-container>
      <div class="text-h6 font-weight-bold mb-5">
        Your videos
      </div>
      <VideoListTable
        v-if="$vuetify.display.mdAndUp"
        :videos="videos"
        :total-pages="totalPages"
        :total-items="totalItems"
        @fetch-videos="fetchVideos"
        @edit-video="openEditDialog"
        @delete-video="openDeleteDialog"
      />
      <v-row v-else no-gutters justify="center">
        <v-col v-for="(v, idx) in videos" :key="idx" cols="12" sm="6">
          <VideoListCard :video="v" @edit-video="openEditDialog" @delete-video="openDeleteDialog" />
        </v-col>
      </v-row>
    </v-container>
  </div>
  <GlobalEmptyDataHandler v-else class="mt-16 pt-16" :icon="'mdi-information'" :text="`You don't have any uploaded videos!`" />
</template>

<script lang='ts' setup>
import { Video } from 'utils/model'

definePageMeta({ auth: false })
useHead({
  title: 'Your videos - VidFlow'
})

const { $auth } = useNuxtApp()
const videos = ref<Video[]>([])
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
let totalPages = 1
let totalItems = 0

if ($auth.status.value === 'authenticated') {
  const { data } = await useFetch('/api/user/videos', {
    query: {
      page: 0
    }
  })
  data.value?.content?.forEach((v: any) => videos.value.push(v))
  totalPages = data.value?.totalPages ? data.value.totalPages : 1
  totalItems = data.value?.totalElements ? data.value?.totalElements : 0
}

async function fetchVideos (_page: number) {
  const { data } = await useFetch('/api/user/videos', {
    query: {
      page: _page - 1
    }
  })
  videos.value.splice(0, videos.value.length)
  data.value?.content.forEach((v: any) => videos.value.push(v))
}

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

function handleDelete (id: string) {
  if (videos.value && videos.value.length > 0) {
    const idx = videos.value.findIndex(v => v.id === id)
    if (idx !== -1) {
      videos.value.splice(idx, 1)
    }
  }
  deleteDialog.value = false
}
</script>
