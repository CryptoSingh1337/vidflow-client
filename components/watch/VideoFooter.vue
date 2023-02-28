<template>
  <div class="text-h6 font-weight-bold d-block" style="line-height: 1.35">
    {{ props.video.title }}
    <v-row no-gutters class="align-center text-subtitle-2 text-disabled">
      <v-col cols="12" sm="4">
        <span class="align-self-center">{{ numberfy(props.video.views) }} views • {{ formatDate(new Date(props.video.createdAt), "D, MMM YYYY") }}</span>
      </v-col>
      <v-col cols="12" sm="8" class="d-flex justify-sm-end">
        <span class="d-flex align-center">
          <v-btn
            :ripple="false"
            variant="plain"
            :icon="like ? 'mdi:mdi-thumb-up' : 'mdi:mdi-thumb-up-outline'"
            @click="handleLike"
          />
          <span>{{ formatLikes(likes) }}</span>
          <v-btn :ripple="false" class="mx-1" variant="plain" icon="mdi:mdi-thumb-down-outline" :disabled="true" />
          <v-btn variant="plain" prepend-icon="mdi:mdi-share-outline" @click="copy">
            Share
          </v-btn>
        </span>
      </v-col>
    </v-row>
    <v-divider class="my-2" />
    <v-row class="justify-space-between" no-gutters>
      <v-col cols="8" sm="6" md="5" lg="5">
        <v-list class="bg-transparent" lines="two" density="compact">
          <v-list-item :subtitle="formatLikes(props.subscribers) + ' subscribers'">
            <template #prepend>
              <NuxtLink :to="`/channel/${props.video.userId}`">
                <v-avatar size="50" class="mr-4">
                  <v-img :src="`https://avatars.dicebear.com/api/bottts/${props.video.channelName}.svg`" />
                </v-avatar>
              </NuxtLink>
            </template>
            <template #title>
              <NuxtLink class="text-decoration-none font-weight-medium" :to="`/channel/${props.video.userId}`">
                {{ props.video.channelName }}
              </NuxtLink>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="4" sm="6" md="4" lg="4" class="d-flex align-center justify-end">
        <SubscribeButton
          :id="video.userId"
          :same="same"
          :subscribed="subscribed"
          :channel-name="video.channelName"
        />
      </v-col>
      <v-col cols="12" md="12">
        <div class="text-subtitle-1" style="line-height: 1.2; white-space: pre-wrap;">
          {{ truncate ? truncateText(props.video.description) : props.video.description }}
        </div>
        <v-btn class="my-2" variant="plain" @click="show">
          {{ showText }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang='ts' setup>
import { formatDate } from '@vueuse/core'
import { useDisplay } from 'vuetify'
import { User } from 'utils/model'

const props = defineProps<{
    video: any
    same: boolean,
    subscribed: boolean,
    subscribers: number,
    liked: boolean
}>()

const { $auth } = useNuxtApp()
const user = $auth.data.value?.user as User

const like = ref(props.liked)
const likes = ref(props.video.likes)
const truncate = ref(true)
const showText = ref('Show More')

const { name } = useDisplay()

function handleLike () {
  if ($auth.status.value === 'authenticated') {
    useFetch(`/api/user/${user.id}/like/${props.video.id}`, {
      method: 'post',
      query: {
        isLiked: !like.value
      },
      onRequest () {
        like.value = !like.value
      },
      onResponse () {
        if (like.value) {
          likes.value += 1
        } else if (!like.value && likes.value > 0) {
          likes.value -= 1
        }
      },
      onResponseError ({ response }) {
        if (response.status === 401) {
          alert('You are not logged in')
        }
      }
    })
  } else {
    alert('You are not logged in')
  }
}

function show () {
  if (showText.value === 'Show More') {
    truncate.value = false
    showText.value = 'Show Less'
  } else if (showText.value === 'Show Less') {
    truncate.value = true
    showText.value = 'Show More'
  }
}

function copy () {
  navigator.clipboard.writeText(document.URL)
  alert('Copy to clipboard')
}

function numberfy (views: number) {
  return String(views).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function formatLikes (likes: number) {
  if (likes < 999) {
    return likes
  } else if (likes >= 1000 && likes < 1000000) {
    return Math.floor(likes / 1000) + 'K'
  } else if (likes >= 1000000 && likes < 1000000000) {
    return Math.floor(likes / 1000000) + 'M'
  }
}

function truncateText (description: string) {
  return description.substring(0, name.value === 'xs' ? 150 : 300)
}
</script>
