<template>
  <v-container v-if="searchVideos.length > 0" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" md="10" lg="8">
        <SearchVideoCard v-for="(searchVideo, idx) in searchVideos" :key="idx" :video="searchVideo" />
      </v-col>
    </v-row>
  </v-container>
  <v-container
    v-else
    class="d-flex mt-16 pt-16 align-center justify-center flex-column"
  >
    <v-icon
      class="mb-5"
      :color="$vuetify.theme.current.dark ? '' : '#000000'"
      :size="90"
      icon="mdi-close-circle"
    />
    <div class="mx-auto text-h4 text-center font-weight-bold">
      No video found with title: {{ $route.query.q }}
    </div>
  </v-container>
</template>

<script lang='ts' setup>
import { Video } from 'utils/model'

const route = useRoute()
const page = ref(0)
const searchVideos = ref<Video[]>([])

definePageMeta({ auth: false })
useHead({
  title: 'Search - VidFlow'
})

const { refresh } = await useAsyncData(() => $fetch('/api/video/search', {
  query: {
    q: route.query.q,
    page: page.value
  },
  onResponse ({ response }) {
    if (response.status === 200) {
      searchVideos.value = response._data
    }
  }
}))

watch(() => route.query, () => refresh())
</script>
