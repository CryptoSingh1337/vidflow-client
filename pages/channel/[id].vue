<template>
  <div>
    <v-parallax
      src="https://picsum.photos/1546/423?random"
      height="230"
    />
    <v-container v-if="response?.channel">
      <v-row class="justify-space-between" no-gutters>
        <v-col class="d-flex" cols="12" sm="5" md="5" lg="3">
          <v-list class="bg-transparent" lines="two" density="compact">
            <v-list-item class="px-0" :title="response.channel.name" :subtitle="shortifyNumber(response?.channel.subscribers) + ' subscribers'">
              <template #prepend>
                <v-avatar size="100" class="mr-4">
                  <v-img :src="`https://avatars.dicebear.com/api/bottts/${response.channel.name}.svg`" />
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col :class="['d-flex', 'align-center', $vuetify.display.xs ? '' : 'justify-end']" cols="12" sm="4" md="4" lg="3">
          <ClientOnly>
            <SubscribeButton
              :id="userId"
              :channel-name="response.channel.name"
              :subscribed="response.userMetadata ? response.userMetadata.subscribeStatus : false"
              :same="same"
            />
          </ClientOnly>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="videos.length > 0">
      <v-tabs v-model="tab" :items="tabs" align-tabs="center" />
      <v-window v-model="tab">
        <v-window-item v-for="(t, idx) in tabs" :key="idx" :value="t">
          <v-container style="height: 100%;" fluid>
            <v-row class="" no-gutters>
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
            <v-card v-intersect.quiet="infiniteScroll" class="my-auto" />
          </v-container>
        </v-window-item>
      </v-window>
    </v-container>
    <GlobalEmptyDataHandler v-else :icon="'mdi-information'" :text="response?.channel.name + ' has not uploaded any video yet!'" />
  </div>
</template>

<script lang='ts' setup>
import { shortifyNumber } from '@/utils/functions'
import { User, Video } from 'utils/model'

definePageMeta({ auth: false })
useHead({
  title: 'Your Channel - VidFlow'
})

const { $auth } = useNuxtApp()
const user = $auth.data.value?.user as User

const userId = useRoute().params.id
const videos = ref<Video[]>([])
const page = ref(1)
const same = ref(false)
const tabs = ['Home', 'Videos']
const tab = ref('Home')
let subscribeStatus = false
let authenticatedUserId = ''
let totalPages = 1

if ($auth.status.value === 'authenticated') {
  same.value = userId === user.id
  subscribeStatus = true
  authenticatedUserId = user.id
}

const { data: response } = await useFetch(`/api/user/${userId}/channel`, {
  query: {
    page: 0,
    subscribeStatus,
    authenticatedUserId
  }
})
response.value?.videos.content.forEach(video => videos.value.push(video))
totalPages = response.value?.videos.totalPages ? response.value?.videos.totalPages : 1

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function infiniteScroll (isIntersecting: any, entries: any, observer: any) {
  setTimeout(async () => {
    if (page.value < totalPages) {
      const { data } = await useFetch(`/api/video/${userId}?page=${page.value}`) as any
      totalPages = data.value?.totalPages ? data.value?.totalPages : totalPages
      data.value?.content?.forEach((video: any) => videos.value.push(video))
      page.value++
    }
  }, 1000)
}
</script>
