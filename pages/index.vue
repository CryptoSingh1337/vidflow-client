<template>
  <div>
    <v-container fluid>
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
          <VideoMainCard :width="'90%'" :video="video" />
        </v-col>
      </v-row>
      <v-card v-intersect.quiet="infiniteScroll" />
    </v-container>
  </div>
</template>
<script lang='ts' setup>
import { Video } from 'utils/model'

const { data } = await useFetch('/api/videos')
const videos = data.value as Video[]

definePageMeta({ auth: false })

function infiniteScroll () {}
</script>
