<template>
  <div>
    <v-parallax
      src="https://picsum.photos/1546/423?random"
      height="230"
    />
    <v-container>
      <v-row class="justify-space-between" no-gutters>
        <v-col class="d-flex" cols="12" sm="5" md="5" lg="3">
          <v-list class="bg-transparent" lines="two" density="compact">
            <v-list-item class="px-0" :title="channelName" :subtitle="shortifyNumber(subscribers) + ' subscribers'">
              <template #prepend>
                <v-avatar size="100" class="mr-4">
                  <v-img :src="`https://avatars.dicebear.com/api/bottts/${channelName}.svg`" />
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col :class="['d-flex', 'align-center', $vuetify.display.xs ? '' : 'justify-end']" cols="12" sm="4" md="4" lg="3">
          <ClientOnly>
            <SubscribeButton
              :id="userId"
              :channel-name="channelName"
              :subscribed="subscribed"
              :same="same"
            />
          </ClientOnly>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
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
          </v-container>
        </v-window-item>
      </v-window>
    </v-container>
  </div>
</template>

<script lang='ts' setup>
import { shortifyNumber } from '@/utils/functions'
import { User } from 'utils/model'

definePageMeta({ auth: false })
useHead({
  title: 'Your Channel - VidFlow'
})

const { $auth } = useNuxtApp()
const user = $auth.data.value?.user as User

const userId = useRoute().params.id
const page = ref(0)
const channelName = ref('')
const subscribers = ref(0)
const subscribed = ref(false)
const same = ref(false)
const tabs = ['Home', 'Videos']
const tab = ref('Home')

const { data: videos } = await useFetch(`/api/video/${userId}`, {
  query: {
    page: page.value
  }
})

if (videos.value && videos.value.length > 0) {
  channelName.value = videos.value[0].channelName
  const { data } = await useFetch(`/api/user/${userId}/subscribers`) as any
  subscribers.value = data.value
} else {
  const { data } = await useFetch(`/api/user/${userId}/channel`)
  channelName.value = data.value as any
}

if ($auth.status.value === 'authenticated') {
  if (user.id === userId) {
    same.value = true
  } else {
    const { data, error } = await useFetch(`/api/user/${user.id}/subscribed/${userId}`)
    if (!error.value) {
      subscribed.value = data.value as any
    }
  }
}
</script>
