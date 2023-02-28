<template>
  <v-btn
    v-model="subscribe"
    :size="$vuetify.display.xs ? 'x-small' : 'default'"
    :disabled="same || notLoggedIn"
    :color="subscribe ? 'grey' : 'red'"
    @click="handleSubscribe"
  >
    {{ subscribe ? "Subscribed" : "Subscribe" }}
  </v-btn>
</template>

<script lang='ts' setup>
import { User } from 'utils/model'

const props = defineProps<{
    id: string,
    channelName: string,
    subscribed: boolean,
    same: boolean
}>()

const { $auth } = useNuxtApp()
const user = $auth.data.value?.user as User

const subscribe = ref(props.subscribed)
const notLoggedIn = ref($auth.status.value === 'unauthenticated')

function handleSubscribe () {
  subscribe.value = !subscribe.value
  if ($auth.status.value === 'authenticated') {
    useFetch(`/api/user/${user.id}/subscribers`, {
      query: {
        subscribeToUserId: props.id,
        increase: subscribe.value
      }
    })
  } else {
    alert('You are not logged in')
  }
}
</script>
