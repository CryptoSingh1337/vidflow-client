<template>
  <UnauthorizeUser
    v-if="$auth.status.value === 'unauthenticated'"
    caption="Sign in to see updates from your favorite channels"
    heading="Don’t miss new videos"
    icon="mdi-youtube-subscription"
  />
  <v-container v-else-if="videos.length > 0" style="height: 100%;" fluid>
    <v-row class="ma-3" no-gutters>
      <v-col
        v-for="video in videos"
        :key="video.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="mx-xs-auto"
      >
        <VideoMainCard :width="$vuetify.display.xs ? '100%' : '90%'" :video="video" />
      </v-col>
    </v-row>
    <v-card v-intersect.quiet="infiniteScroll" />
  </v-container>
  <GlobalEmptyDataHandler v-else class="mt-16 pt-16" icon="mdi-information" text="No recently uploaded video available!" />
</template>
<script lang='ts' setup>
import { Video } from 'utils/model'

const { $auth } = useNuxtApp()
const videos = ref<Video[]>([])
const page = ref(1)
let totalPages = 1

definePageMeta({ auth: false })
useHead({
  title: 'Subscriptions - VidFlow'
})

if ($auth.status.value === 'authenticated') {
  const { data: response } = await useFetch('/api/user/feed/subscriptions', {
    query: {
      page: 0
    }
  })

  response.value?.at(0)?.videos?.forEach(video => videos.value.push(video))
  totalPages = response.value?.at(0)?.totalPages?.at(0)?.id ? response.value?.at(0)?.totalPages?.at(0)?.id : 1 as any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function infiniteScroll (isIntersecting: any, entries: any, observer: any) {
  setTimeout(async () => {
    if ($auth.status.value === 'authenticated' && page.value < totalPages) {
      const { data } = await useFetch(`/api/user/feed/subscriptions?page=${page.value}`)
      totalPages = data.value?.at(0)?.totalPages?.at(0)?.id ? data.value?.at(0)?.totalPages?.at(0)?.id : totalPages as any
      data.value?.at(0)?.videos?.forEach(video => videos.value.push(video))
      page.value++
    }
  }, 500)
}
</script>
