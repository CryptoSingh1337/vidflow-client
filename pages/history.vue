<template>
  <UnauthorizeUser
    v-if="$auth.status.value === 'unauthenticated'"
    icon="mdi-history"
    heading="Keep track of what you watch"
    caption="Watch history isn't viewable when signed out."
  />
  <v-container v-else-if="$auth.status.value === 'authenticated' && history && history.length > 0" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" md="10" lg="8">
        <SearchVideoCard
          v-for="(video, idx) in history"
          :key="idx"
          :video="video"
        />
      </v-col>
    </v-row>
    <v-card v-intersect.quiet="infiniteScroll" class="my-auto" />
  </v-container>
  <GlobalEmptyDataHandler v-else class="mt-16 pt-16" :icon="'mdi-information'" :text="'Your watch history is empty!'" />
</template>

<script lang="ts" setup>
import { User, Video } from 'utils/model'

definePageMeta({ auth: false })
useHead({
  title: 'History - VidFlow'
})

const { $auth } = useNuxtApp()
const history = ref<Video[]>([])
const page = ref(1)
let totalPages = 1

if ($auth.status.value === 'authenticated') {
  const user = $auth.data.value?.user as User
  const { data } = await useFetch(`/api/user/${user.id}/history`, {
    query: {
      page: 0
    }
  })
  data.value?.content?.forEach(video => history.value.push(video))
  totalPages = data.value?.totalPages ? data.value?.totalPages : 1
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function infiniteScroll (isIntersecting: any, entries: any, observer: any) {
  if ($auth.status.value === 'authenticated') {
    setTimeout(async () => {
      if (page.value < totalPages) {
        const user = $auth.data.value?.user as User
        const { data } = await useFetch(`/api/user/${user.id}/history?page=${page.value}`)
        totalPages = data.value?.totalPages ? data.value?.totalPages : totalPages
        data.value?.content?.forEach(video => history.value.push(video))
        page.value++
      }
    }, 1000)
  }
}
</script>
