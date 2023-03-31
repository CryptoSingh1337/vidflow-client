<template>
  <UnauthorizeUser v-if="$auth.status.value === 'unauthenticated'" icon="mdi-thumb-up" heading="Enjoy your favorite videos" caption="Sign in to access videos that you’ve liked" />
  <v-container v-else-if="$auth.status.value === 'authenticated' && likedVideos && likedVideos.length > 0" fluid>
    <div class="text-h6 font-weight-bold mb-5">
      Liked videos
    </div>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" md="10" lg="8">
        <SearchVideoCard
          v-for="(video, idx) in likedVideos"
          :key="idx"
          :video="video"
        />
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else class="d-flex mt-16 pt-16 align-center justify-center flex-column">
    <v-icon class="mb-5" :color="$vuetify.theme.current.dark ? '' : '#000000'" :size="90" icon="mdi:mdi-information" />
    <div class="mx-auto text-h5 text-center font-weight-bold">
      No liked video in this playlist
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { User, Video } from 'utils/model'

definePageMeta({ auth: false })
useHead({
  title: 'Liked videos - VidFlow'
})

const { $auth } = useNuxtApp()
const likedVideos = ref<Video[]>([])
const page = ref(1)
let totalPages = 1

if ($auth.status.value === 'authenticated') {
  const user = $auth.data.value?.user as User
  const { data } = await useFetch(`/api/user/${user.id}/liked`, {
    query: {
      page: 0
    }
  })
  data.value?.content?.forEach(video => likedVideos.value.push(video))
  totalPages = data.value?.totalPages ? data.value?.totalPages : 1
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function infiniteScroll (isIntersecting: any, entries: any, observer: any) {
  if ($auth.status.value === 'authenticated') {
    setTimeout(async () => {
      if (page.value < totalPages) {
        const user = $auth.data.value?.user as User
        const { data } = await useFetch(`/api/user/${user.id}/liked?page=${page.value}`)
        totalPages = data.value?.totalPages ? data.value?.totalPages : totalPages
        data.value?.content?.forEach(video => likedVideos.value.push(video))
        page.value++
      }
    }, 500)
  }
}
</script>
