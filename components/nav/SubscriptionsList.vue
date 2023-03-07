<template>
  <div v-if="subscribedChannels && subscribedChannels.length > 0">
    <v-list-subheader class="text-uppercase font-weight-bold">
      Subscriptions
    </v-list-subheader>
    <v-list-item
      v-for="(subscription, i) in subscribedChannels"
      :key="i"
      :to="`/channel/${subscription.id}`"
      density="compact"
      :title="subscription.channelName"
    >
      <template #prepend>
        <v-avatar size="25">
          <v-img
            :src="`https://avatars.dicebear.com/api/bottts/${subscription.channelName}.svg`"
          />
        </v-avatar>
      </template>
    </v-list-item>
    <v-divider class="my-2" />
  </div>
</template>

<script lang='ts' setup>
import { User } from 'utils/model'

const { $auth } = useNuxtApp()
const user = $auth.data.value?.user as User
const { subscribeState, setSubscribeState } = useSubscribeState()

const { data: subscribedChannels, refresh } = await useFetch(`/api/user/${user.id}/subscribed`)

watch(() => subscribeState.value, () => {
  setSubscribeState(false)
  refresh()
})
</script>
